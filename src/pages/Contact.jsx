import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import Navbar from '../components/Navbar';
import { Stack } from '@mui/material';

import './Share.css';

function Contact() {
    return (
        <div className="background">
            <Navbar />
            <Stack direction="column" style={{
                // Prendre toute la hauteur de la page restante
                height: 'calc(100vh - 72px)',
            }} >
                <ContactForm />
            </Stack>
        </div>
    );
}

export default Contact;