import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import SearchBar from './SearchBar'
import Avatar from 'material-ui/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';

class NavBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTag: null
    }
  }

  handleSignInClick = () => {
    this.props.openAuthModal("signin");
  }

  handleRegistrationClick = () => {
    this.props.openAuthModal("register");
  }

  getAvatarName = () => {
    if ('fname' in localStorage && 'lname' in localStorage) {
        return(localStorage.getItem('fname')[0].toUpperCase()+localStorage.getItem('lname')[0].toUpperCase())
    }

    else {
      return ''
    }
  }

  handleAvatarClick = event => {
    this.setState({activeTag: event.currentTarget})
  }

  handleAvatarClose = () => {
    this.setState({activeTag: null})
  }

  handleLogout = () => {
    this.setState({
      activeTag: null
    })
    this.props.logoutAction()
  }

  render() {
    let loggedInUserName = this.getAvatarName()
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
           <Link to='/' style={FlavorHubAnchorStyles} onClick={()=>this.props.contentChange('/')}>
             <Typography className="navBarLogo" variant="title" style={FlavorHubStyles}>
                 <span className="navBarFlavorLogo">Flavor</span>
                 <span className="navBarHubLogo">Hub</span>
             </Typography>
           </Link>

            {(this.props.displaySearchBar) &&
              <SearchBar displayFilter={false} flex={1}/>
            }

            {(!this.props.loggedInState) &&
              <Button className="navBarLogin" size="small" variant="raised" onClick={this.handleSignInClick}>Sign in</Button>
            }

            {(!this.props.loggedInState) &&
              <Button className="navBarRegister" size="small" variant="raised" onClick={this.handleRegistrationClick}>Register</Button>
            }

            {(this.props.loggedInState) &&
              <Button
                aria-owns={this.state.activeTag ? 'account-menu' : null}
                aria-haspopup="true"
                onClick={this.handleAvatarClick}
              >
               <Avatar className='navBarAvatar'>{loggedInUserName}</Avatar>
             </Button>
            }

            {(this.props.loggedInState) &&
                <Menu
                  id="account-menu"
                  anchorEl={this.state.activeTag}
                  open={Boolean(this.state.activeTag)}
                  onClose={this.handleAvatarClose}
                >
                <MenuItem onClick={this.handleAvatarClose}>My account</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
              }

         </Toolbar>
       </AppBar>
   )
  }
}

export default NavBar;
