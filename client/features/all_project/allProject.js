import { Table, TableCell, TableHead, Typography, TableRow, TableBody } from "@mui/material";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjectAsync, selectProjects } from "./allProjectSlice";

const AllProjects = () => {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);

    useEffect(() => {
        dispatch(fetchAllProjectAsync());
    }, [dispatch])
    
    return (
        <div>
            <Typography component='h2' variant="h6" align="center" fontWeight='bold' gutterBottom>All Projects</Typography>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Technologies</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects && projects.length ? projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>{project.project_name}</TableCell>
                            <TableCell>{project.technologies}</TableCell>
                            <TableCell>{project.status}</TableCell>
                            <TableCell>{project.createdAt}</TableCell>
                        </TableRow>
                    ))
                    :
                    null}
                </TableBody>
            </Table>
        </div>
    )
}

export default AllProjects;