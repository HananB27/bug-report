import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import { useEffect, useState } from "react";
import axiosInstance from "../axios-instance.js";

const BugDashboard = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
   (  async () => {
      const result = await axiosInstance.get("/bugs");
      if (result?.data?.length) {
        setBugs(result.data);
        console.log(result);
      }
    }) ();
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
      <Box sx={{ display: "flex" }}>
        {bugs?.map((bug) => (
          <Card>
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }}>
                Bug Title: {bug?.title}
              </Typography>
              <Typography>{bug?.steps}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BugDashboard;
