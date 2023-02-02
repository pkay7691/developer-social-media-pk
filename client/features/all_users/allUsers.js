import React, { useEffect, useState } from "react";
import { fetchAllUsers, selectUsers } from "./allUsersSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Switch } from "@mui/material";


  

const AllUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const [checked, setChecked] = useState(false)

    const handleChange = (evt) => {
        setChecked(evt.target.checked);
    }

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    //this will return a table of all users
    return (
        <div>
            <Typography component='h2' variant="h6" align="center" fontWeight='bold' gutterBottom>All Users</Typography>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Admin View</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Ban Status</TableCell>
                    </TableRow>
                </TableHead>
                {/*This will return a list of users.  We can also view a single user. */}
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Link to={`/users/${user.id}`}><Button variant="contained">View</Button></Link>
                            </TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Switch color="warning" onChange={handleChange}>Ban</Switch>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

};

export default AllUsers;