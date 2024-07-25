import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
} from "@mui/lab";
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { usePrizes } from "../../../context/PrizeContext";
import Prizecard from "./PrizeCard";
import { Stack, Typography } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import i18n from "../../../translations/i18n";
import { useTranslation } from "react-i18next";

const HomePrizes = () => {
    const { t } = useTranslation();
    const lang = i18n.language;
    const { getPrizes } = usePrizes();
    const prizes = getPrizes();

    // Sort the prizes by date (youngest first)
    prizes.sort((a, b) => {
        if (a.date.year === b.date.year) {
            return b.date.month - a.date.month;
        }
        return b.date.year - a.date.year;
    });

    return (
        <Stack id="prizes"
            direction={"column"}
            spacing={2}
            position={"relative"}
            zIndex={1}
            style={{ padding: "40px 180px", backgroundColor: "#0d1d21" }}
        >
            <Typography variant="h4" align="left" gutterBottom color={"white"}>
                {t("home.prizes.title")}
            </Typography>
            <Timeline
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.2,
                    },
                }}
            >
                {prizes.map((prize) => (
                    <TimelineItem key={prize.id}>
                        <TimelineOppositeContent
                            component={Stack}
                            direction={"column"}
                            alignItems={"flex-end"}
                        >
                            <Typography variant="subtitle1" color="white"
                                noWrap style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            >
                                {prize.date.month < 10
                                    ? "0" + prize.date.month + "/" + prize.date.year
                                    : prize.date.month + "/" + prize.date.year}
                            </Typography>
                            <Stack direction={"row"} spacing={1}>
                                <TimerIcon
                                    style={{ color: "#757575" }}
                                    fontSize="small"
                                />
                                <Typography variant="subtitle2" color="white"
                                    noWrap style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                                >
                                    {prize.time + " " + prize.timeUnit[lang]}
                                </Typography>
                            </Stack>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            {
                                // If it is not the last prize, show the connector
                                prizes[prizes.length - 1].id !== prize.id && (
                                    <TimelineConnector />
                                )
                            }
                        </TimelineSeparator>
                        <TimelineContent>
                            <Prizecard prize={prize} />
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Stack>
    );
};

export default HomePrizes;
