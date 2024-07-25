import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/system';

import './Navbar.css';

import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useHistory } from "react-router-dom";

export default function Navbar() {
    const { t } = useTranslation();
    const history = useHistory();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const menuItems = [
        { text: t('navbar.home'), link: '/' },
        { text: t('navbar.projects'), link: '/projects' },
        { text: t('navbar.cv'), link: '/cv' },
        { text: t('navbar.contact'), link: '/contact' },
        // { text: t('navbar.about'), link: '/about' },
    ];

    const handleTranslate = (lng) => {
        if (i18n.language !== lng) {
            localStorage.setItem('i18nextLng', lng);
            i18n.changeLanguage([lng]);
        }
    };

    return (
        <AppBar position="relative" zIndex={10} elevation={0}>
            <Toolbar className="navbar-container">
                {/* Bouton Drawer à gauche */}
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    onClick={() => setDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>

                {/* Drawer pour petit écran */}
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <List sx={{ width: 250 }}>
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => {
                                    history.push(item.link);
                                    setDrawerOpen(false);
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                {/* Menu pour grand écran */}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        gap: '5vw',
                    }}
                >
                    {menuItems.map((item) => (
                        <Button
                            color="inherit"
                            key={item.text}
                            className="navbar-button"
                            onClick={() => history.push(item.link)}
                        >
                            {item.text}
                        </Button>
                    ))}
                </Box>

                {/* Bouton de langue à droite */}
                <Button
                    onClick={() => handleTranslate(i18n.language === 'fr' ? 'en' : 'fr')}
                    className="language-button"
                >
                    {t('navbar.language')}
                </Button>
            </Toolbar>
        </AppBar>
    );
}
