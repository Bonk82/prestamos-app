import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PaidIcon from '@mui/icons-material/Paid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupa } from '../context/SupabaseContext';
// import { useAuth } from '../context/AuthContext';

const pages = ['INICIO', 'DASHBOARD', 'PRESTAMOS'];
const settings = ['PERFIL', 'BALANCE', 'SALIR'];

export const Navbar = () => {
  // const {logout} = useSupa();
  // const {user}  = useAuth();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const {avatar,usuario} = useSupa();
  // let location = useLocation();


  // useEffect(()=>{
  //   console.log('la url',location.pathname);
  //   if(!location.pathname.includes('login')) setMostrar(true)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[location])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    console.log(e.target.textContent);
    document.querySelectorAll('.menu-activo').forEach(b=>{
      b.classList.remove('menu-activo')
    })
    const b = document.getElementById(`menu-${e.target.textContent}`)
    console.log('rev',b);
    if (b) b.classList.add('menu-activo')
    setAnchorElNav(null);
    if(e.target.textContent === 'INICIO') navigate('/');
    if(e.target.textContent === 'DASHBOARD'){
      console.log('entrando' );
      navigate('/dashboard');
    } 
    if(e.target.textContent === 'PRESTAMOS') navigate('/prestamo');
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    console.log(e);
  };

  return (
    usuario &&
    <AppBar position="sticky">
      <Container maxWidth="xl" sx={{fontFamily:'monospace',bgcolor:'primary.main',width:{xs:'100vw',md:'100%'}}}>
        <Toolbar disableGutters>
          <PaidIcon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PRESTAMOS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PaidIcon fontSize='large' sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                id={'menu-'+page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block',letterSpacing:'0.4rem',":hover":{bgcolor:'secondary.main'}}}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={avatar} src={avatar} sx={{bgcolor:'antiquewhite'}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
