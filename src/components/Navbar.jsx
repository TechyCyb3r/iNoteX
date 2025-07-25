import { Link } from 'react-router-dom'
import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import NoteIcon from '@mui/icons-material/Note';

const pages = ['Home', 'About', 'Login', 'Signup'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // let location = useLocation();
    // const isActive = (path) => {
    //     return location.pathname === path ? "active" : "";
    // }
    return (
        <>
            {/* <nav className="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand">My-Notebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/')}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/about')}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> 
                    </div>
                </div>
            </nav> 
            */}


            <AppBar position="static" sx={{ backgroundColor: '#050A30' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <NoteIcon sx={{ display: { xs: 'none', md: 'flex', transform: 'rotate(-90deg)' }, mr: 1 }} fontSize="medium" />
                        <Typography variant="6" noWrap sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>My-Notebook</Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit"> <MenuIcon /> </IconButton>

                            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}> {pages.map((page) => (

                                <MenuItem key={page} component={Link} to={page === 'Home' ? '/' : `/${page.toLowerCase()}`} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>

                            ))}</Menu>
                        </Box>

                        <NoteIcon sx={{ display: { xs: 'flex', md: 'none', transform: 'rotate(-90deg)' }, mr: 1, }} fontSize="medium" />
                        <Typography variant="h5" noWrap sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}
                        >My-Note-Book</Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                            {pages.map((page) => (
                                <Button key={page} component={Link} to={page === 'Home' ? '/' : `/${page.toLowerCase()}`} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}> {page} </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>

                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>

                            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu} >
                                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Navbar