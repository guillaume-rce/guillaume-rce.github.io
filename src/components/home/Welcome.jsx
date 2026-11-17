import { Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import './Welcome.css';
import { sectionPx } from '../UI/layout';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SpaceScene from './SpaceScene';

const Welcome = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Stack id='welcome'
            style={{ backgroundColor: '#0d1d21' }} sx={{ position: 'relative', zIndex: 1, px: sectionPx, overflow: 'hidden' }}>
            <SpaceScene />
            <Stack direction="row" spacing={2} className='welcome-container' sx={{ position: 'relative', zIndex: 1 }}>
                <Stack direction="column" spacing={6} className='welcome-content'>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h3" className='welcome-text'
                            sx={{ color: 'white', fontSize: { xs: '2.25rem', md: '3rem' } }}>
                            {t('home.welcome.title')}
                        </Typography>
                        <Typography variant="body1" className='welcome-text'
                            sx={{ color: '#c9d6d9', fontSize: '1.1rem', lineHeight: 1.6 }}>
                            {t('home.welcome.subtitle')}
                        </Typography>
                    </Stack>
                    <Button variant="contained" className='welcome-button' onClick={() => navigate('/cv')}>
                        {t('home.welcome.button')}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Welcome;
