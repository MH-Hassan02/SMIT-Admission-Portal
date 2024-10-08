import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  FaUserAlt,
  FaMapMarkerAlt,
  FaBook,
  FaPlus,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo-OpazD70S.png";
import "../Pages/AdminDashboard.css";

// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: "10px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Layout({
  searchTerm,
  onSearchChange,
  onTabChange,
  selectedTab,
}) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignOut = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          onTabChange("Students");
          handleMobileMenuClose();
        }}
        selected={selectedTab === "Students"}
      >
        <FaUserAlt style={{ marginRight: 8 }} />
        Students
      </MenuItem>
      <MenuItem
        onClick={() => {
          onTabChange("Test Venue");
          handleMobileMenuClose();
        }}
        selected={selectedTab === "Test Venue"}
      >
        <FaMapMarkerAlt style={{ marginRight: 8 }} />
        Test Venue
      </MenuItem>
      <MenuItem
        onClick={() => {
          onTabChange("Courses");
          handleMobileMenuClose();
        }}
        selected={selectedTab === "Courses"}
      >
        <FaBook style={{ marginRight: 8 }} />
        Courses
      </MenuItem>
      <MenuItem
        onClick={() => {
          onTabChange("Add Venue");
          handleMobileMenuClose();
        }}
        selected={selectedTab === "Add Venue"}
      >
        <FaPlus style={{ marginRight: 8 }} />
        Add Venue
      </MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              display: { xs: "block", sm: "block" },
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <img
              src={logo}
              alt="Admin Portal Logo"
              style={{ height: "40px", width: "auto" }}
            />
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={onSearchChange}
            />
          </Search>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <MenuItem
              onClick={() => onTabChange("Students")}
              selected={selectedTab === "Students"}
            >
              <FaUserAlt style={{ marginRight: 8 }} />
              Students
            </MenuItem>
            <MenuItem
              onClick={() => onTabChange("Test Venue")}
              selected={selectedTab === "Test Venue"}
            >
              <FaMapMarkerAlt style={{ marginRight: 8 }} />
              Test Venue
            </MenuItem>
            <MenuItem
              onClick={() => onTabChange("Courses")}
              selected={selectedTab === "Courses"}
            >
              <FaBook style={{ marginRight: 8 }} />
              Courses
            </MenuItem>
            <MenuItem
              onClick={() => onTabChange("Add Venue")}
              selected={selectedTab === "Add Venue"}
            >
              <FaPlus style={{ marginRight: 8 }} />
              Add Venue
            </MenuItem>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
