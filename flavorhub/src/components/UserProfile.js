import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Modal from 'material-ui/Modal';
import Table, {
  TableBody,
  TableCell,
  TableRow
} from 'material-ui/Table';
import './styles/UserProfile.css';
import axios from 'axios'

class  UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'fname': ' ',
      'lname': ' ',
      'username': ' ',
      'openAdminModal': false,
      'openTableModal': false,
      'cols': [],
      'rows': []
    }
    this.getBasicInfo(this)
  }

  getBasicInfo = (context) => {
    axios.get('http://localhost:5000/user_info?username='+context.props.match.params.username, {'headers':{'x-access-token': localStorage.getItem('JsonToken')}}
    ).then(function (response) {
      if (response.status === 200){
        context.setState({
          'fname': response.data.fname,
          'lname': response.data.lname,
          'username': response.data.username,
          'rating': response.data.rating
        })
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  queryButtonClick = (context, query) => {
    axios.get('http://localhost:5000/raw_query_execute?query='+query
    ,{'headers':{'x-access-token': localStorage.getItem('JsonToken')}}
    ).then(function (response) {
      if (response.status === 200){
        context.setState({
          'cols': response.data.columnNames,
          'rows': response.data.rows,
          'openTableModal': true
        })
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {

    return (
      <Toolbar>
        <Avatar style={{width: '100px', height: '100px', fontSize: '35px', backgroundColor: 'salmon', margin: '15px'}}>{this.state.fname[0].toUpperCase()+this.state.lname[0].toUpperCase()}</Avatar>
        <div className='briefInformationContainer' style={{flex: '1'}}>
          <Typography variant="title" style={{padding: '5px 15px 5px 0'}}>
              {this.state.fname[0].toUpperCase() + this.state.fname.slice(1) + ' ' + this.state.lname[0].toUpperCase() + this.state.lname.slice(1)}
          </Typography>
          <Typography variant="title" style={{padding: '5px 15px 5px 0'}}>
              {this.state.rating +'/5'}
          </Typography>
        </div>

        {(this.props.admin && localStorage.getItem('username') == this.state.username) &&
          <Button className="userProfileToolBarButton" size="small" variant="raised" onClick={() => {this.setState({'openAdminModal': true})}}>Admin Panel</Button>
        }
        {(this.props.admin && localStorage.getItem('username') == this.state.username) &&
          <Button className="userProfileToolBarButton" size="small" variant="raised">Add Restaurant</Button>
        }

        <Modal
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         open={this.state.openAdminModal}
         onClose={() => this.setState({'openAdminModal': false})}
        >
         <div className="addMenuItemModal">
           <Typography className="modalNavBarLogo" variant="title">
               <span className="modalNavBarFlavorLogo">Flavor</span>
               <span className="modalNavBarHubLogo">Hub</span>
           </Typography>
           <div className="modalQueryButtonContainer">
              <Button className="modalAddMenuItem" onClick={() => this.queryButtonClick(this, 'f')} size="small" variant="raised">F statistics</Button>
           </div>
           <div className="modalQueryButtonContainer">
              <Button className="modalAddMenuItem" onClick={() => this.queryButtonClick(this, 'g')} size="small" variant="raised">G statistics</Button>
           </div>
           <div className="modalQueryButtonContainer">
              <Button className="modalAddMenuItem" onClick={() => this.queryButtonClick(this, 'h')} size="small" variant="raised">H statistics</Button>
           </div>
           <div className="modalQueryButtonContainer">
              <Button className="modalAddMenuItem" onClick={() => this.queryButtonClick(this, 'i')} size="small" variant="raised">I statistics</Button>
           </div>
           <div className="modalQueryButtonContainer">
              <Button className="modalAddMenuItem" onClick={() => this.queryButtonClick(this, 'j')} size="small" variant="raised">J statistics</Button>
           </div>
           <div className="modalQueryButtonContainer">
              <Button className="modalAddMenuItem" onClick={() => this.queryButtonClick(this, 'k')} size="small" variant="raised">K statistics</Button>
           </div>
           <div className="modalQueryButtonContainer">
              <Button className="modalAddMenuItem" onClick={() => this.queryButtonClick(this, 'l')} size="small" variant="raised">L statistics</Button>
           </div>
           <div className="modalQueryButtonContainer">
              <Button className="modalAddMenuItem" onClick={() => this.queryButtonClick(this, 'm')} size="small" variant="raised">M statistics</Button>
           </div>
           <div className="modalQueryButtonContainer">
              <Button className="modalAddMenuItem" onClick={() => this.queryButtonClick(this, 'n')} size="small" variant="raised">N statistics</Button>
           </div>
         </div>
       </Modal>

       <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.openTableModal}
        onClose={() => this.setState({'openTableModal': false})}
       >
        <div className="queryTableModal" style={{maxHeight: '500px', 'overflow': 'auto'}}>
          {(this.state.rows.length > 0) &&
            <Table className=''>
              <TableBody>
              <TableRow
                hover
                tabIndex={-1}
              >
                {this.state.cols.map ((col, index) => {
                  return (
                    <TableCell key={index}>{col}</TableCell>
                  )
                })}
              </TableRow>
                {this.state.rows.map((row, index)=> {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >
                      {row.map ((att, index2) => {
                        return (
                          <TableCell key={index2}>{att}</TableCell>
                        )
                      })}
                    </TableRow>
                  )})}
              </TableBody>
            </Table>}
          {(this.state.rows.length < 1) &&
            <Typography variant="title">
                No Results
            </Typography>
          }

        </div>
      </Modal>
      </Toolbar>
    )
  }
}

export default UserProfile
