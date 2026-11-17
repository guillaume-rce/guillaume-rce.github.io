import { Timeline } from "@mui/lab";
import { usePrizes } from "../../../context/PrizeContext";
import Prizecard from "./PrizeCard";
import { Stack, Typography } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import i18n from "../../../translations/i18n";
import { useTranslation } from "react-i18next";
import ResponsiveTimelineItem, { timelineSx } from "../../UI/ResponsiveTimelineItem";
import { sectionPx } from "../../UI/layout";

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
            style={{ backgroundColor: "#0d1d21" }}
            sx={{ position: "relative", zIndex: 1, py: 5, px: sectionPx }}
        >
            <Typography variant="h4" align="left" gutterBottom sx={{ color: "white" }}>
                {t("home.prizes.title")}
            </Typography>
            <Timeline sx={timelineSx}>
                {prizes.map((prize, index) => (
                    <ResponsiveTimelineItem
                        key={prize.id}
                        last={index === prizes.length - 1}
                        opposite={<>
                            <Typography variant="subtitle1"
                                noWrap style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} sx={{ color: "white" }}
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
                                <Typography variant="subtitle2"
                                    noWrap style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} sx={{ color: "white" }}
                                >
                                    {prize.time + " " + prize.timeUnit[lang]}
                                </Typography>
                            </Stack>
                        </>}
                    >
                        <Prizecard prize={prize} />
                    </ResponsiveTimelineItem>
                ))}
            </Timeline>
        </Stack>
    );
};

export default HomePrizes;
