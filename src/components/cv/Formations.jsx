import { Collapse, IconButton, Stack, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { Timeline } from "@mui/lab";
import ResponsiveTimelineItem, { timelineSx } from "../UI/ResponsiveTimelineItem";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from "react-i18next";

const Formations = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false); // État pour gérer l'ouverture

    return (
        <Stack direction="column" spacing={1} id="formations">
            <Stack direction="row"
                style={{ cursor: "pointer" }} onClick={() => setOpen(!open)} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
                    {t("cv.main.formation.title")}
                </Typography>
                <IconButton>
                    {
                        open ? <ExpandLessIcon style={{ color: "#fff" }} /> : <ExpandMoreIcon style={{ color: "#fff" }} />
                    }
                </IconButton>
            </Stack>
            <Collapse in={open}>
                <Timeline sx={timelineSx}>
                    {
                        Array.from({ length: parseInt(t("cv.main.formation._total")) }, (_, i) => (
                            <ResponsiveTimelineItem
                                key={i}
                                last={parseInt(t("cv.main.formation._total")) - 1 === i}
                                opposite={
                                    <Typography variant="subtitle1" sx={{ color: "white" }}>
                                        {t("cv.main.formation.content." + i + ".date.start") + " - " + t("cv.main.formation.content." + i + ".date.end")}
                                    </Typography>
                                }
                            >
                                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                                    {t("cv.main.formation.content." + i + ".name")}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "start" }}>
                                    <LocationOnIcon fontSize="small" style={{ color: "#959595" }} />
                                    <Typography variant="subtitle1" sx={{ color: "white" }}>
                                        {t("cv.main.formation.content." + i + ".location")}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} useFlexGap
                                    divider={<Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />} sx={{ marginTop: 1, flexWrap: "wrap" }}>
                                    {t("cv.main.formation.content." + i + ".diploma") !== "" && (
                                        <Typography variant="body2" sx={{ color: "white" }}>
                                            {t("cv.main.formation.content." + i + ".diploma")}
                                        </Typography>
                                    )}
                                    {t("cv.main.formation.content." + i + ".mention") !== "" && (
                                        <Typography variant="body2" sx={{ color: "white" }}>
                                            {t("cv.main.formation.content." + i + ".mention")}
                                        </Typography>
                                    )}
                                </Stack>
                                {parseInt(t("cv.main.formation._total")) - 1 !== i && (
                                    <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                                )}
                            </ResponsiveTimelineItem>
                        ))
                    }
                </Timeline>
            </Collapse>
        </Stack>
    );
};

export default Formations;
