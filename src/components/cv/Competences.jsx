import { Box, Chip, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid";

import { useTranslation } from "react-i18next";

const Competences = () => {
    const { t } = useTranslation();
    const total = parseInt(t("cv.main.competences._total"));

    return (
        <Stack direction="column" spacing={1} id="competences">
            <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
                {t("cv.main.competences.title")}
            </Typography>
            <Grid2 container spacing={2}>
                {Array.from({ length: total }, (_, i) => {
                    const items = t("cv.main.competences.content." + i + ".items", { returnObjects: true });
                    return (
                        <Grid2 size={{ xs: 12, xl: 6 }} key={i}>
                            <Box sx={{ backgroundColor: "#003d52", borderRadius: 1, p: 2, height: "100%", boxSizing: "border-box" }}>
                                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                                    {t("cv.main.competences.content." + i + ".name")}
                                </Typography>
                                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                                    {Array.isArray(items) && items.map((item) => (
                                        <Chip
                                            key={item}
                                            label={item}
                                            variant="outlined"
                                            style={{ color: "#fff" }}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        </Grid2>
                    );
                })}
            </Grid2>
        </Stack>
    );
};

export default Competences;
