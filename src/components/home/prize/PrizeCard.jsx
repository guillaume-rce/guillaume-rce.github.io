import { Box, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import i18n from "../../../translations/i18n"
import { useTranslation } from "react-i18next";

const resources = import.meta.glob('/src/resources/**/*', { eager: true, import: 'default' });

const Prizecard = ({ prize }) => {
    const { t } = useTranslation();
    const lang = i18n.language;

    const img = resources[`/src/resources/${prize.image}`] ?? null;

    return (
        <Card sx={{ display: 'flex' }} style={{ backgroundColor: '#003d52', color: 'white' }}>
            <CardActionArea
                href={prize.link}
                target="_blank"
                rel="noopener noreferrer" >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }} component={Stack} direction="column" spacing={1}>
                        <Typography component="div" variant="h5">
                            {prize.name[lang]}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <EmojiEventsIcon />
                            <Typography variant="subtitle1" color="white">
                                {prize.rank}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Box>
            </CardActionArea>
            <CardMedia component="img" sx={{ width: 151 }} image={img} alt={prize.name[lang]} />
        </Card>
    )
}

export default Prizecard
