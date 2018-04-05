import React, { Component } from 'react';
import './styles/ReviewPanel.css';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import axios from 'axios';


class ReviewPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'reviews': []
    }

    this.getReviews(this)
  }

  getReviews = (context) => {
    let loginToken = localStorage.getItem('JsonToken')
    axios.get('http://localhost:5000/get_restaurant_reviews?restaurantName='+this.props.restaurantName,
    {'headers':{'x-access-token': loginToken}}).then(
        function (response) {
          if (response.status === 200) {
            console.log(response, 'here')
            context.setState({
              'reviews': response.data
            })
          }
        }
      ).catch(function (error){
        console.log(error)
      })
  }

  render() {
    return (
      <Grid container className="" justify="center" style={{flexGrow: 1, marginTop: '25px'}} spacing={24}>
        {this.state.reviews.map(review => {
          return (
            <ReviewCard
              key = {review.username}
              username = {review.username}
              fname = {review.fname}
              lname = {review.lname}
              priceRating = {review.priceRating}
              moodRating = {review.moodRating}
              staffRating = {review.staffRating}
              foodRating = {review.foodRating}
              comment = {review.comment}
              date = {review.date}
            />
          )
        })}
      </Grid>
    )
  }
}

class ReviewCard extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div style={{width:'70%'}}>
        <Paper style={{width:'100%', marginBottom: '25px', marginTop: '25px'}}>
          <Grid container className="" justify="center" style={{flexGrow: 1, marginTop: '10px', marginBottom: '10px'}} spacing={8}>
            <Grid item style={{paddingLeft: '10px'}} xs={4}>
              <Paper className='ratingCardPaper' style={{padding: 10, textAlign: 'center'}}>
                <Typography component="div" style={{padding: 12, textAlign: 'center'}}>
                  <Link to={'/user/'+this.props.username} style={{textDecoration: 'none'}} onClick={()=>this.props.contentChange('/user')}>
                    <Avatar className='reviewAvatar'>{this.props.fname[0].toUpperCase() + this.props.lname[0].toUpperCase()}</Avatar>
                  </Link>
                </Typography>
                <Typography variant="subheading" style={{textAlign: 'center'}}>
                  {this.props.fname[0].toUpperCase() + this.props.fname.slice(1) + ' ' + this.props.lname[0].toUpperCase() + this.props.lname.slice(1)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <RatingCard title='Price' rating={this.props.priceRating + '/5'}/>
            </Grid>
            <Grid item xs={2}>
              <RatingCard title='Food' rating={this.props.foodRating + '/5'}/>
            </Grid>
            <Grid item xs={2}>
              <RatingCard title='Mood' rating={this.props.moodRating + '/5'}/>
            </Grid>
            <Grid style={{paddingRight: '10px'}} item xs={2}>
              <RatingCard title='Staff' rating={this.props.staffRating + '/5'}/>
            </Grid>
            <Grid item xs={4} style={{paddingLeft: '10px'}} xs={4}>
              <RatingCard title='Average' rating={(this.props.staffRating+this.props.moodRating+this.props.foodRating+this.props.priceRating)/4 + '/5'}/>
            </Grid>
            <Grid style={{paddingRight: '10px'}} item xs={8}>
              <RatingCard title='Comment' rating={this.props.comment}/>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

class RatingCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Paper className='ratingCardPaper'>
        <Typography variant="title" style={{padding: 15, textAlign: 'center'}}>
          {this.props.title}
        </Typography>
        <Divider/>
        <Typography variant="subheading" style={{padding: 15, textAlign: 'center'}}>
          {this.props.rating}
        </Typography>
      </Paper>
    )
  }
}

export default ReviewPanel
