import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Stack,
    Chip,
    Tooltip,
    Fade
} from '@mui/material';
import i18n from "../../translations/i18n";
import { useHistory } from "react-router-dom";
import { useProjects } from "../../context/ProjectsContext";
import './ProjectCard.css';

const resources = import.meta.glob('/src/resources/**/*', { eager: true, import: 'default' });

const ProjectCard = ({ project }) => {
    const lang = i18n.language;
    const history = useHistory();
    const { getType } = useProjects();

    const title = project.name[lang];
    const description = project.description[lang];
    const typesIndexes = project.types;
    const types = typesIndexes.map((type) => getType(type));
    const link = project.link || null;
    const technologies = project.technologies;
    const defaultImage = 'https://images.unsplash.com/photo-1557683316-973673baf926';

    const { type, src } = project.projectCardContent;
    const content = resources[`/src/resources/${src}`] ?? null;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                backgroundColor: '#003d52',
                width: '100%',
            }}
            id={project.id}
            elevation={5}
        >
            <CardMedia
                component={type === 'image' ? 'img' : 'video'}
                sx={{
                    width: { xs: '100%', sm: '300px' },
                    height: { xs: '200px', sm: 'auto' },
                    maxHeight: { xs: '200px', sm: '100%' },
                    minHeight: { xs: '200px', sm: '300px' },
                    objectFit: 'cover',
                    objectPosition: 'center',
                    order: { xs: 0, sm: 1 },
                }}
                alt={title}
                src={content || defaultImage}
                {...(content && type === 'video' && {
                    autoPlay: true,
                    loop: true,
                    muted: true,
                    playsInline: true,
                })}
            />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    order: { xs: 1, sm: 0 },
                }}
            >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h5" component="div" color={'white'} title={title}>
                            {title}
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            {types.map((type, index) => (
                                <Tooltip
                                    key={index}
                                    title={type.description[lang]}
                                    placement="left"
                                    arrow
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                >
                                    <Chip
                                        key={index}
                                        label={type.name[lang]}
                                        variant="outlined"
                                        className="chip shimmering"
                                        size="medium"
                                        sx={{ color: '#fff', borderColor: '#fff' }}
                                    />
                                </Tooltip>
                            ))}
                        </Stack>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            {technologies.map((tech, index) => (
                                <Chip key={index} label={tech} variant="outlined" style={{ color: '#fff' }} size="small" />
                            ))}
                        </Stack>
                        <Typography variant="body2" color={'white'} align="justify">
                            {description}
                        </Typography>
                    </Stack>
                </CardContent>
                {link && (
                    <CardActions>
                        <Button
                            size="small"
                            onClick={() => window.open(link, "_blank")}
                            variant="outlined"
                            sx={{
                                border: '1px solid #ff5859',
                                backgroundColor: '#0000',
                                color: '#ff5859',
                                transition: 'all 0.5s',
                                '&:hover': {
                                    backgroundColor: '#ff5859',
                                    color: '#003d52',
                                    border: '1px solid #ff5859',
                                },
                            }}
                        >
                            {i18n.t('projects.projectCard.button')}
                        </Button>
                    </CardActions>
                )}
            </Box>
        </Card>
    );
};

export default ProjectCard;
