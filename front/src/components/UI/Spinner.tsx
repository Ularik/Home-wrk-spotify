import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";


const Spinner = () => {
    return (
        <Box sx={{ 
            position: "absolute", 
            inset: 0,
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            zIndex: 1,
            bgcolor: "rgba(255, 255, 255, 0.7)" 
            }}>
            <CircularProgress/>
        </Box>
    )
};

export default Spinner;