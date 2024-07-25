import React from 'react';
import { Box, CardMedia } from '@mui/material';
import { styled } from '@mui/system';

const BannerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  height: '400px',
}));

const resources = import.meta.glob('/src/resources/**/*', { eager: true, import: 'default' });

const Banner = ({ project }) => {
  const content = project.bannerContent;
  const { type, src } = content;

  const media = resources[`/src/resources/${src}`] ?? null;

  return (
    <BannerContainer>
      <CardMedia
        component={type === 'video' ? 'video' : 'img'}
        src={media}
        alt="Banner"
        style={{ width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center' }}
        {
          ...(type === 'video' ? { autoPlay: true, loop: true, muted: true } : {})
        }
      />
    </BannerContainer>
  );
};

export default Banner;
