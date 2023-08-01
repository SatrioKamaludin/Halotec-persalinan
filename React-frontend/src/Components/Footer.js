import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" color="primary" style={{ top: 'auto', bottom: 0 }}> {/* Position the footer at the bottom */}
      <Toolbar>
        <Typography variant="body1" color="inherit" align="center" style={{ width: '100%' }}>
          &copy; {new Date().getFullYear()} Rumah Sakit Bersalin. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;