import { Collapse, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@mui/lab";
import WorkIcon from '@mui/icons-material/Work';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from "react-i18next";

const Associative = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false); // État pour gérer l'ouverture

    return (
        <Stack direction="column" spacing={4} id="associative">
            <Stack direction="row" alignItems="center" justifyContent="space-between"
                style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
                <Typography variant="h4" gutterBottom color={"white"}>
                    {t("cv.main.associative.title")}
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
                        Array.from({ length: parseInt(t("cv.main.associative._total")) }, (_, i) => (
                            <TimelineItem key={i}>
                                <TimelineOppositeContent sx={{ flex: 0.2 }}>
                                    <Typography variant="subtitle1" color={"white"}>
                                        {t("cv.main.associative.content." + i + ".date.start") + " - " + t("cv.main.associative.content." + i + ".date.end")}
                                    </Typography>
                                </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                {parseInt(t("cv.main.associative._total")) - 1 !== i && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="h6" gutterBottom color={"white"}>
                                    {t("cv.main.associative.content." + i + ".name")}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="start">
                                        <WorkIcon fontSize="small" style={{ color: "#959595" }} />
                                        <Typography variant="subtitle1" color={"white"}>
                                            {t("cv.main.associative.content." + i + ".role")}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body2" color={"white"}>
                                        {t("cv.main.associative.content." + i + ".description")}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>
                        ))
                    }
                </Timeline>
            </Collapse>
        </Stack>
    );
};

export default Associative;
