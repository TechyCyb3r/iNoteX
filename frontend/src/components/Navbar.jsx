    import { Link } from 'react-router-dom'
    import * as React from 'react';
    import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
    import MenuIcon from '@mui/icons-material/Menu';
    import Avatar from '@mui/material/Avatar';
    import NoteIcon from '@mui/icons-material/Note';
    import Img from '../assets/icons8-user-liquid-glass-32.png'
    import PersonIcon from '@mui/icons-material/Person';
    import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
    import LogoutIcon from '@mui/icons-material/Logout';

    const isLogin = localStorage.getItem("token");
    const pages = isLogin ? ['Home', 'About'] : ['Home', 'About', 'Login'];
    const settings = ['Profile', 'Account', 'Logout'];

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
                <AppBar position="static" sx={{ backgroundColor: '#050A30' }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <NoteIcon sx={{ display: { xs: 'none', md: 'flex', transform: 'rotate(-90deg)' }, mr: 1 }} fontSize="medium" />
                            <Typography variant="6" noWrap sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>iNoteX</Typography>

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
                            >iNoteX</Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                                {pages.map((page) => (
                                    <Button key={page} component={Link} to={page === 'Home' ? '/' : `/${page.toLowerCase()}`} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}> {page} </Button>
                                ))}
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>

                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={Img} />
                                    </IconButton>
                                </Tooltip>

                                <Menu sx={{
                                    mt: '45px',
                                    '& .MuiPaper-root': {
                                        p: 2,
                                        borderRadius: 4,
                                        backgroundColor: 'rgba(176, 224, 230, 0.1)',
                                        backdropFilter: 'blur(12px)',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: '#fff',
                                    },
                                }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                    {settings.map((setting) => {
                                        let icon;
                                        if (setting === 'Profile') icon = <PersonIcon sx={{ mr: 1, color: '#1976d2' }} />;
                                        if (setting === 'Account') icon = <ManageAccountsIcon sx={{ mr: 1, color: '#1976d2' }} />;
                                        if (setting === 'Logout') icon = <LogoutIcon sx={{ mr: 1, color: '#d32f2f' }} />;

                                        return (
                                            <MenuItem
                                                key={setting}
                                                onClick={() => {
                                                    handleCloseUserMenu();
                                                    if (setting === 'Profile') window.location.href = '/profile';
                                                    if (setting === 'Account') window.location.href = '/account';
                                                    if (setting === 'Logout') {
                                                        localStorage.removeItem('token');
                                                        window.location.href = '/login';
                                                    }
                                                }}
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                {icon}
                                                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                            </Box>

                        </Toolbar>
                    </Container>
                </AppBar>
            </>
        )
    }

    export default Navbar