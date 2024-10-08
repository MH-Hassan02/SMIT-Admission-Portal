import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const SummaryCard = ({ title, value, description, icon, onClick }) => {
  const StyledCard = styled(Card)(({ theme }) => ({
    minWidth: 160,
    margin: "0.4rem",
    backgroundColor: "#f7f9fc",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "25%",
      margin: "0.5rem 0",
    },
  }));

  return (
    <StyledCard onClick={onClick}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {icon && (
            <Box sx={{ mb: { xs: 1, sm: 0 }, mr: { sm: 2 } }}>{icon}</Box>
          )}
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              {value}
            </Typography>
            <Typography
              color="textSecondary"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default SummaryCard;
