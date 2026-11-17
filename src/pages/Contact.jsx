import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import Navbar from '../components/Navbar';
import { Stack } from '@mui/material';

import './Share.css';

function Contact() {
    return (
        <div className="background">
            <Navbar />
            {/* Prend toute la hauteur restante sous la navbar, et grandit si le formulaire dépasse */}
            <Stack direction="column" sx={{ flex: 1 }}>
                <ContactForm />
            </Stack>
        </div>
    );
}

export default Contact;