import React, { useEffect } from "react";
import { fetchReportsAsync, selectReports } from "./reportInboxSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import theme from "../../app/theme";

  

const AllReportInbox = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectReports);

    useEffect(() => {
        dispatch(fetchReportsAsync());
    }, [dispatch]);

    //this will return a table of all users
    return (
        <div>
            <Typography component='h2' variant="h6" align="center" fontWeight='bold' gutterBottom>All Reports</Typography>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>View Report</TableCell>
                        <TableCell>Reported Username</TableCell>
                        <TableCell>Report Type</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                {/*This will return a list of users.  We can also view a single user. */}
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Link to={`/report/${user.id}`}>
                                    <Button variant="contained" theme={theme} color="primary">View Report</Button>
                                </Link>
                            </TableCell>
                            <TableCell>{user.reportee}</TableCell>
                            <TableCell>{user.reason_for_report}</TableCell>
                            <TableCell>
                              {user.report_status}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

};

export default AllReportInbox;