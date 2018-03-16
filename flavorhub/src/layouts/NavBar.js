import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import SearchBar from './SearchBar'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AuthenticationModal from './AuthenticationModal'

class NavBar extends Component {

  handleSignInClick = () => {
    this.props.openAuthModal("signin");
  }

  handleRegistrationClick = () => {
    this.props.openAuthModal("register");
  }

  render() {
    let FlavorHubStyles = {
      flex: this.props.displaySearchBar ? 'none' : 1
    }

    let FlavorHubAnchorStyles = {
      flex: this.props.displaySearchBar ? 'none' : 1,
      textDecoration: 'none'
    }

    return (
      <AppBar className="navBarAppBar" position="static">
         <Toolbar className="navBarToolBar">
           <a href='/' style={FlavorHubAnchorStyles} onClick={()=>this.props.contentChange('/')}>
             <Typography className="navBarLogo" variant="title" style={FlavorHubStyles}>
                 <span className="navBarFlavorLogo">Flavor</span>
                 <span className="navBarHubLogo">Hub</span>
             </Typography>
           </a>

            {(this.props.displaySearchBar) &&
              <SearchBar flex={1}/>
            }

            <Button className="navBarLogin" size="small" variant="raised" onClick={this.handleSignInClick}>Sign in</Button>
            <Button className="navBarRegister" size="small" variant="raised" onClick={this.handleRegistrationClick}>Register</Button>
         </Toolbar>
       </AppBar>
   )
  }
}

export default NavBar;
