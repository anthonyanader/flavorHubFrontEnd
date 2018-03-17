import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import './styles/AuthenticationModal.css';
import Button from 'material-ui/Button';
import axios from 'axios'


class AuthenticationModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      username: "",
      fname: "",
      lname: "",
      open: props.open
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
    this.setState({
      email: "",
      password: "",
      username: "",
      fname: "",
      lname: "",
      open: nextProps['open']
    });
}

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleFnameChange = (e) => {
    this.setState({
      fname: e.target.value
    })
  }

  handleLnameChange = (e) => {
    this.setState({
      lname: e.target.value
    })
  }

  handleRegister = () => {

    let context = this

    axios.post('http://localhost:5000/register', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname
    }).then(function (response) {
      if (response.status == "200"){
        context.props.onClose()
        context.setState({
          email: "",
          password: "",
          username: "",
          fname: "",
          lname: "",
          open: false
        });
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  handleSignin = () => {
    let context = this

    axios.post('http://localhost:5000/login', {
      username: this.state.username,
      password: this.state.password
    }).then(function (response) {
      console.log(response)
      if (response.status == "200"){
        context.props.onClose()
        context.setState({
          email: "",
          password: "",
          username: "",
          fname: "",
          lname: "",
          open: false
        });
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
      return(
        <Modal
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         open={this.state.open}
         onClose={this.props.onClose}
        >
         <div className="autheticationModal">
           <Typography className="modalNavBarLogo" variant="title">
               <span className="modalNavBarFlavorLogo">Flavor</span>
               <span className="modalNavBarHubLogo">Hub</span>
           </Typography>
           <div className="modalInputContainer">
            <form style={{display: "grid"}}>
                {(this.props.type === "register") &&
                  <input className="modalInput" type="text" name="restaurantSearch" placeholder="First name" onChange={this.handleFnameChange}/>
                }
                {(this.props.type === "register") &&
                  <input className="modalInput" type="text" name="restaurantSearch" placeholder="Last name" onChange={this.handleLnameChange}/>
                }
                {(this.props.type === "register") &&
                  <input className="modalInput" type="text" name="restaurantSearch" placeholder="Email" onChange={this.handleEmailChange}/>
                }
                <input className="modalInput" type="text" name="restaurantSearch" placeholder="Username" onChange={this.handleUsernameChange}/>
                <input className="modalInput" type="text" name="restaurantSearch" placeholder="Password" onChange={this.handlePasswordChange}/>
            </form>
           </div>
           <div className="modalButtonContainer">
              <Button className="modalRegister" onClick={this.props.type === "register" ? this.handleRegister.bind(this) : this.handleSignin.bind(this)} size="small" variant="raised">{this.props.type === "register" ? "Register" : "Sign In"}</Button>
           </div>
         </div>
       </Modal>
      )
  }
}

export default AuthenticationModal
