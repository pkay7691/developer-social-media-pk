import React, { useEffect } from "react";
import { Box, Paper, Grid, styled, Stack, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync, selectUser } from "../single_user/singleUserSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProjectAsync, selectProject } from "./projectSlice";
import {format} from 'date-fns'
import Favorites from "../favorites/Favorites";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.h4,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Project = ({collectedFavs}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {projectId} = useParams();
    const project = useSelector(selectProject);
    const user = useSelector((state) => state.auth.me.id);

    useEffect(() => {
        dispatch(fetchProjectAsync(projectId))
    }, [dispatch])

    const goBack = () => {
        navigate(-1)
    }
    return (
        <Box sx={{ flexGrow: 1, p: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item>
                        {project.project_name}
                    </Item>
                    <Item>
                        <Typography textAlign='left'>Project Details: {project.details}</Typography>
                        <Typography textAlign='left'>Technology Languages: {project.technologies}</Typography>
                        {/* <Typography textAlign='left'>Team Members: {project.member}</Typography> */}
                        <Typography textAlign='left'>Status: {project.status}</Typography>
                        <Typography textAlign='left'>Projected Time Frame: </Typography>
                        <Typography textAlign='left'>Difficulty:</Typography>
                        <Typography textAlign='left'>Gihub Url: {project.github_url}</Typography>
                        <Typography textAlign='left'>Date Created: {project.createdAt}</Typography> {/* bug with dates will fix later */}
                        <Typography textAlign='left'>Last Edited: {project.updatedAt}</Typography> {/* bug with dates will fix later */}
                        <Favorites project={project}/>
                    </Item>
                </Grid>
            </Grid>
            <Button onClick={goBack}> Go Back </Button>
        </Box>
    )
}

export default Project;
