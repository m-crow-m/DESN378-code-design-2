/**
 * Home Page Component
 * Landing page with hero section and portfolio showcase
 */

import { useState } from "react";
import { motion } from "framer-motion";

// Components
import { PortfolioCard } from "./PortfolioCard";
import { ProjectDetailDialog } from "./ProjectDetailDialog";

// Portfolio Assets
import metalMagazine1 from "../assets/Metal_Magazine_JIC.jpg";
import metalMagazine2 from "../assets/Metal_Magazine_JIC2.jpg";
import metalMagazine3 from "../assets/Metal_Magazine_JIC3.jpg";
import metalMagazine4 from "../assets/Metal_Magazine_JIC4.jpg";
import metalMagazine5 from "../assets/Metal_Magazine_JIC5.jpg";
import metalMagazine6 from "../assets/Metal_Magazine_JIC6.jpg";
import brandingPoster from "../assets/NG.jpg";
import brandingBillboard from "../assets/billboard_neon2.png";
import brandingInsta1 from "../assets/insta-post_neon.png";
import brandingInsta2 from "../assets/insta-post3_neon.png";
import brandingInsta3 from "../assets/insta-postcool_neon.png";
import calendar01 from "../assets/Calender2026-01.png";
import calendar02 from "../assets/Calender2026-02.png";
import calendar03 from "../assets/Calender2026-03.png";
import calendar04 from "../assets/Calender2026-04.png";
import calendar05 from "../assets/Calender2026-05.png";
import calendar06 from "../assets/Calender2026-06.png";
import calendar07 from "../assets/Calender2026-07.png";
import calendar08 from "../assets/Calender2026-08.png";
import calendar09 from "../assets/Calender2026-09.png";
import calendar10 from "../assets/Calender2026-10.png";
import calendar11 from "../assets/Calender2026-11.png";
import calendar12 from "../assets/Calender2026-12.png";
import calendar13 from "../assets/Calender2026-13.png";

// Portfolio project data
const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: "Room Magazine",
    description: "ergonomic layout design",
    imageUrl: metalMagazine1,
    images: [metalMagazine1, metalMagazine2, metalMagazine3, metalMagazine4, metalMagazine5, metalMagazine6],
    details: "Editorial spread designed for ROOM Magazine 2025"
  },
  {
    id: 2,
    title: "BRANDING 1",
    description: "Poster & logo design for Neon Groove Dance Studio, 2025.",
    imageUrl: brandingInsta3,
    images: [brandingInsta3, brandingBillboard, brandingInsta1, brandingInsta2, brandingPoster],
    details: "Poster and logo design for \"neon groove dance studio\" 2025"
  },
  {
    id: 3,
    title: "CALENDAR",
    description: "2026 calendar",
    imageUrl: calendar13,
    images: [calendar13, calendar01, calendar02, calendar03, calendar04, calendar05, calendar06, calendar07, calendar08, calendar09, calendar10, calendar11, calendar12],
    details: "2026 calendar"
  }
];

export function HomePage() {
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_PROJECTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProjectClick = (project: typeof PORTFOLIO_PROJECTS[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      {/* Hero Section - Editorial Layout */}
      <section className="px-4 md:px-8 py-8 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            className="absolute top-4 left-4 md:top-8 md:left-8 text-xs md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            P. 01
          </motion.div>

          <div className="flex justify-center items-center">
            <h1
              className="font-heading uppercase tracking-[-0.15em] text-[35vw] md:text-[38vw] leading-[0.75] select-none"
              style={{
                WebkitTextStroke: "4px black",
                color: "#000000",
                WebkitTextFillColor: "#000000",
                transform: "scaleX(0.75)",
              }}
            >
              NOISE
            </h1>
          </div>

          <div className="mt-12 md:mt-24 lg:mt-32 text-xs md:text-sm max-w-xs">
            A COLLECTION OF WORK<br />
            EMPHASIZING HUMANITY,<br />
            STRUCTURE, AND SPACE
          </div>
        </div>
      </section>

      {/* Portfolio Grid - Editorial Asymmetric Layout */}
      <section className="px-4 md:px-12 lg:px-20 py-12 md:py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto">
          {/* Project 1 - Large */}
          <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-2 flex items-start mb-4 md:mb-0">
              <div className="text-xs md:text-sm space-y-1">
                <div>P. 13</div>
                <div className="mt-4 md:mt-8">01</div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <PortfolioCard
                title={PORTFOLIO_PROJECTS[0].title}
                description={PORTFOLIO_PROJECTS[0].description}
                imageUrl={PORTFOLIO_PROJECTS[0].imageUrl}
                onClick={() => handleProjectClick(PORTFOLIO_PROJECTS[0])}
              />
            </div>
          </div>

          {/* Project 2 */}
          <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-6 md:col-start-4">
              <div className="text-xs md:text-sm mb-4 md:mb-8">
                <div>P. 29</div>
                <div className="mt-2">02</div>
              </div>
              <PortfolioCard
                title={PORTFOLIO_PROJECTS[1].title}
                description={PORTFOLIO_PROJECTS[1].description}
                imageUrl={PORTFOLIO_PROJECTS[1].imageUrl}
                onClick={() => handleProjectClick(PORTFOLIO_PROJECTS[1])}
              />
            </div>
          </div>

          {/* Project 3 - Calendar */}
          <div className="mb-16 md:mb-32 lg:mb-48 grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-2 flex items-start mb-4 md:mb-0">
              <div className="text-xs md:text-sm space-y-1">
                <div>P. 45</div>
                <div className="mt-4 md:mt-8">03</div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <PortfolioCard
                title={PORTFOLIO_PROJECTS[2].title}
                description={PORTFOLIO_PROJECTS[2].description}
                imageUrl={PORTFOLIO_PROJECTS[2].imageUrl}
                onClick={() => handleProjectClick(PORTFOLIO_PROJECTS[2])}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Dialog */}
      <ProjectDetailDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        project={selectedProject}
      />
    </main>
  );
}
