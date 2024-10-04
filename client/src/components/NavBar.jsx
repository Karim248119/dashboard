import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { GlobalContext } from "../store/GlobalPrvider/GlobalProvider";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

export default function NavBar(props) {
  const { user, logOut } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = [
    {
      label: "Account",
      path: "/account",
    },
    {
      label: "Wishlist",
      path: "/wishlist",
    },
    {
      label: "Orders",
      path: "/orders",
    },
    {
      label: "Logout",
      action: logOut,
    },
  ];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <nav className="bg-primary text-white py-[1rem]">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <ul className="flex gap-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li></li>
          </ul>
          <div>
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.username} src={user.avatar} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
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
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.label}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting.action) {
                          console.log("Logout");

                          setting.action(navigate);
                        }
                      }}
                    >
                      {setting.path ? (
                        <Link to={setting.path}>{setting.label}</Link>
                      ) : (
                        <Typography sx={{ textAlign: "center" }}>
                          {setting.label}
                        </Typography>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Link to={"/auth"}>Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
