import { Stack } from "@mui/material";
import {
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
} from "@mui/lab";

// Sur grand écran, `opposite` (dates, durée...) s'affiche à gauche de la timeline.
// Sur mobile, la colonne de gauche est masquée et `opposite` passe au-dessus du contenu.
const ResponsiveTimelineItem = ({ opposite, last, children }) => (
    <TimelineItem>
        <TimelineOppositeContent
            component={Stack}
            direction="column"
            sx={{ flex: 0.2, alignItems: "flex-end", display: { xs: "none", sm: "flex" } }}
        >
            {opposite}
        </TimelineOppositeContent>
        <TimelineSeparator>
            <TimelineDot variant="outlined" sx={{ borderColor: "#ff5859" }} />
            {!last && <TimelineConnector sx={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }} />}
        </TimelineSeparator>
        <TimelineContent sx={{ minWidth: 0, pr: { xs: 0, sm: 2 } }}>
            <Stack
                direction="column"
                sx={{
                    display: { xs: "flex", sm: "none" },
                    alignItems: "flex-start",
                    mb: 1,
                    "& .MuiStack-root": { justifyContent: "flex-start" },
                }}
            >
                {opposite}
            </Stack>
            {children}
        </TimelineContent>
    </TimelineItem>
);

export const timelineSx = { px: { xs: 0, sm: 2 } };

export default ResponsiveTimelineItem;
