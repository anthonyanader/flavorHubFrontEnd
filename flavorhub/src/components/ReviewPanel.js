import React, { Component } from 'react';
import './styles/ReviewPanel.css';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
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
      <Grid container className="" justify="center" style={{flexGrow: 1, marginTop: '10px', marginBottom: '10px', border: '1px solid grey'}} spacing={8}>
        <Grid item xs={4}>
          <Paper className=''>{this.props.username}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className=''>{this.props.priceRating}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className=''>{this.props.moodRating}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className=''>{this.props.staffRating}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className=''>{this.props.foodRating}</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className=''>{this.props.foodRating}</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className=''>{this.props.comment}</Paper>
        </Grid>
      </Grid>
    )
  }
}

export default ReviewPanel
