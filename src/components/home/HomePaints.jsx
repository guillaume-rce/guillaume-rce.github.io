import React, { useEffect, useState } from 'react';
import { usePaints } from '../../context/PaintsContext';
import './HomePaints.css';
import i18n from '../../translations/i18n';
import { Chip, Stack, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

const resources = import.meta.glob('/src/resources/**/*', { eager: true, import: 'default' });

const HomePaints = () => {
  const lang = i18n.language;
  const { getPaints, getType } = usePaints();
  const paints = getPaints();
  const imagePath = paints[0]?.image;
  const types = paints[0]?.types;
  const [imageSrc, setImageSrc] = useState(null);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const image = resources[`/src/resources/${imagePath}`];
    if (image) setImageSrc(image);
  }, [imagePath]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const image = document.getElementById('paint');
    const imageTop = image.offsetTop - 50;
    const imageHeight = image.clientHeight;
    const imageBottom = imageTop + imageHeight + 50;
    const windowHeight = window.innerHeight;
    const windowBottom = scrollY + windowHeight;
    const isImageVisible = windowBottom > imageTop && scrollY < imageBottom;

    setDraw(isImageVisible);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="image-container"
      id="paint">
      {imageSrc && draw && (
        <div>
          <img
            src={imageSrc}
            alt="Paint"
            className="image"
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              zIndex: '0',
            }}
          />
          <Stack direction="column" spacing={1} className='overlay'
            style={{
              position: 'relative',
              zIndex: '1',
              padding: '5vh 180px',
              width: '100vw',
              height: '100vh',
              background: 'linear-gradient(180deg, rgba(13,29,33,1) 0%, rgba(13,29,33,0) 20%)',
            }} >
            <Typography variant="h4" className='title' color={"white"}>{paints[0].name[lang]}</Typography>
            <Stack direction="row" spacing={2}>
              <Chip label={paints[0].year} style={{ backgroundColor: '#f0f0f0b0', color: '#0d1d21' }}
                icon={<EventIcon />} />
              {types.map((type, index) => (
                getType(type)? <Chip key={index} label={getType(type)[lang]}
                  style={{ backgroundColor: '#f0f0f0b0', color: '#0d1d21' }} />: null
              ))}
            </Stack>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default HomePaints;
