import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import axios from 'axios';

const titleBar = [
  { id: 'name', numeric: false, label: 'Menu item' },
  { id: 'category', numeric: false, label: 'Category' },
  { id: 'type', numeric: false, label: 'Type' },
  { id: 'price', numeric: true, label: 'Price ($)' },
]

const titleNumericTypes = {
  'name': false,
  'category': false,
  'type': false,
  'price': true
}

class MenuTableToolBar extends Component{

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  deleteSelected = (context, selected) => {

    let loginToken = localStorage.getItem('JsonToken')
    axios.post('http://localhost:5000/menuitem/delete',
      {
        'itemsToBeDeleted': selected,
        'restaurantName': context.props.restaurantName
      }, {'headers':{'x-access-token': loginToken}}).then(
        function (response) {
          if (response.status === 200) {
            context.props.reloadData()
          }
        }
      ).catch(function (error){
        console.log(error)
      })
    }

  render() {

    return (
      <Toolbar
        className=''
      >
        <div className=''>
          {(this.props.menuItemsSelected > 0) &&
            <Typography color="inherit" variant="subheading">
              {this.props.menuItemsSelected} selected
            </Typography>
          }
        </div>
        <div className=''/>
        <div className=''>
          {(this.props.menuItemsSelected > 0) &&
            <Tooltip title="Delete">
              <IconButton aria-label="Delete" onClick={() => this.deleteSelected(this, this.props.selectedItems)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
        </div>
      </Toolbar>
    )
  }
}


class MenuTableHead extends Component {

  constructor(props){
    super(props)

    this.state = {

    }
  }

  render() {
    const {order, orderBy} = this.props;

    return (
      <TableHead>
        <TableRow>
          {(this.props.admin) &&
            <TableCell padding="checkbox">
            </TableCell>
          }
          {titleBar.map(col => {
            return (
              <TableCell
                key={col.id}
                numeric={col.numeric}
                padding={'default'}
                sortDirection={orderBy === col.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={col.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={order}
                    onClick={() => this.props.onColumnSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }

}


class MenuTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'order': 'desc',
      'orderBy': 'price',
      'selected': [],
      'menu': [],
      'page': 0,
      'rowsPerPage': 5
    }
    this.getMenuItems(this)
  }

  getMenuItems = (context) => {
    axios.get('http://localhost:5000/restaurant_menu?restaurantName='+this.props.restaurantName).then(
      function (response) {
        if (response.status === 200) {
           let orderBy = context.state.orderBy
           let data = response.data
           data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
           context.setState({
             'menu': data,
             'selected': []
           })
        }
      }
    ).catch(function (error){
      console.log(error)
    })
  }

  handleReload = () => {
    this.getMenuItems(this)
  }

  handleSort = (property) => {
   const orderBy = property
   let order = 'desc'
   let menu = this.state.menu

   if (this.state.orderBy === property && this.state.order === 'desc') {
     order = 'asc'
   }

   if (titleNumericTypes[orderBy]) {
     menu =
       order === 'desc'
         ? this.state.menu.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
         : this.state.menu.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))
   }

   else {
     menu =
       order === 'desc'
         ? this.state.menu.sort((a, b) => (a[orderBy.toLowerCase()].localeCompare(b[orderBy.toLowerCase()])))
         : this.state.menu.sort((a, b) => (b[orderBy.toLowerCase()].localeCompare(a[orderBy.toLowerCase()])))
   }


   this.setState({
     menu,
     order,
     orderBy
  })
 }

   handleClick = (id) => {
     const selected= this.state.selected
     const selectedIndex = selected.indexOf(id)
     let newSelected = []

     if (selectedIndex === -1) {
       newSelected = newSelected.concat(selected, id);
     } else if (selectedIndex === 0) {
       newSelected = newSelected.concat(selected.slice(1));
     } else if (selectedIndex === selected.length - 1) {
       newSelected = newSelected.concat(selected.slice(0, -1));
     } else if (selectedIndex > 0) {
       newSelected = newSelected.concat(
         selected.slice(0, selectedIndex),
         selected.slice(selectedIndex + 1),
       )
     }

     this.setState({'selected': newSelected})
   }

   handleChangePage = (event, page) => {
     this.setState({
       page
     })
   }

   handleChangeRowsPerPage = (event) => {
     this.setState({
       rowsPerPage: event.target.value
     })
  }

   isSelected = (id) => this.state.selected.indexOf(id) !== -1

   render() {
     const { menu, order, orderBy, selected, rowsPerPage, page } = this.state
     const emptyRows = rowsPerPage - Math.min(rowsPerPage, menu.length - page * rowsPerPage)

     return (
       <Paper className=''>
         {(this.props.admin) &&
           <MenuTableToolBar reloadData={this.handleReload} restaurantName={this.props.restaurantName} selectedItems={selected} menuItemsSelected={selected.length} />
         }
         <div className=''>
           <Table className=''>
             <MenuTableHead
               order={order}
               orderBy={orderBy}
               onColumnSort={this.handleSort}
               admin={this.props.admin}
             />
             <TableBody>
               {menu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                 const isSelected = this.isSelected(item.name);
                 return (
                   <TableRow
                     hover
                     onClick={() => this.handleClick(item.name)}
                     role={this.props.admin ? "checkbox" : ""}
                     aria-checked={isSelected}
                     tabIndex={-1}
                     key={item.name}
                     selected={isSelected}
                   >
                      {(this.props.admin) &&
                         <TableCell padding="checkbox">
                           <Checkbox checked={isSelected}/>
                         </TableCell>
                      }
                     <TableCell padding={this.props.admin ? "none" : "default"}>{item.name}</TableCell>
                     <TableCell>{item.category}</TableCell>
                     <TableCell>{item.type}</TableCell>
                     <TableCell numeric>{item.price}</TableCell>
                   </TableRow>
                 )
               })}
               {emptyRows > 0 && (
                 <TableRow style={{ height: 49 * emptyRows }}>
                   <TableCell colSpan={6} />
                 </TableRow>
               )}
             </TableBody>
             <TableFooter>
               <TableRow>
                 <TablePagination
                   colSpan={6}
                   count={menu.length}
                   rowsPerPage={rowsPerPage}
                   page={page}
                   backIconButtonProps={{
                     'aria-label': 'Previous Page',
                   }}
                   nextIconButtonProps={{
                     'aria-label': 'Next Page',
                   }}
                   onChangePage={this.handleChangePage}
                   onChangeRowsPerPage={this.handleChangeRowsPerPage}
                 />
               </TableRow>
             </TableFooter>
           </Table>
         </div>
       </Paper>
     )
   }
  }
export default MenuTable
