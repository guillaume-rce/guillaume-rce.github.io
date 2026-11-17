import { Collapse, IconButton, Stack, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { Timeline } from "@mui/lab";
import ResponsiveTimelineItem, { timelineSx } from "../UI/ResponsiveTimelineItem";
import TimerIcon from "@mui/icons-material/Timer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from "react-i18next";

const Experiences = () => {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(true);

    return (
        <Stack direction="column" spacing={1} id="experiences">
            <Stack direction="row"
                style={{ cursor: "pointer" }} onClick={() => setOpen(!open)} sx={{ alignItems: "center", justifyContent: "space-between" }} >
                <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
                    {t("cv.main.experiences.title")}
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
                        Array.from({ length: parseInt(t("cv.main.experiences._total")) }, (_, i) => (
                            <ResponsiveTimelineItem
                                key={i}
                                last={parseInt(t("cv.main.experiences._total")) - 1 === i}
                                opposite={<>
                                    <Typography variant="subtitle1" sx={{ color: "white" }}>
                                        {
                                            (parseInt(t("cv.main.experiences.content." + i + ".date.month")) < 10 ?
                                                "0" + t("cv.main.experiences.content." + i + ".date.month") :
                                                t("cv.main.experiences.content." + i + ".date.month"))
                                            + "/" + t("cv.main.experiences.content." + i + ".date.year")
                                        }
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "end" }}>
                                        <TimerIcon style={{ color: "#959595" }} fontSize="small" />
                                        <Typography variant="subtitle1" sx={{ color: "white" }}>
                                            {(i18n.exists("cv.main.experiences.content." + i + ".time.duration")
                                                ? t("cv.main.experiences.content." + i + ".time.duration") + " "
                                                : "") + t("cv.main.experiences.content." + i + ".time.unit")}
                                        </Typography>
                                    </Stack>
                                </>}
                            >
                                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                                    {t("cv.main.experiences.content." + i + ".name")}
                                </Typography>
                                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}
                                    divider={<Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />}>
                                    <Typography variant="subtitle1" sx={{ color: "white" }}>
                                        {t("cv.main.experiences.content." + i + ".company")}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: "white" }}>
                                        {t("cv.main.experiences.content." + i + ".location")}
                                    </Typography>
                                </Stack>
                                <Typography variant="body1" sx={{ color: "#c9d6d9", lineHeight: 1.65, mt: 0.5 }}>
                                    {t("cv.main.experiences.content." + i + ".description")}
                                </Typography>
                                {(t("cv.main.experiences._total") - 1 !== i) && <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', mt: 2 }} />}
                            </ResponsiveTimelineItem>
                        ))
                    }
                </Timeline>
            </Collapse>
        </Stack>
    );
};

export default Experiences;
