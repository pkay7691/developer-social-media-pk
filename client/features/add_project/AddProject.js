import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addProjectAsync, fetchAllProjectAsync, selectProjects } from '../all_project/allProjectSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserAsync } from '../single_user/singleUserSlice';

const AddProject = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.me);
    console.log('userId', userId)
    const projects = useSelector(selectProjects);
    const navigate = useNavigate();
    const {id} = useParams();
    const [project, setProject] = useState({
        project_name: '',
        details: '',
        project_type: '',
        technologies: '',
        github_url: '',
        member: userId
    })

    useEffect(() => {
        dispatch(fetchUserAsync(userId));
    }, [dispatch])

    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    console.log('userId', userId)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('project', project)
        dispatch(addProjectAsync(project));
        navigate(`/client/${id}`);
    }

    useEffect(() => {
        dispatch(fetchAllProjectAsync());
    }, [dispatch])

    return (
        <div>
            <h1>Add Project</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="project_name">Project's Name:</label>
                <input type="text" name="project_name" value={project.project_name} onChange={handleChange} />
                <label htmlFor="details">Details about project:</label>
                <input type="text" name="details" value={project.details} onChange={handleChange} />
                <label htmlFor="project_type">Project Type:</label>
                <input type="text" name="project_type" value={project.project_type} onChange={handleChange} />
                <label htmlFor="technologies">Technologies:</label>
                <input type="text" name="technologies" value={project.technologies} onChange={handleChange} />
                <label htmlFor="github_url">Github URL: </label>
                <input type="text" name="github_url" value={project.github_url} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddProject;