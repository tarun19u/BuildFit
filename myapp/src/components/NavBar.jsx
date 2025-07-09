// import React,{useState} from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom';
// export default function NavBar() { 
//   const[clicked,setClicked]=useState();
//   return (
//     <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{
//           flexGrow: 1,
//           color: 'white',
//           fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//           fontWeight: 'bold'
//         }}>
//           BUILDFIT
//         </Typography>
//         <Button
//           color="inherit"
//           component={Link}
//           to="/home"
//           sx={{
//             transition: 'transform 0.2s ease-in-out',
//             fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//             fontWeight: 'bold',
//             '&:hover': {
//               transform: 'scale(0.95)'
//             }
//           }}
//         >
//           Home
//         </Button>
//         <Button
//           color="inherit"
//           component={Link}
//           to="/programs"
//           sx={{
//             transition: 'transform 0.2s ease-in-out',
//             fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//             fontWeight: 'bold',
//             '&:hover': {
//               transform: 'scale(0.95)'
//             }
//           }}
//         >
//           Programs
//         </Button>
//         <Button
//           color="inherit"
//           component={Link}
//           to="/about-us"
//           sx={{
//             transition: 'transform 0.2s ease-in-out',
//             fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//             fontWeight: 'bold',
//             '&:hover': {
//               transform: 'scale(0.95)'
//             }
//           }}
//         >
//           About US
//         </Button>

//         <Button
//           color="inherit"
//           component={Link}
//           to="/membership-data"
//           sx={{
//             transition: 'transform 0.2s ease-in-out',
//             fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//             fontWeight: 'bold',
//             '&:hover': {
//               transform: 'scale(0.95)'
//             }
//           }}
//         >
//           Data
//         </Button>
//         <Button
//           color="inherit"
//           component={Link}
//           to="/testimonials"
//           sx={{
//             transition: 'transform 0.2s ease-in-out',
//             fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//             fontWeight: 'bold',
//             '&:hover': {
//               transform: 'scale(0.95)'
//             }
//           }}
//         >
//           Testimonials
//         </Button>
//         <Button
//           color="inherit"
//           component={Link}
//           to="/"
//           sx={{
//             transition: 'transform 0.2s ease-in-out',
//             fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//             fontWeight: 'bold',
//             '&:hover': {
//               transform: 'scale(0.95)'
//             }
//           }}
//         >
//           Shop
//         </Button>
//         <Button
//           color="inherit"
//           component={Link}
//           to="/membership-form"
//           sx={{
//             backgroundColor: '#0b602a',
//             color: 'white',
//             fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
//             fontWeight: 'bold',
//             transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
//             '&:hover': {
//               backgroundColor: '#0a5025',
//               transform: 'scale(0.95)'
//             }
//           }}
//         >
//           Join Us
//         </Button>

//       </Toolbar>
//     </AppBar>
//   );
// }
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Avatar, Menu, MenuItem, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, AccountCircle, Logout } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useSelector((state) => state.cart);
  const { user, isAuthenticated, logout, authMethod } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const isActive = (path) => location.pathname === path;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
    handleMenuClose();
  };

  const navButtonStyle = (path) => ({
    transition: 'transform 0.2s ease-in-out',
    fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
    fontWeight: 'bold',
    backgroundColor: isActive(path) ? '#006400' : 'transparent',
    color: isActive(path) ? '#ffffff' : 'inherit',
    '&:hover': {
      transform: 'scale(0.95)',
      backgroundColor: isActive(path) ? '#444' : '#222'
    }
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: 'white',
            fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
            fontWeight: 'bold'
          }}
        >
          BUILDFIT
        </Typography>

        {/* Show navigation only if authenticated */}
        {isAuthenticated() && (
          <>
            <Button component={Link} to="/home" sx={navButtonStyle('/home')}>Home</Button>
            <Button component={Link} to="/programs" sx={navButtonStyle('/programs')}>Programs</Button>
            <Button component={Link} to="/about-us" sx={navButtonStyle('/about-us')}>About Us</Button>
            <Button component={Link} to="/membership-data" sx={navButtonStyle('/membership-data')}>Data</Button>
            <Button component={Link} to="/testimonials" sx={navButtonStyle('/testimonials')}>Testimonials</Button>
            <Button component={Link} to="/shop" sx={navButtonStyle('/shop')}>Shop</Button>

            <IconButton
              component={Link}
              to="/cart"
              sx={{
                color: 'white',
                mr: 1,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(0.95)'
                }
              }}
            >
              <Badge badgeContent={itemCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <Button
              component={Link}
              to="/membership-form"
              sx={{
                backgroundColor: location.pathname === '/membership-form' ? '#006400' : '#007BFF',
                color: '#ffffff',
                fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
                fontWeight: 'bold',
                transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: location.pathname === '/membership-form' ? '#444444' : '#0a5025',
                  transform: 'scale(0.95)'
                }
              }}
            >
              Join Us
            </Button>
          </>
        )}

        {/* Authentication Section */}
        {isAuthenticated() ? (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {/* User Avatar/Info */}
            <IconButton
              onClick={handleMenuOpen}
              sx={{ color: 'white', ml: 1 }}
            >
              {user?.photoURL ? (
                <Avatar src={user.photoURL} sx={{ width: 32, height: 32 }} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>

            {/* User Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem disabled>
                <Box>
                  <Typography variant="subtitle2">{user?.name || user?.email}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {authMethod === 'firebase' ? 'Google Account' : 'Local Account'}
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          /* Show login/register buttons for non-authenticated users */
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              to="/login"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
              variant="outlined"
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              sx={{
                backgroundColor: '#007BFF',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#0056b3'
                }
              }}
              variant="contained"
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
