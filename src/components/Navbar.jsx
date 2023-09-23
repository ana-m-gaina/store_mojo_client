import AccountCircle from "@mui/icons-material/AccountCircle";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import { default as React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout } from "../services/userService";

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  alignItems: "center",
  display: "flex",
  height: "100%",
  border: "2px solid theme.palette.primary.main",
  width: "100%",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  padding: theme.spacing(0, 2),
  pointerEvents: "none",
  position: "absolute",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "10px",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchTextChange = event => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/products/search?text=${searchText}`);
  };

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = setting => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      logout(dispatch);
      navigate("/");
    } else {
      navigate("/" + setting.toLowerCase() + "/" + user._id);
    }
  };

  const { category } = useParams();
  const pages = ["Women", "Men", "Teen", "Home"];
  const settings = ["Account", "Orders", "Logout"];

  return (
    <>
      <Toolbar
        sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
          }}
        >
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="primary"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            {pages.map(page => (
              <MenuItem key={page}>
                <Button
                  component={Link}
                  onClose={handleCloseNavMenu}
                  to={`/products?category=${page}`}
                  textAlign="center"
                  color="primary"
                  sx={{ textDecoration: "none" }}
                >
                  {page}
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flex: 1,
          }}
        >
          {pages.map(page => (
            <Button
              component={Link}
              to={`/products?category=${page}`}
              key={page}
              disabled={category === page}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Typography
          component={Link}
          to="/"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{
            display: { xs: "none", sm: "flex" },
            flex: 1,
            justifyContent: { xs: "start", sm: "center" },
            textDecoration: "none",
          }}
        >
          MOJO
        </Typography>

        <Box sx={{ display: "inline-flex", flex: 1, justifyContent: "end" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={handleSearchTextChange}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </Search>

          {user && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pl: 1,
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle color="primary" />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(setting => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          {!user && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pl: 1,
              }}
            >
              <IconButton onClick={() => navigate("/signin")} sx={{ p: 0 }}>
                <AccountCircle color="primary" />
              </IconButton>
            </Box>
          )}

          <Badge
            badgeContent={quantity}
            color="error"
            sx={{
              mr: 1,
              display: "flex",
              justifyContent: "end",
              pl: 1,
            }}
          >
            <IconButton onClick={() => navigate("/cart")} sx={{ p: 0 }}>
              <AddShoppingCartOutlinedIcon color="primary" />
            </IconButton>
          </Badge>
        </Box>
      </Toolbar>
    </>
  );
};
