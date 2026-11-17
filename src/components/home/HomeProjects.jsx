import React, { useRef } from 'react';
import { Stack, Typography } from "@mui/material";
import { useProjects } from '../../context/ProjectsContext';
import { useTranslation } from "react-i18next";
import Grid2 from "@mui/material/Grid";
import { AnimatePresence } from "framer-motion";

import HomeProjectCard from "./HomeProjectCard";
import { sectionPx } from "../UI/layout";

const HomeProjects = () => {
    const { t } = useTranslation();
    const projectsRef = useRef(null);
    const { getProjects } = useProjects();

    const projects = getProjects();
    const projectsCopy = [...projects];
    projectsCopy.splice(9);

    return (
        <Stack id='projects'
            direction="column" spacing={2} style={{
                backgroundColor: '#0d1d21'
            }} sx={{ position: 'relative', zIndex: 1, px: sectionPx, pb: 5 }}>
            <Typography variant="h4" align="left" gutterBottom sx={{ color: 'white' }}>
                {t('home.projects.title')}
            </Typography>
            <Grid2 container spacing={3} ref={projectsRef}>
                <AnimatePresence>
                    {projectsCopy.map((project, index) => (
                        <Grid2
                            key={project.id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                            sx={{ position: 'relative', zIndex: 2 }}
                        >
                            <HomeProjectCard project={{ ...project.homeCard, id: project.id }} />
                        </Grid2>
                    ))}
                </AnimatePresence>
            </Grid2>
        </Stack>
    );
}

export default HomeProjects;
