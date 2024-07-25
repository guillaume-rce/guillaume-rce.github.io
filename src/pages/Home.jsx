import React from 'react';
import './Share.css';

import Navbar from '../components/Navbar';
import Welcome from '../components/home/Welcome';
import HomeProjects from '../components/home/HomeProjects';
import { Stack } from '@mui/material';
import HomePaints from '../components/home/HomePaints';
import HomePrizes from '../components/home/prize/HomePrizes';
import PageTimeline from '../components/UI/PageTimeline';

const Home = () => {


  return (
    <div className="background">
      <Navbar />
      <PageTimeline
        pageObjects={[
          {
            id: 1,
            name: { en: "Welcome", fr: "Bienvenue" },
            objectId: "welcome"
          },
          {
            id: 2,
            name: { en: "Projects", fr: "Projets" },
            objectId: "projects"
          },
          {
            id: 3,
            name: { en: "Paints", fr: "Peintures" },
            objectId: "paint"
          },
          {
            id: 4,
            name: { en: "Prizes", fr: "Prix" },
            objectId: "prizes"
          }
        ]}
        document={document}
      />
      <Stack direction="column">
        <Welcome />
        <HomeProjects />
        <HomePaints />
        <HomePrizes />
      </Stack>
    </div>
  );
}

export default Home;
