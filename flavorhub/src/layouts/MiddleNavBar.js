import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import PinDrop from 'material-ui-icons/PinDrop';
import Edit from 'material-ui-icons/Edit';
import RestaurantMenu from 'material-ui-icons/RestaurantMenu';
import RateReview from 'material-ui-icons/RateReview';
import LocationGrid from '../components/LocationGrid';
import MenuTable from '../components/MenuTable';
import EditPage from '../components/EditPage';

class TabContainer extends Component {
  constructor(props) {
    super(props)

    TabContainer.propTypes = {
      children: PropTypes.node.isRequired
    }
  }

  render() {
    return (
      <Typography component="div" style={{ padding: 25 }}>
        {this.props.children}
      </Typography>
    )
  }
}


class MiddleNavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps['admin'] && this.state['value'] === 3) {
      this.setState({
        value: 0
      })
    }
  }

  handleChange = (event, value) => {
    this.setState({ value })
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
            <Tab icon={<PinDrop/>} label="Locations"/>
            <Tab icon={<RestaurantMenu/>} label="Menu"/>
            <Tab icon={<RateReview/>} label="Reviews"/>
            {(this.props.admin) &&
              <Tab icon={<Edit/>} label="Edit"/>
            }
          </Tabs>
        </Paper>
        {value === 0 && <TabContainer><LocationGrid locations={this.props.locations}/></TabContainer>}
        {value === 1 && <TabContainer><MenuTable admin={this.props.admin} restaurantName={this.props.restaurantName}/></TabContainer>}
        {value === 2 && <TabContainer><div/></TabContainer>}
        {(value === 3 && this.props.admin) && <TabContainer><EditPage restaurantName={this.props.restaurantName}/></TabContainer>}
      </div>
    )
  }
}


export default MiddleNavBar;
