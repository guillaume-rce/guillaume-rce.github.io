import { Button, Stack } from "@mui/material";
import Competences from "./Competences";
import Experiences from "./Experiences";
import Formations from "./Formations";
import Associative from "./Associative";
import HomePrizes from "../home/prize/HomePrizes";

const CvMain = () => {
    return (
        <Stack direction="column" spacing={4}>
            <Competences />
            <Experiences />
            <Formations />
            <Associative />
        </Stack>
    );
}

export default CvMain;