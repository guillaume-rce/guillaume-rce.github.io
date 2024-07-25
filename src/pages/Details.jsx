import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import DetailBanner from "../components/detail/DetailBanner";
import { useProjects } from "../context/ProjectsContext";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

const Details = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language);
    const { id } = useParams();
    const { getProject } = useProjects();
    const project = getProject(id);

    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setLang(lng);
        };
        i18n.on('languageChanged', handleLanguageChange);
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

    return (
        <div className="background">
            <Navbar />
            <DetailBanner project={project} />
            <Stack direction="column" style={{ padding: '0 10vw' }}>
                <Typography variant="h4" style={{ margin: '20px 0' }}>
                    {project.name[lang]}
                </Typography>
            </Stack>
        </div>
    );
};

export default Details;
