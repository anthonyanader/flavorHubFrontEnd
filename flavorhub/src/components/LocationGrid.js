import React, { Component} from 'react';
import Card, {CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import './styles/LocationCard.css'

class LocationGrid extends Component {

    render() {
      return(
        <Grid container className="locationGridContainer" justify="center" style={{flexGrow: 1}} spacing={40}>
          {this.props.locations.map(location =>(
            <Grid key={location.address} item>
              <LocationCard location={location}/>
            </Grid>
          ))}
        </Grid>
      )
    }
}

class LocationCard extends Component{

  render(){
    let locationCardInfoTagStyle = {
      fontSize: '17px'
    }

    let addressStyle = {
      paddingBottom: '15px'
    }
    return(
      <div>
        <Card style={{width:"350px"}}>
          <CardMedia style={{height: 200}}
            image="http://www.uwgb.edu/UWGBCMS/media/Maps/images/map-icon.jpg"
            title="RestaurantName"
          />
          <CardContent>
            <Typography style={addressStyle} variant="headline" component="h2">
              {this.props.location.address}
            </Typography>
            <Typography component="p">
              <span style={locationCardInfoTagStyle}>Manager: </span>
              {this.props.location.managerName}
            </Typography>
            <Typography component="p">
              <span style={locationCardInfoTagStyle}>Phone number: </span>
              {this.props.location.phoneNumber}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default LocationGrid;
