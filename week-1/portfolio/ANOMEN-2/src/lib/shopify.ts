/**
 * Shopify Storefront API Client
 * Handles all communication with Shopify's GraphQL Storefront API
 */

// Demo store credentials (fallback when custom credentials not provided)
const DEMO_STORE_DOMAIN = 'anomen-2.myshopify.com';
const DEMO_STOREFRONT_ACCESS_TOKEN = '6f9587abfe036bb79929b2614c91ff74';

const FALLBACK_STORE_DOMAIN = DEMO_STORE_DOMAIN;
const FALLBACK_STOREFRONT_ACCESS_TOKEN = DEMO_STOREFRONT_ACCESS_TOKEN;

// Environment configuration
const envDomain = (import.meta.env?.VITE_SHOPIFY_STORE_DOMAIN as string | undefined)?.trim() ?? '';
const envToken = (import.meta.env?.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string | undefined)?.trim() ?? '';

// Exported configuration
export const SHOPIFY_DOMAIN = (envDomain || FALLBACK_STORE_DOMAIN).trim();
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = (envToken || FALLBACK_STOREFRONT_ACCESS_TOKEN).trim();

const usingDefaultDemoStore =
  SHOPIFY_DOMAIN === DEMO_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN === DEMO_STOREFRONT_ACCESS_TOKEN;

export const SHOPIFY_HAS_CUSTOM_CREDENTIALS = !usingDefaultDemoStore;
export const SHOPIFY_CONFIGURED = Boolean(SHOPIFY_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN);
export const SHOPIFY_USING_DEMO_STORE = usingDefaultDemoStore;

type GraphQLVariables = Record<string, unknown> | undefined;

async function ShopifyData(query: string, variables?: GraphQLVariables) {
  if (!SHOPIFY_CONFIGURED) {
    throw new Error(
      "Shopify credentials not configured. Please set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN in your .env file."
    );
  }

  const URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  try {
    const response = await fetch(URL, options);
    
    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();

    if (data.errors) {
      throw new Error(`Shopify GraphQL error: ${JSON.stringify(data.errors)}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Products not fetched");
  }
}

// Get all products
export async function getAllProducts() {
  const query = `
    {
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  
  if (!response.data || !response.data.products) {
    throw new Error("Invalid response from Shopify API");
  }
  
  const allProducts = response.data.products.edges || [];

  return allProducts;
}

// Get single product by handle
export async function getProduct(handle: string) {
  const query = `
    {
      product(handle: "${handle}") {
        id
        title
        handle
        description
        descriptionHtml
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 25) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  
  if (!response.data) {
    throw new Error("Invalid response from Shopify API");
  }
  
  const product = response.data.product || null;

  return product;
}

// Create checkout
export async function createCheckout(lineItems: any[]) {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 25) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: lineItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    },
  };

  const response = await ShopifyData(query, variables);
  const checkoutCreate = response.data?.checkoutCreate;

  if (!checkoutCreate) {
    throw new Error("Failed to create checkout");
  }

  const userErrors = checkoutCreate.checkoutUserErrors;
  if (userErrors && userErrors.length > 0) {
    throw new Error(`Failed to create checkout: ${userErrors.map((error: any) => error.message).join('; ')}`);
  }

  const checkout = checkoutCreate.checkout;

  if (!checkout) {
    throw new Error("Checkout creation returned null");
  }

  return checkout;
}

// Update checkout
export async function updateCheckout(checkoutId: string, lineItems: any[]) {
  const query = `
    mutation checkoutLineItemsReplace($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
          lineItems(first: 25) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    checkoutId,
    lineItems: lineItems.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
    })),
  };

  const response = await ShopifyData(query, variables);
  const checkoutLineItemsReplace = response.data?.checkoutLineItemsReplace;

  if (!checkoutLineItemsReplace) {
    throw new Error("Failed to update checkout");
  }

  const userErrors = checkoutLineItemsReplace.checkoutUserErrors;
  if (userErrors && userErrors.length > 0) {
    throw new Error(`Failed to update checkout: ${userErrors.map((error: any) => error.message).join('; ')}`);
  }

  const checkout = checkoutLineItemsReplace.checkout;

  if (!checkout) {
    throw new Error("Checkout update returned null");
  }

  return checkout;
}
