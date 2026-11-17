import "./Share.css"
import "../components/home/Welcome.css"
import Navbar from "../components/Navbar";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="background">
            <Navbar />
            <Stack direction="column" spacing={4}
                sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', px: { xs: 2, sm: 4, md: '128px' }, pb: '10vh' }}>
                <Typography variant="h1" sx={{ color: '#ff5859', fontWeight: 500 }}>
                    404
                </Typography>
                <Typography variant="h5" align="center" sx={{ color: 'white' }}>
                    Not Found
                </Typography>
                <Button variant="contained" className="welcome-button" onClick={() => navigate('/')}>
                    {t('navbar.home')}
                </Button>
            </Stack>
        </div>
    );
}

export default NotFound;
