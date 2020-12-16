/* eslint-disable react/display-name */
import React,{useEffect, useState} from 'react'; 
import CssBaseline from '@material-ui/core/CssBaseline'
import Table from './components/Table'
import axios from 'axios'
import './App.css';

function App() {
  const [users, setUsers]= useState(null)
  useEffect(() => {
      axios.get(`https://cors-anywhere-bg.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts/?include=contactLists.list,contactTags,contactDeals,organization,geoIps,fieldValue`,
      {

        headers:{
          'Api-Token':'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0'
      }})
      .then(res => {
        const contacts = res?.data?.contacts;
        if (contacts){
          contacts.forEach(user=> {
            if (user.contactDeals[0]){
              axios.get('https://cors-anywhere-bg.herokuapp.com/https://sahmed93846.api-us1.com/api/3/deals/' + user?.contactDeals[0],
              {headers:{
                  'Api-Token':'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0'
              }}).then(deal=> {
                user.dealResponse= deal.data.deal.title
              })
            }
          })
        }
        setUsers(contacts)
      })},[]);

const columns = [
  {
    field: 'fullName',
    headerName: 'Contact',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${
        params.getValue('lastName') || ''
      }`,
  },
  { field: 'total-value', headerName: 'Total Value',  flex: 1,},
  { field: 'firstName', headerName: 'Location',  flex: 1, },
  { field: 'lastName', headerName: 'Deals', flex: .5, },
  {
    field: 'age',
    headerName: 'Tags',
    flex: 1,
  },
  {
    field: 'menu',
    type:'number',
    width: 150,
    sortable:false,
    renderHeader: () => (
      <button onClick={()=>alert("Do stuff!")}>
        ...
      </button>
    ),
  },
];

const sortModel = [
  {
    field: 'total-value',
    sort: 'asc',
  },
];


return (
  <div>
    {!users ? <div>Loading</div>: 
     <Table columns={columns} rows={users} />
    }
   
  </div>
)
}

export default App;
