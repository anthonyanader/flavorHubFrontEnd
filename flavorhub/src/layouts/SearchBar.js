import React, { Component } from 'react';
import '../App.css';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import FilterList from 'material-ui-icons/FilterList';
import Menu, { MenuItem } from 'material-ui/Menu';
import Modal from 'material-ui/Modal';
import Chip from 'material-ui/Chip';
import Grid from 'material-ui/Grid';
import FilterModal from '../components/FilterModal';


class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state={
      'activeFilter': null,
      'openCuisineModal': false
    }
  }

  componentWillReceiveProps = (nextProps) => {
      this.setState({
        'openCuisineModal': false
      })
  }
  handleFilterClick = event => {
    this.setState({activeFilter: event.currentTarget})
  }

  handleActiveFilterClose = () => {
    this.setState({activeFilter: null, openCuisineModal: false})
  }

  handleCuisineFilter = () => {
    this.setState({activeFilter: null, openCuisineModal: true})
  }

  handleDeleteCuisineChip = (cuisineName) => {
    let currentCuisines = this.props.filters
    let cuisineToDelete  = currentCuisines.indexOf(cuisineName)
    if(currentCuisines.length > 0) {
      currentCuisines.splice(cuisineToDelete, 1)
    }

    else {
      currentCuisines = []
    }

    this.props.deleteFilters(currentCuisines)
  }

  render() {
    let styles = {
      flex: this.props.flex
    }
    return (
      <div className='searchBarAreaContainer' style={styles}>
        <div className="searchBarContainer">
          <div className="searchBarInputRegion">
            <input className="searchBarrestaurantSearch" type="text" name="restaurantSearch" placeholder="Enter Restaurant Name"/>
            <Button className="searchBarSearchButton" size="small" variant="raised">Find</Button>
          </div>
          {(this.props.displayFilter) &&
            <div className="searchBarFilterIcon">
                <Button
                  aria-owns={this.state.activeFilter ? 'filter-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleFilterClick}>
                  <FilterList/>
                </Button>
            </div>
          }
          <Menu
            id="account-menu"
            anchorEl={this.state.activeFilter}
            open={Boolean(this.state.activeFilter)}
            onClose={this.handleActiveFilterClose}
            >
            <MenuItem onClick={this.handleLocationFilter}>Filter by location number</MenuItem>
            <MenuItem onClick={this.handleCuisineFilter}>Filter by cuisine type</MenuItem>
          </Menu>
          <FilterModal setFilters={this.props.setFilters} openCuisineModal={this.state.openCuisineModal} handleActiveFilterClose={this.handleActiveFilterClose}/>
        </div>
        {(this.props.displayFilter) &&
          <Grid container className="" justify="center" style={{flexGrow: 1, marginTop: '25px'}} spacing={8}>
            {this.props.filters.map(cuisineName => {
              return (
                <Grid key={cuisineName} item>
                  <Chip
                    key={cuisineName}
                    label={cuisineName}
                    style={{borderRadius:'0.3em', marginRight: '5px', marginBottom: '10px'}}
                    onDelete={() => this.handleDeleteCuisineChip(cuisineName)}
                  />
              </Grid>
              )
            })}
          </Grid>
        }
      </div>
    )
  }
}

export default SearchBar
