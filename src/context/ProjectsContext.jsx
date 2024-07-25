import { createContext, useContext } from 'react';
import projectsData from '../resources/projects.json';

const ProjectContext = createContext();

export function useProjects() {
    return useContext(ProjectContext);
}

export const ProjectsProvider = ({ children }) => {
    const { projects, types } = projectsData;

    const getTypes = () => {
        return types;
    };

    const getType = (id) => {
        return types.find((type) => type.id === id);
    }

    const getTypeByName = (name) => {
        return types.find((type) => type.name['en'] === name || type.name['fr'] === name);
    }

    const getProjects = () => {
        return projects;
    };

    const getProject = (id) => {
        return projects.find((project) => parseInt(project.id) === parseInt(id));
    };

    const getProjectsByType = (typeId) => {
        return projects.filter((project) => project.types.includes(typeId));
    };

    const value = {
        getTypes,
        getType,
        getTypeByName,
        getProjects,
        getProject,
        getProjectsByType,
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
