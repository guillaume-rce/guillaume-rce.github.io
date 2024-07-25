import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

import { TextField, Button, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { motion } from 'framer-motion';
import './ContactForm.css';

import backgroundImage from '../../resources/contact_bg.JPG';

const CustomIcon = ({ IconComponent, link, ...props }) => (
    <motion.div
        onClick={() => window.open(link, '_blank')}
        whileHover={{
            scale: 1.2,
            transition: {
                duration: 0.5
            }
        }}
        whileTap={{
            scale: 0.8,
            transition: {
                duration: 0.2
            }
        }}
    >
        <IconComponent {...props} />
    </motion.div>
);

const CssTextField = styled(TextField)({
    borderRadius: 5,
    '& label': {
        color: '#A0AAB4',
    },
    '& label.Mui-focused': {
        color: '#A0AAB4',
        borderRadius: 5,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
        borderRadius: 5,
    },
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
            borderRadius: 5,
            transition: 'all 0.3s',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
            borderRadius: 5,
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
            borderRadius: 5,
        },
    },
});

const ContactForm = () => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const form = useRef(); 
    const sendEmail = (e) => { 
        e.preventDefault(); 
        emailjs.sendForm(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_PUBLIC_KEY
        ).then( (result) => { alert('message sent successfully...'); console.log(result.text); },
        (error) => { 
            console.log(error.text); 
        } );
    }; 

    return (
        <motion.div
            className="contact-form-background"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: loading ? 0 : 1
            }}
            transition={{
                duration: 1
            }}
        >
            {!loading && (
                <Stack 
                    direction="column"
                    className="contact-form-container"
                    sx={{
                        width: {
                            sm: '100%',
                            md: '50%'
                        },
                        position: 'relative',
                        left: {
                            sm: '0',
                            md: '50%'
                        },
                    }}
                    >
                    <form
                        ref={form}
                        onSubmit={sendEmail}
                        className="contact-form"
                    >
                        <Stack direction="row" spacing={2} width="100%">
                            <Typography variant="h3" align="center" gutterBottom color="white"
                                sx={{
                                    fontSize: {
                                        xs: '2rem',
                                        sm: '3rem'
                                    }
                                }}
                            >
                                {t('contact.title')}
                            </Typography>
                            <Stack direction="row" spacing={2} className="social-icons" color={'white'}>
                                <CustomIcon
                                    IconComponent={GitHubIcon}
                                    link="https://github.com/guillaume-rce"
                                />
                                <CustomIcon
                                    IconComponent={LinkedInIcon}
                                    link="https://www.linkedin.com/in/guillaume-rce/"
                                />
                                <CustomIcon
                                    IconComponent={InstagramIcon}
                                    link="https://www.instagram.com/guillaume.rce/"
                                />
                            </Stack>
                        </Stack>
                        <CssTextField
                            label={t('contact.form.name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                            name='user_name'
                            type='text'
                            required
                        />
                        <CssTextField
                            label={t('contact.form.email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            name='user_email'
                            type="email"
                            required
                        />
                        <CssTextField
                            label={t('contact.form.message')}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            name='message'
                            type='text'
                            required
                        />
                        <Button type="submit" variant="contained" className='submit-button'
                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: "200px"
                                }
                            }}
                        >
                            {t('contact.form.button')}
                        </Button>
                    </form>
                </Stack>
            )}
        </motion.div>
    );
};

export default ContactForm;
