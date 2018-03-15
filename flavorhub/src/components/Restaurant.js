import React, { Component } from 'react';
import './Restaurant.css';
import NavBar from '../layouts/NavBar';


let restaurantImgUrl = 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-Wallpaper-Pictures.jpg';

class Restaurant extends Component {
    render(){
        return(
            <div>
                <NavBar/>
                <div className="resto-splash-img" style={{display:'block', backgroundImage:'url('+restaurantImgUrl+')', minHeight: 400, width: '100%'}}></div>
            </div>
        );
    }
}

export default Restaurant;
