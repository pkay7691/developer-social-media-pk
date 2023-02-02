import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  fetchUserAsync,
  selectUser,
} from "../single_user/singleUserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Button ,Grid} from "@mui/material";


function EditUser() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.me.id);
  const Navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [about_me, setAboutMe] = useState("");
  const [skill_level, setSkillLevel] = useState("");

  useEffect(() => {
    dispatch(fetchUserAsync(userId));
  }, [dispatch, userId]);

  const handleSubmit = (evt)=>{
    evt.preventDefault();
    dispatch(editUser({ id: userId, first_name, last_name, email, about_me,skill_level, img_url}));
    Navigate('/')
  }

  return (
    <form id="edit-user">
      <div className="container" onSubmit={handleSubmit}>

        <label htmlFor="img-url"></label>
        <input
        type="text"
        placeholder="Your image goes here"
        name="imageUrl"
        value={img_url}
        onChange={(e)=>setImgUrl(e.target.value)}
        />
        <label htmlFor="first-name"></label>
        <input
          type="text"
          placeholder="First Name"
          name="first"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="last-name"></label>{" "}
        <input
          type="text"
          placeholder="Last Name"
          name="last"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="user-email"></label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="skill-level"></label>
        <input
        type="text"
        placeholder="Skill Level"
        name="skill-level"
        value={skill_level}
        onChange={(e)=>setSkillLevel(e.target.value)} />

        <label htmlFor="about-me"></label>
        <input
        type="text"
        placeholder="Tell us a little about yourself....."
        value={about_me}
        onChange={(e)=>setAboutMe(e.target.value)}
        />
        <Button variant="contained" type="submit">Submit</Button>
      </div>
    </form>
  );
}

export default EditUser;



