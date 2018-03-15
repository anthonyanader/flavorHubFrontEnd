import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class NavBar extends Component {
  render() {
    return (
      <AppBar className="navBarAppBar" position="static">
         <Toolbar className="navBarToolBar">
           <Typography className="navBarLogo" variant="title" style={{flex: 1}}>
             <span className="navBarFlavorLogo">Flavor</span>
             <span className="navBarHubLogo">Hub</span>
           </Typography>
           <Button className="navBarLogin" size="small" variant="raised">Sign in</Button>
           <Button className="navBarRegister" size="small" variant="raised">Register</Button>
         </Toolbar>
       </AppBar>
   );
  }
}

export default NavBar;
