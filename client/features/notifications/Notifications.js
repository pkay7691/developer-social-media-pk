import React from "react";
import { Table, TableHead, TableRow,TableBody, TableCell,Checkbox,Button, Stack } from "@mui/material";
import { useState } from "react";
import Typography from '@mui/material/Typography';
import { CheckBox } from "@mui/icons-material";


function Notifications() {
 const [show,setShow]=useState(true)

//  const handleChange = (evt)=>{
//       evt.PreventDefault();
//       setShow(!show);
//  }

//!FIXME: notification works but when you click on one checkbox all message are removed. I want to incorpuate a button that will delete checked notifications.
  return (
  <Stack
  spacing='1rem'
  width={{base: '90%', md: '500px'}}
  margin='auto'
  height='100vh'
  >
    <Typography component='h2' variant="h6" align="center" fontWeight='bold' gutterBottom>All Notifications</Typography>
    <Table size= "medium">

    <TableHead>
      <TableRow>
          {/* <TableCell>Message Status</TableCell> */}
          <TableCell>Messages</TableCell>
          <TableCell>Time</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {/* <TableCell><Button onClick={()=>setShow(!show)}  variant='contained'>read</Button> */}
      {/* </TableCell> */}
      <TableCell>{ show? <h6>Micheal wants to you to join Paper Fan club </h6>:null }</TableCell>
      <TableCell>{ show? <h6>Just now </h6>:null }</TableCell>
     </TableBody>
     <Button onClick={()=>setShow(!show)} variant='contained'>Mark Read</Button>
     </Table>
    </Stack>
    );
}

export default Notifications;
