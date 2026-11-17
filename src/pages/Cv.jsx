import React from "react";

import './Share.css';
import Navbar from "../components/Navbar";
import { Divider, Stack } from "@mui/material";
import CvPerso from "../components/cv/CvPerso";
import CvMain from "../components/cv/CvMain";
import PageTimeline from "../components/UI/PageTimeline";
import { sectionPx } from "../components/UI/layout";

const Cv = () => {
  return (
    <div className="background">
        <Navbar />
        <PageTimeline
          pageObjects={[
            {
              id: 1,
              name: { en: "Competences", fr: "Compétences" },
              objectId: "competences"
            },
            {
              id: 2,
              name: { en: "Experiences", fr: "Expériences" },
              objectId: "experiences"
            },
            {
              id: 3,
              name: { en: "Formations", fr: "Formations" },
              objectId: "formations"
            },
            {
              id: 4,
              name: { en: "Associatif", fr: "Associatif" },
              objectId: "associative"
            }
          ]}
          document={document}
        />
        <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 5, md: 2 }} useFlexGap
            sx={{ py: { xs: 3, md: 5 }, px: sectionPx }}>
            <CvPerso />
            <Divider orientation="vertical" flexItem
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', display: { xs: 'none', md: 'block' } }} />
            <CvMain />
        </Stack>
    </div>
  );
};

export default Cv;