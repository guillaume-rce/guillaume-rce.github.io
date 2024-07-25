import React from "react";

import './Share.css';
import Navbar from "../components/Navbar";
import { Divider, Stack } from "@mui/material";
import CvPerso from "../components/cv/CvPerso";
import CvMain from "../components/cv/CvMain";
import PageTimeline from "../components/UI/PageTimeline";

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
        <Stack direction="row" spacing={2} sx={{ padding: "40px 180px" }}>
            <CvPerso />
            <Divider orientation="vertical" flexItem 
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            <CvMain />
        </Stack>
    </div>
  );
};

export default Cv;