import { Table, TableCell, TableHead, Typography, TableRow, TableBody, Button } from "@mui/material";
import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProjectAsync, selectProjects } from "./allProjectSlice";
import theme from "../../app/theme";
import SearchProject from '../search/searchProject';

const AllProjects = () => {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);

    const [projectName, setProjectName] = useState(null)
    const [ans, setAns] = useState(projects)

    useEffect(() => {
        dispatch(fetchAllProjectAsync());
        setAns(projects)
    }, [dispatch])
    useEffect(() => {
        setAns(projects)
    }, [projects]);
    useEffect(() => {
        if(projectName && projectName!==null && projectName!=="")

        {
        //checking for matches and coverting to lowercase
        let updateProject = projects.filter((res) => res.project_name.toLowerCase().includes(projectName.toLowerCase())===true ||

                                                (res.technologies).toLowerCase().includes(projectName.toLowerCase())===true)
        setAns(updateProject)
        }
        else {
            setAns(projects)
        }
    }, [projectName])


    return (
        <div>


            <Typography component='h2' variant="h6" align="center" fontWeight='bold' gutterBottom>All Projects</Typography>
            <SearchProject projectName={projectName} setProjectName ={setProjectName} theme={theme} color="primary"/>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>More Details</TableCell>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Technologies</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date Created</TableCell>
                    </TableRow>

            </TableHead>
            <TableBody>
            {/* this will return a list of projects and technologies that match */}
            {/** admin needs an all projects button */}
                {ans && ans.length ? ans.map((project)=>(

                    <TableRow key={project.id}>
                        <TableCell><Link to={`/project/${project.id}`}><Button variant="contained" theme={theme} color="primary">View</Button></Link></TableCell>
                        <TableCell>{project.project_name}</TableCell>
                        <TableCell>{project.technologies}</TableCell>
                        <TableCell>{project.status}</TableCell>
                        <TableCell>{project.createdAt}</TableCell>
                        {/* <TableCell>
                            <Switch color="warning" onChange={handleChange}>Ban</Switch>
                        </TableCell> */}
                    </TableRow>
                 ))
                :null}
                </TableBody>
            </Table>
        </div>
    )
}

export default AllProjects;
