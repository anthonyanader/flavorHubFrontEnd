import React, { Component} from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import './styles/LocationCard.css'

class LocationGrid extends Component {
    render() {
      return(
        <Grid container className="locationGridContainer" justify="center" style={{flexGrow: 1}} spacing={40}>
          {[0,1,2,3].map(value =>(
            <Grid key={value} item>
              <LocationCard/>
            </Grid>
          ))}
        </Grid>
      )
    }
}

class LocationCard extends Component{

  render(){

    return(
      <div>
        <Card style={{width:"350px"}}>
          <CardMedia style={{height: 200}}
            image="http://www.uwgb.edu/UWGBCMS/media/Maps/images/map-icon.jpg"
            title="RestaurantName"
          />
          <CardContent>
            <Typography variant="headline" component="h2">
                Map Location
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default LocationGrid;
