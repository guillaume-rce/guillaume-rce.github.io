import {
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import ProfilePhoto from "../../resources/cv/photo_cv_square.JPG";
import cvPDF from "../../resources/cv/CV-Guillaume-ROCHE.pdf";
import { useTranslation } from "react-i18next";
import LanguageCard from "./LanguageCard";

const CvPerso = () => {
  const { t } = useTranslation();
  const dateBirth = new Date(2002, 12, 17);
  const dateNow = new Date();
  const age = dateNow.getFullYear() - dateBirth.getFullYear();

  return (
    <Stack direction="column" spacing={4} width={"30%"}
      maxWidth={"400px"}>
      <img
        src={ProfilePhoto}
        alt="Profile"
        style={{
          width: "90%", maxWidth: "300px", borderRadius: "50%",
          marginLeft: "auto", marginRight: "auto"
        }}
      />
      <Stack direction="column" spacing={2} alignItems="flex-end" width="100%">
        <Typography
          align="center"
          gutterBottom
          color={"white"}
          variant="h4"
          sx={{
            fontSize: {
              xs: "1rem",
              md: "1.5rem",
              lg: "2rem",
            }
          }}
          style={{ whiteSpace: "nowrap", overflow: "hidden" }}
        >
          Guillaume ROCHE
        </Typography>
        <Stack direction="row" justifyContent="end" spacing={1} useFlexGap flexWrap="wrap">
          <Chip label={age + " " + t("cv.personal.age")} variant="outlined" style={{ color: "#fff" }} />
          <Chip label={t("cv.personal.license")} variant="outlined" style={{ color: "#fff" }} />
        </Stack>
        <Button variant="contained" onClick={() => window.open(cvPDF, "_blank")}
          startIcon={<FileDownloadIcon />}
          sx={{
            border: "1px solid #ff5859 !important",
            backgroundColor: "#0000 !important",
            color: "#ff5859 !important",
            transition: "all 0.5s !important",
            fontSize: {
              md: "0.6rem",
              lg: "0.8rem",
            },
            fontWeight: "bold",

            "&:hover": {
              backgroundColor: "#ff5859 !important",
              color: "#0d1d21 !important",
            },
          }}
        >
          {t("cv.personal.download")}
        </Button>
      </Stack>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
      <Stack direction="column" spacing={1}>
        <Typography color={"white"} variant="h6">
          {t("cv.personal.languages.title")}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <div style={{ flex: 1 }}>
            <LanguageCard
              language={t("cv.personal.languages.french")}
              langSubtitle={t("cv.personal.languages.native")}
              certLogo={
                "https://www.certificat-voltaire.fr/wp-content/uploads/2022/09/logo-cv.svg"
              }
              value={601}
              link={"https://mon.certificat-voltaire.fr/verification-certificat?code=WG3ELDK"}
            />
          </div>
          <div style={{ flex: 1 }}>
            <LanguageCard
              language={t("cv.personal.languages.english")}
              langSubtitle={t("cv.personal.languages.intermediate")}
              certLogo={
                "https://certificate.bcdiploma.com/dist/157_0x1B/logo-ets-toeic-173314ec.svg"
              }
              value={810}
              link={"https://www.etsglobal.org/fr/en/digital-score-report/9A9128E74433D8789D5C91B87C979156DD36EFDA8C2C2611FE49A510DB7C4321RmdHR25DN0I3Y0dKa1lCSzQzTEVaUmJvQzZOYmtubDQ3b3VIQ1hzdW92bEZEdTNo"}
            />
          </div>
        </Stack>
      </Stack>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
      <Stack direction="column" spacing={1}>
        <Typography color={"white"} variant="h6">
          {t("cv.personal.interests.title")}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {Array.from({ length: parseInt(t("cv.personal.interests._total")) }).map((_, i) => (
            <Chip
              key={i}
              label={t("cv.personal.interests.content." + i)}
              variant="outlined"
              style={{ color: "#fff" }}
              sx={{
                "&:hover": {
                  backgroundColor: "#003d5277",
                },
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CvPerso;
