import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import './styles/AuthenticationModal.css';
import Button from 'material-ui/Button';



class AuthenticationModal extends Component {

  render() {
      return(
        <Modal
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         open={this.props.open}
         onClose={this.props.onClose}
        >
         <div className="autheticationModal">
           <Typography className="modalNavBarLogo" variant="title">
               <span className="modalNavBarFlavorLogo">Flavor</span>
               <span className="modalNavBarHubLogo">Hub</span>
           </Typography>
           <div className="modalInputContainer">
              {(this.props.type === "register") &&
                <input className="modalInput" type="text" name="restaurantSearch" placeholder="First name"/>
              }
              {(this.props.type === "register") &&
                <input className="modalInput" type="text" name="restaurantSearch" placeholder="Last name"/>
              }
              {(this.props.type === "register") &&
                <input className="modalInput" type="text" name="restaurantSearch" placeholder="Email"/>
              }
              <input className="modalInput" type="text" name="restaurantSearch" placeholder="Username"/>
              <input className="modalInput" type="text" name="restaurantSearch" placeholder="Password"/>
           </div>
           <div className="modalButtonContainer">
              <Button className="modalRegister" size="small" variant="raised">{this.props.type === "register" ? "Register" : "Sign In"}</Button>
           </div>
         </div>
       </Modal>
      )
  }
}

export default AuthenticationModal
