import React, { Component } from 'react';
import '../App.css';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import FilterList from 'material-ui-icons/FilterList';
import Menu, { MenuItem } from 'material-ui/Menu';
import Modal from 'material-ui/Modal';
import Chip from 'material-ui/Chip';
import './styles/FilterModal.css';

class FilterModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      'openCuisineModal': props.openCuisineModal,
      'cuisineName': '',
      'displayFilterButton': false,
      'cuisines': []
    }
  }

  componentWillReceiveProps = (nextProps) => {
      this.setState({
        'openCuisineModal': nextProps.openCuisineModal,
        'displayFilterButton': false,
        'cuisines': []
      })
  }

  handleFilterModalClose = () => {
    this.setState({
      'openCuisineModal': false
    })

    this.props.handleActiveFilterClose()
  }

  handleCuisineNameChange = (e) => {
    this.setState({
      'cuisineName': e.target.value
    })
  }

  handleAddCuisine = () => {
    let addCuisine = this.state.cuisineName.split(' ').join('') !== '' && this.state.cuisineName !== undefined

    if (addCuisine) {
      let cuisines = this.state.cuisines
      cuisines.push(this.state.cuisineName)

      this.setState({
        'displayFilterButton': addCuisine,
        'cuisines': cuisines,
        'cuisineName': ''
      })
    }
  }

  handleAddFilter = () => {
    this.setState({
      'openCuisineModal': false
    })
    this.props.setFilters(this.state.cuisines)
  }

  handleDeleteCuisineChip = (cuisineName) => {
    let currentCuisines = this.state.cuisines
    let cuisineToDelete  = currentCuisines.indexOf(cuisineName)
    if(currentCuisines.length > 0) {
      currentCuisines.splice(cuisineToDelete, 1)
    }

    else {
      currentCuisines = []
    }

    this.setState({
      'cuisines': currentCuisines,
      'displayFilterButton': currentCuisines.length > 0
    })
  }

  render() {

    return(
      <Modal
       aria-labelledby="simple-modal-title"
       aria-describedby="simple-modal-description"
       open={this.state.openCuisineModal}
       onClose={this.handleFilterModalClose}
      >
      <div className='filterModal'>
        <Typography className="modalNavBarLogo" variant="title">
          <span className="modalNavBarFlavorLogo">Flavor</span>
          <span className="modalNavBarHubLogo">Hub</span>
        </Typography>
        <div className="modalInputContainer">
          <input className="modalInput" type="text" name="restaurantSearch" placeholder="Cuisine name" value={this.state.cuisineName} onChange={this.handleCuisineNameChange}/>
         <div className="modalButtonContainer">
            <Button className="modalAddCuisineName" onClick={this.handleAddCuisine} size="small" variant="raised">Add cuisine</Button>
            {(this.state.displayFilterButton) &&
              <Button className="modalAddFilter" onClick={this.handleAddFilter} size="small" variant="raised">Filter results</Button>
            }
         </div>
         {this.state.cuisines.map(cuisineName => {
           return (
             <Chip
               key={cuisineName}
               label={cuisineName}
               style={{borderRadius:'0.3em', marginRight: '10px', marginBottom: '10px'}}
               onDelete={() => this.handleDeleteCuisineChip(cuisineName)}
               className='cuisinesChip'
             />
           )
         })}
        </div>
      </div>
     </Modal>
    )


  }


}

export default FilterModal
