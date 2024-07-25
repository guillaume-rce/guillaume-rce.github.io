import { Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import './Welcome.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <Stack id='welcome'
            position={'relative'} zIndex={1}
            style={{ padding: '0 180px', backgroundColor: '#0d1d21' }}>
            <Stack direction="row" spacing={2} className='welcome-container'>
                <Stack direction="column" spacing={8} className='welcome-content'>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h4" color={'white'} className='welcome-text'>{t('home.welcome.title')}</Typography>
                        <Typography variant="h7" color={'white'} className='welcome-text'>{t('home.welcome.subtitle')}</Typography>
                    </Stack>
                    <Button variant="contained" className='welcome-button' onClick={() => history.push('/cv')}>
                        {t('home.welcome.button')}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Welcome;