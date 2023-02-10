import React, { useEffect, useState } from "react";
import { fetchAllUsers, selectUsers } from "./allUsersSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import SearchInput from '../search/searchInput.js'

const AllUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const [name, setName] = useState(null);
    const [ans, setAns] = useState(users);


    //gets all users, then gets the users ans(answer), third user effect check if the names match
    useEffect(() => {
        dispatch(fetchAllUsers());
        setAns(users)
    }, [dispatch]);

    useEffect(() => {
        setAns(users)
    }, [users]);
    
    useEffect(() => {
        if (name && name !== null && name !== "") {
            //checking for matches and coverting to lowercase
            let updatedUsers = users.filter((res) => res.username.toLowerCase().includes(name.toLowerCase()) === true ||
                (res.first_name + " " + res.last_name).toLowerCase().includes(name.toLowerCase()) === true)
            setAns(updatedUsers)
        }
        else {
            setAns(users)
        }
    }, [name])

    return (
        <div>
            <Typography component='h2' variant="h6" align="center" fontWeight='bold' gutterBottom>All Users</Typography>
            <SearchInput name={name} setName={setName} />
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
                {/*This will return a list of users and single out a user that matches.  We can also view a single user. */}
                <TableBody>
                    {ans ? ans.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Link to={`/users/${user.id}`}><Button variant="contained">View</Button></Link>
                            </TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.ban_status}</TableCell>
                        </TableRow>
                    )) : users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Link to={`/users/${user.id}`}><Button variant="contained">View</Button></Link>
                            </TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.ban_status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllUsers;