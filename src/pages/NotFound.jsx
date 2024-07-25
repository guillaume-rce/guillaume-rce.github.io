import "./Share.css"
import Navbar from "../components/Navbar";
import { Stack, Typography } from "@mui/material";

const NotFound = () => {
    return (
        <div className="background">
            <Navbar />
            <Stack direction="column" spacing={2} sx={{ padding: "0 128px 20px 128px"}}>
                <Typography variant="h4" align="center" gutterBottom color={'white'}
                    style={{ marginTop: "30px" }}>
                    404 Not Found
                </Typography>
            </Stack>
        </div>
    );
}

export default NotFound;