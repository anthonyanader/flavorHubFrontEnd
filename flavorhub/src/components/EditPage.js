import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import List, {ListItem} from 'material-ui/List';
import axios from 'axios';
import {browserHistory} from 'react-router';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import './styles/EditPage.css';


class EditPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'openAddModal': false,
      'description': '',
      'name': '',
      'price': 0,
      'type': '',
      'category': ''
    }
  }

  deleteRestaurant = (context) => {
    axios.post('http://localhost:5000/restaurant/'+context.props.restaurantName,
    {},{'headers':{'x-access-token': localStorage.getItem('JsonToken')}}).then(
        function (response) {
          if (response.status === 200) {
            browserHistory.push('/')
            window.location.reload()
          }
        }
      ).catch(function (error){
        console.log(error)
      })
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handleTypeChange = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  handlePriceChange = (e) => {
    this.setState({
      price: e.target.value
    })
  }

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    })
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  addMenuItem = (context) => {

    axios.post('http://localhost:5000/menuitem', {
      category: this.state.type.toLowerCase(),
      type: this.state.category[0].toUpperCase() + this.state.category.slice(1).toLowerCase(),
      name: this.state.name.toLowerCase(),
      description: this.state.description.toLowerCase(),
      price: this.state.price,
      restaurantName: this.props.restaurantName
    },{'headers':{'x-access-token': localStorage.getItem('JsonToken')}}).then(function (response) {
      if (response.status === 200){
        context.setState({'openAddModal': false})
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  render() {
    return (
      <div style={{paddingTop:'20px', minHeight: '300px'}}>
        <div style={{paddingBottom:'20px'}}>
          <Typography variant="title" style={{paddingBottom:'20px'}}>
            Menu
            <Divider/>
          </Typography>
          <List>
            <ListItem button style={{display:'unset'}} onClick={() => this.setState({'openAddModal': true})}>
              Add a menu item
            </ListItem>
          </List>
        </div>


        <Modal
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         open={this.state.openAddModal}
         onClose={() => this.setState({'openAddModal': false})}
        >
         <div className="addMenuItemModal">
           <Typography className="modalNavBarLogo" variant="title">
               <span className="modalNavBarFlavorLogo">Flavor</span>
               <span className="modalNavBarHubLogo">Hub</span>
           </Typography>
           <div className="modalInputContainer">
            <form style={{display: "grid"}}>
                <input className="modalInput" type="text" name="restaurantSearch" placeholder="Name" onChange={this.handleNameChange}/>
                <input className="modalInput" type="text" name="restaurantSearch" placeholder="Category" onChange={this.handleCategoryChange}/>
                <input className="modalInput" type="text" name="restaurantSearch" placeholder="Type" onChange={this.handleTypeChange}/>
                <input className="modalInput" type="number" name="restaurantSearch" placeholder="Price" onChange={this.handlePriceChange}/>
                <textarea className="modalInput" style={{'resize': 'none'}} rows='4' placeholder="Description" onChange={this.handleDescriptionChange}/>
            </form>
           </div>
           <div className="modalButtonContainer">
              <Button className="modalAddMenuItem" onClick={() => this.addMenuItem(this)} size="small" variant="raised">Add menu item</Button>
           </div>
         </div>
       </Modal>

        <div style={{paddingBottom:'20px'}}>
          <Typography variant="title" style={{paddingBottom:'20px'}}>
            Restaurant
            <Divider/>
          </Typography>
          <List>
            <ListItem button style={{display:'unset'}} onClick={() => this.deleteRestaurant(this)}>
              Delete restaurant
            </ListItem>
          </List>
        </div>
      </div>
    )
  }
}

export default EditPage
