import { Collapse, IconButton, Stack, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@mui/lab";
import TimerIcon from "@mui/icons-material/Timer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from "react-i18next";

const Experiences = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(true);

    return (
        <Stack direction="column" spacing={4} id="experiences">
            <Stack direction="row" alignItems="center" justifyContent="space-between"
                onClick={() => setOpen(!open)} >
                <Typography variant="h4" gutterBottom color="white">
                    {t("cv.main.experiences.title")}
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
                        Array.from({ length: parseInt(t("cv.main.experiences._total")) }, (_, i) => (
                            <TimelineItem key={i}>
                                <TimelineOppositeContent sx={{ flex: 0.2 }}>
                                    <Typography variant="subtitle1" color="white">
                                        {
                                            (parseInt(t("cv.main.experiences.content." + i + ".date.month")) < 10 ? 
                                                "0" + t("cv.main.experiences.content." + i + ".date.month") :
                                                t("cv.main.experiences.content." + i + ".date.month"))
                                            + "/" + t("cv.main.experiences.content." + i + ".date.year")
                                        }
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="end">
                                        <TimerIcon style={{ color: "#959595" }} fontSize="small" />
                                        <Typography variant="subtitle1" color="white">
                                            {t("cv.main.experiences.content." + i + ".time.duration") + " " + t("cv.main.experiences.content." + i + ".time.unit")}
                                        </Typography>
                                    </Stack>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    {parseInt(t("cv.main.experiences._total")) - 1 !== i && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Typography variant="h6" gutterBottom color="white">
                                        {t("cv.main.experiences.content." + i + ".name")}
                                    </Typography>
                                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />}>
                                        <Typography variant="subtitle1" color="white">
                                            {t("cv.main.experiences.content." + i + ".company")}
                                        </Typography>
                                        <Typography variant="subtitle1" color="white">
                                            {t("cv.main.experiences.content." + i + ".location")}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body1" color="white">
                                        {t("cv.main.experiences.content." + i + ".description")}
                                    </Typography>
                                    {(t("cv.main.experiences._total") - 1 !== i) && <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', mt: 2 }} />}
                                </TimelineContent>
                            </TimelineItem>
                        ))
                    }
                </Timeline>
            </Collapse>
        </Stack>
    );
};

export default Experiences;
