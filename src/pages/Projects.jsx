import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useProjects } from "../context/ProjectsContext";

import Navbar from "../components/Navbar";
import ProjectsComponent from "../components/projects/ProjectsComponent";
import Sorting from "../components/projects/Sorting";

import "./Share.css";
import { useParams } from "react-router-dom";

const Projects = () => {
    const { id } = useParams();
    const { getProjects, getProjectsByType } = useProjects();

    const [selectedType, setSelectedType] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (selectedType) {
            setProjects(getProjectsByType(selectedType));
        } else {
            setProjects(getProjects());
        }
    }, [selectedType, getProjects, getProjectsByType]);

    useEffect(() => {
        if (id) {
            setSelectedType(null);
        }
    }, [id]);

    return (
        <div className="background">
            <Navbar />
            <Stack 
                direction="column" 
                spacing={4} 
                sx={{
                    padding: { xs: '16px', sm: '24px', md: '40px 180px' },
                    alignItems: { xs: 'center', md: 'stretch' }
                }}
            >
                <Sorting selectedType={selectedType} setSelectedType={setSelectedType} />
                <ProjectsComponent projects={projects} projectId={id} />
            </Stack>
        </div>
    );
};

export default Projects;
