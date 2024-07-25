import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useTranslation } from "react-i18next";
import CompetenceCard from "./CompetenceCard";

const Competences = () => {
    const { t } = useTranslation();

    const competenceLabel = {
        1: t("cv.main.competences.softSkills.notation.1"),
        2: t("cv.main.competences.softSkills.notation.2"),
        3: t("cv.main.competences.softSkills.notation.3"),
        4: t("cv.main.competences.softSkills.notation.4"),
        5: t("cv.main.competences.softSkills.notation.5")
    };

    const languageLabel = {
        1: t("cv.main.competences.language.notation.1"),
        2: t("cv.main.competences.language.notation.2"),
        3: t("cv.main.competences.language.notation.3"),
        4: t("cv.main.competences.language.notation.4"),
        5: t("cv.main.competences.language.notation.5")
    };

    return (
        <Stack direction="column" spacing={1} id="competences">
            <Typography variant="h4" gutterBottom color={"white"} >
                {t("cv.main.competences.title")}
            </Typography>
            <div>
                <Accordion defaultExpanded={true}
                    sx={{ backgroundColor: "#003d52", color: "#fff" }}
                >
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography variant="h5" gutterBottom color={"white"}>
                            {t("cv.main.competences.softSkills.title")}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid2 container spacing={2}>
                            {Array.from({ length: parseInt(t("cv.main.competences.softSkills._total")) }, (_, i) => (
                                <Grid2 item xs={12} lg={12} xl={6} key={i}>
                                    <CompetenceCard
                                        competence={{
                                            name: t("cv.main.competences.softSkills.content." + i + ".name"),
                                            level: parseInt(t("cv.main.competences.softSkills.content." + i + "._level"))
                                        }}
                                        notationLabels={competenceLabel}
                                        notationWidth={{
                                            xs: 220,
                                            sm: 250,
                                            lg: 220
                                        }}
                                    />
                                </Grid2>
                            ))}
                        </Grid2>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={{ backgroundColor: "#003d52", color: "#fff" }}
                >
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography variant="h5" gutterBottom>
                            {t("cv.main.competences.language.title")}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid2 container spacing={2}>
                            {Array.from({ length: parseInt(t("cv.main.competences.language._total")) }, (_, i) => (
                                <Grid2 item xs={12} lg={12} xl={6} key={i}>
                                    <CompetenceCard
                                        competence={{
                                            name: t("cv.main.competences.language.content." + i + ".name"),
                                            level: parseInt(t("cv.main.competences.language.content." + i + "._level"))
                                        }}
                                        notationLabels={languageLabel}
                                        notationWidth={{
                                            xs: 220,
                                            sm: 300,
                                            lg: 220
                                        }}
                                    />
                                </Grid2>
                            ))}
                        </Grid2>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Stack>
    );
};

export default Competences;
