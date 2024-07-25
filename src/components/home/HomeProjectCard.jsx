import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";
import i18n from "../../translations/i18n";
import { useHistory } from "react-router-dom";

const resources = import.meta.glob('/src/resources/**/*', { eager: true, import: 'default' });

const HomeProjectCard = ({ project }) => {
    const lang = i18n.language;
    const history = useHistory();
    const { type, src } = project.content;
    const defaultImage = 'https://images.unsplash.com/photo-1557683316-973673baf926';

    const content = resources[`/src/resources/${src}`] ?? null;

    const { backgroundContent, backgroundType, textColor } = project.style;

    let style;
    if (backgroundType === 'color') {
        style = { backgroundColor: backgroundContent };
    } else if (backgroundType === 'image') {
        const backgroundImage = resources[`/src/resources/${backgroundContent}`];
        style = { backgroundImage: `url(${backgroundImage})` };
    } else if (backgroundType === 'gradient') {
        style = { backgroundImage: backgroundContent };
    } else {
        style = { backgroundColor: 'black' };
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}>

            <Card style={style}>
                <CardMedia
                    height="300px"
                    width="300px"
                    component={(!content || type === 'image') ? 'img' : 'video'}
                    alt={project.title[lang]}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                    src={content || defaultImage}
                    {
                    ...(content && type === 'video') && {
                        autoPlay: true,
                        loop: true,
                        muted: true,
                        playsInline: true
                    }
                    }
                />
                <CardContent>
                    <Typography variant="h5" component="div" color={textColor} title={project.title[lang]}
                        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >
                        {project.title[lang]}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={
                            () => history.push(`/projects/${project.id}`)
                        }
                        sx={{
                            border: '1px solid #ff5859',
                            backgroundColor: '#0000',
                            color: '#ff5859',
                            transition: 'all 0.5s',
                            '&:hover': {
                                backgroundColor: '#ff5859',
                                color: '#003d52',
                                border: '1px solid #ff5859',
                            }
                        }}
                    >
                        {i18n.t('home.projectCard.button')}
                    </Button>
                </CardActions>
            </Card>
        </motion.div>
    );
};

export default HomeProjectCard;
