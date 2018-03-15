import React, { Component } from 'react';
import '../App.css';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class SearchBar extends Component {
  render() {
    let styles = {
      flex: this.props.flex
    }
    return (
      <div className="searchBarContainer" style={styles}>
        <div className="searchBarUpperTextContainer">
          <Typography className="searchBarUpperText" variant="title" style={{flex: 1}}>
          </Typography>
        </div>
        <div className="searchBarInputRegion">
          <input className="searchBarrestaurantSearch" type="text" name="restaurantSearch" placeholder="Enter Restaurant Name"/>
          <Button className="searchBarSearchButton" size="small" variant="raised">Find</Button>
        </div>
      </div>
    )
  }
}

export default SearchBar
