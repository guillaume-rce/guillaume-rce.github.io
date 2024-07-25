import React, { useRef, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from '../../translations/i18n';
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

const ProjectsComponent = ({ projects, selectedType, projectId }) => {
    const { t } = useTranslation();
    const lang = i18n.language;
    const projectsRef = useRef(null);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            setIsPageLoaded(true);
        };
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    useEffect(() => {
        if (isPageLoaded && projectId) {
            const element = document.getElementById(projectId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                element.classList.add('blink');
                setTimeout(() => {
                    element.classList.remove('blink');
                }, 5000); // Remove the class after 5 seconds
            }
        }
    }, [isPageLoaded, projectId]);

    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="h4" align="left" gutterBottom color={'white'}>
                {selectedType ? selectedType.name[lang] : t('home.projects.title')}
            </Typography>
            <Stack direction="column" spacing={3} ref={projectsRef}>
                <AnimatePresence>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}>
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </Stack>
        </Stack>
    );
}

export default ProjectsComponent;
