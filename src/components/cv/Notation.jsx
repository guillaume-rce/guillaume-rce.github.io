import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';

const Notation = ({ value, labels, width }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                width
            }}
        >
            <Rating
                name="text-feedback"
                value={value}
                readOnly
                precision={1}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box component={Typography} variant="body2" color={"white"} sx={{ ml: 2,
                // Enable hyphens
                wordBreak: 'break-word',
                hyphens: 'auto'
            }}>
                {labels[value]}
            </Box>
        </Box>
    );
}

export default Notation;
