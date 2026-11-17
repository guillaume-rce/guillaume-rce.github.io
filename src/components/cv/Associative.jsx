import { Collapse, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Timeline } from "@mui/lab";
import ResponsiveTimelineItem, { timelineSx } from "../UI/ResponsiveTimelineItem";
import WorkIcon from '@mui/icons-material/Work';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from "react-i18next";

const Associative = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false); // État pour gérer l'ouverture

    return (
        <Stack direction="column" spacing={1} id="associative">
            <Stack direction="row"
                style={{ cursor: "pointer" }} onClick={() => setOpen(!open)} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
                    {t("cv.main.associative.title")}
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
                        Array.from({ length: parseInt(t("cv.main.associative._total")) }, (_, i) => (
                            <ResponsiveTimelineItem
                                key={i}
                                last={parseInt(t("cv.main.associative._total")) - 1 === i}
                                opposite={
                                    <Typography variant="subtitle1" sx={{ color: "white" }}>
                                        {t("cv.main.associative.content." + i + ".date.start") + " - " + t("cv.main.associative.content." + i + ".date.end")}
                                    </Typography>
                                }
                            >
                                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                                    {t("cv.main.associative.content." + i + ".name")}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "start" }}>
                                    <WorkIcon fontSize="small" style={{ color: "#959595" }} />
                                    <Typography variant="subtitle1" sx={{ color: "white" }}>
                                        {t("cv.main.associative.content." + i + ".role")}
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ color: "#c9d6d9", lineHeight: 1.65, mt: 0.5 }}>
                                    {t("cv.main.associative.content." + i + ".description")}
                                </Typography>
                            </ResponsiveTimelineItem>
                        ))
                    }
                </Timeline>
            </Collapse>
        </Stack>
    );
};

export default Associative;
