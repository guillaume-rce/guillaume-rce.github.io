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
  const dateBirth = new Date(2002, 11, 17); // les mois commencent à 0 : 11 = décembre
  const dateNow = new Date();
  const hadBirthday = dateNow.getMonth() > dateBirth.getMonth()
    || (dateNow.getMonth() === dateBirth.getMonth() && dateNow.getDate() >= dateBirth.getDate());
  const age = dateNow.getFullYear() - dateBirth.getFullYear() - (hadBirthday ? 0 : 1);

  return (
    <Stack direction="column" spacing={4}
      sx={{ width: { xs: "100%", md: "30%" }, maxWidth: { md: "400px" }, flexShrink: 0 }}>
      <img
        src={ProfilePhoto}
        alt="Profile"
        style={{
          width: "90%", maxWidth: "300px", borderRadius: "50%",
          marginLeft: "auto", marginRight: "auto"
        }}
      />
      <Stack direction="column" spacing={2}
        sx={{ alignItems: "center", width: "100%" }}>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
          sx={{ color: "white",
            fontSize: {
              xs: "1.75rem",
              md: "1.5rem",
              lg: "2rem",
            }
          }}
          style={{ whiteSpace: "nowrap", overflow: "hidden" }}
        >
          Guillaume ROCHE
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap
          sx={{ justifyContent: "center", flexWrap: "wrap" }}>
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
        <Typography variant="h6" sx={{ color: "white" }}>
          {t("cv.personal.languages.title")}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
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
              langSubtitle={t("cv.personal.languages.professional")}
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
        <Typography variant="h6" sx={{ color: "white" }}>
          {t("cv.personal.interests.title")}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
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
