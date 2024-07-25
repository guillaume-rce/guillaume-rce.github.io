import { Stack, Typography } from "@mui/material";
import Notation from "./Notation";

const CompetenceCard = ({ competence, notationLabels, notationWidth }) => {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography
                variant="body1"
                component={"div"}
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "start",
                }}
                color={"white"}
            >
                {competence.name}
            </Typography>
            <Notation value={competence.level} labels={notationLabels} width={notationWidth} />
        </Stack>
    );
};

export default CompetenceCard;
