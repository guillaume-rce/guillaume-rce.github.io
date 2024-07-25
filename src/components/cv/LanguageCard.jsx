import { useEffect } from 'react';
import { Box, Card, CardActionArea, CardContent, Stack, Typography, styled } from '@mui/material';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const StyledCard = styled(Card)({
    backgroundColor: '#003d52',
});

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'center',
    padding: '0 5px 10px 5px',
});

const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledCertBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledText = styled(Typography)({
    color: '#fff',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
});

const LanguageCard = (props) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));

    useEffect(() => {
        const animation = animate(count, props.value, { duration: 2 });

        return () => { animation.stop(); }
    }, [props.value, count]);

    return (
        <StyledCard variant="outlined">
            <CardActionArea
                href={props.link}
                target="_blank"
                rel="noopener noreferrer">
                <StyledBox>
                    <StyledCardContent>
                        <StyledText variant="h6" component="div" style={{ fontWeight: 'bold', fontSize: '1.3em' }}>
                            {props.language}
                        </StyledText>
                        <StyledText variant="body2" component="div" style={{ fontSize: '1em', fontWeight: 'lighter' }}>
                            {props.langSubtitle}
                        </StyledText>
                    </StyledCardContent>
                    <StyledCertBox>
                        <img src={props.certLogo}
                            alt="Logo" style={{ width: "30px" }}/>
                        <Stack direction="column" spacing={1}>
                            <motion.div style={{ fontSize: "1.5em", color: "#fff" }}>{rounded}</motion.div>
                        </Stack>
                    </StyledCertBox>
                </StyledBox>
            </CardActionArea>
        </StyledCard>
    )
}

export default LanguageCard;
