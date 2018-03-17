import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import PinDrop from 'material-ui-icons/PinDrop';
import RestaurantMenu from 'material-ui-icons/RestaurantMenu';
import RateReview from 'material-ui-icons/RateReview';
import LocationGrid from '../components/LocationGrid';

class TabContainer extends Component {
  constructor(props) {
    super(props)

    TabContainer.propTypes = {
      children: PropTypes.node.isRequired
    }
  }

  render() {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {this.props.children}
      </Typography>
    )
  }
}


class MiddleNavBar extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render(){
    const { value } = this.state;

    return(
      <div className="midNavBarContainer">
        <Paper position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            centered = {true}
          >
            <Tab icon={<PinDrop/>} label="Locations" />
            <Tab icon={<RestaurantMenu/>} label="Menu" />
            <Tab icon={<RateReview/>} label="Reviews"/>
          </Tabs>
        </Paper>
        {value === 0 && <TabContainer><LocationGrid/></TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
    )
  }
}


export default MiddleNavBar;
