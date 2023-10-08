import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import { useEffect, useState } from "react";
import axiosInstance from "../axios-instance.js";
import { useJwt } from "react-jwt";

const BugDashboard = () => {
  const [bugs, setBugs] = useState([]);
  const token = localStorage.getItem("token");
  const { decodedToken: user } = useJwt(token);

  useEffect(() => {
    (async () => {
      const result = await axiosInstance.get("/bugs");
      if (result?.data?.length) {
        setBugs(result.data);
      }
    })();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          height: "40px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem" }}>Bug app</Typography>
        <BugReportOutlinedIcon sx={{ fontSize: "2rem", height: "auto" }} />
      </Box>
      <Box sx={{ display: "flex", padding: "20px" }}>
        {bugs?.map((bug) => (
          <Card sx={{ maxWidth: "250px" }} key={bug._id}>
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }}>
                Bug Title: {bug?.title}
              </Typography>
              <Typography>{bug?.steps}</Typography>
            </CardContent>
            <CardActions>
              {user.role === "developer" && (
                <Button variant="outlined">Finish</Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BugDashboard;
