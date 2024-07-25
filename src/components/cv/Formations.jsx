import { Collapse, IconButton, Stack, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@mui/lab";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from "react-i18next";

const Formations = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false); // État pour gérer l'ouverture

    return (
        <Stack direction="column" spacing={4} id="formations">
            <Stack direction="row" alignItems="center" justifyContent="space-between"
                style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
                <Typography variant="h4" gutterBottom color="white">
                    {t("cv.main.formation.title")}
                </Typography>
                <IconButton>
                    {
                        open ? <ExpandLessIcon style={{ color: "#fff" }} /> : <ExpandMoreIcon style={{ color: "#fff" }} />
                    }
                </IconButton>
            </Stack>
            <Collapse in={open}>
                <Timeline>
                    {
                        Array.from({ length: parseInt(t("cv.main.formation._total")) }, (_, i) => (
                            <TimelineItem key={i}>
                                <TimelineOppositeContent sx={{ flex: 0.2 }}>
                                    <Typography variant="subtitle1" color="white">
                                        {t("cv.main.formation.content." + i + ".date.start") + " - " + t("cv.main.formation.content." + i + ".date.end")}
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    {parseInt(t("cv.main.formation._total")) - 1 !== i && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Typography variant="h6" gutterBottom color="white">
                                        {t("cv.main.formation.content." + i + ".name")}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="start">
                                        <LocationOnIcon fontSize="small" style={{ color: "#959595" }} />
                                        <Typography variant="subtitle1" color="white">
                                            {t("cv.main.formation.content." + i + ".location")}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} marginTop={1}
                                        divider={<Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />}>
                                        {t("cv.main.formation.content." + i + ".diploma") !== "" && (
                                            <Typography variant="body2" color="white">
                                                {t("cv.main.formation.content." + i + ".diploma")}
                                            </Typography>
                                        )}
                                        {t("cv.main.formation.content." + i + ".mention") !== "" && (
                                            <Typography variant="body2" color="white">
                                                {t("cv.main.formation.content." + i + ".mention")}
                                            </Typography>
                                        )}
                                    </Stack>
                                    {parseInt(t("cv.main.formation._total")) - 1 !== i && (
                                        <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                                    )}
                                </TimelineContent>
                            </TimelineItem>
                        ))
                    }
                </Timeline>
            </Collapse>
        </Stack>
    );
};

export default Formations;
