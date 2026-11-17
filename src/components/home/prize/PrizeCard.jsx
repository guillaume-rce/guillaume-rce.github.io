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
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' } }}
            style={{ backgroundColor: '#003d52', color: 'white' }}>
            <CardActionArea
                href={prize.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ flex: 1, minWidth: 0 }} >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }} component={Stack} direction="column" spacing={1}>
                        <Typography component="div" variant="h5"
                            sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, overflowWrap: 'anywhere' }}>
                            {prize.name[lang]}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <EmojiEventsIcon />
                            <Typography variant="subtitle1" sx={{ color: "white" }}>
                                {prize.rank}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Box>
            </CardActionArea>
            <CardMedia component="img" sx={{ width: { xs: '100%', sm: 151 }, height: { xs: 140, sm: 'auto' }, objectFit: 'cover', flexShrink: 0 }} image={img} alt={prize.name[lang]} />
        </Card>
    )
}

export default Prizecard
