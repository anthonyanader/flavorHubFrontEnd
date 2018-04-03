import React, { Component } from 'react';
import './styles/ReviewPanel.css';
import axios from 'axios';


class ReviewPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'reviews': []
    }
  }

  getReviews = (context) => {
    let loginToken = localStorage.getItem('JsonToken')
    axios.get('http://localhost:5000/get_restaurant_reviews?restaurantName='+this.props.restaurantName,
    {'headers':{'x-access-token': loginToken}}).then(
        function (response) {
          if (response.status === 200) {
            context.setState({
              'reviews': response.data.reviewsObject
            })
          }
        }
      ).catch(function (error){
        console.log(error)
      })
  }

  render() {
    return (

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

    )
  }
}

export default ReviewPanel
