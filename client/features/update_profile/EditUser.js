import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  fetchUserAsync,
  selectUser,
} from "../single_user/singleUserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Button ,Grid} from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";


const EditUser =()=> {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const Navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [about_me, setAboutMe] = useState("");
  const [skill_level, setSkillLevel] = useState("");


  useEffect(() => {
    dispatch(fetchUserAsync(userId));
  }, [dispatch]);

  const handleSubmit = (evt)=>{
    evt.preventDefault();
    const editedUser =  {
      id: userId,
       first_name: first_name ,
        last_name: last_name, email: email,
         about_me: about_me,
          skill_level: skill_level
        }
    console.log(editedUser, 'editedUser')
    dispatch(editUser(editedUser));
  }


  return (
    <form id="edit-user">

      <div className="container" >

        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          placeholder="First Name"
          name="first"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="last-name">Last Name</label>{" "}
        <input
          type="text"
          placeholder="Last Name"
          name="last"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
       <label htmlFor="skill-level">Skill level</label>
        <input
        type="text"
        placeholder="Skill Level"
        name="skill-level"
        value={skill_level}
        onChange={(e)=>setSkillLevel(e.target.value)} />

        <label htmlFor="about-me">About Me</label>
        <textarea
        type="text"
        placeholder="Tell us a little about yourself....."
        value={about_me}
        onChange={(e)=>setAboutMe(e.target.value)}
        />
        <Button onClick={handleSubmit} variant="contained" type="submit">Submit</Button>
      </div>
    </form>
  );
}

export default EditUser;



