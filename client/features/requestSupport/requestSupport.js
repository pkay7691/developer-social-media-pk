import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUserAsync, requestBugFeatureSurveyAsync } from "../single_user/singleUserSlice";

const RequestSupport = () => {
    // selects the user who is logged in currently
    const username = useSelector((state) => state.auth.me.username);
    const userId = useSelector((state) => state.auth.me.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("userId", userId);
    //convert userId to username
    console.log("username", username);
    const [error, setError] = useState(null);
    const requestTypes = ["Bugs", "Feature Request", "Survey", "Other"];
    const [requestType, setRequestType] = useState(requestTypes[0]);
    const [requestDescription, setRequestDescription] = useState("");
    useEffect(() => {
        dispatch(fetchUserAsync(userId));
    }, [dispatch, userId]);

    const handleRequestTypeChange = (event) => {
        setRequestType(event.target.value);
    };

    const handleRequestDescriptionChange = (event) => {
        setRequestDescription(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = {
            id: userId,
            username: username,
            type_of_request: requestType,
            description: requestDescription,
        };
        console.log("request", request);
        dispatch(requestBugFeatureSurveyAsync(request)).then((res) => {
            if (res.error) {
                setError(res.payload);
            } else {
                navigate(`/users/${userId}`);
            }
        });
        }

    return (
        <>
        <div>
            {/*take username and requestType and requestDescription and send to backend to create a request for that user*/}
            <h1>Request Support</h1>
            <p>{error}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Request Type:
                    <select value={requestType} onChange={handleRequestTypeChange}>
                        {requestTypes.map((requestType) => (
                            <option value={requestType}>{requestType}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Description:
                    <textarea value={requestDescription} onChange={handleRequestDescriptionChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
        </>
    )
}

export default RequestSupport;