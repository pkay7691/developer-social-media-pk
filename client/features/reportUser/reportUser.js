import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, fetchUserAsync, reportUserAsync } from "../single_user/singleUserSlice";
import theme from "../../app/theme";
const ReportUser = () => {
    // selects the user who is logged in currently
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();
    console.log("userId", userId);
    //convert userId to username

    const user = useSelector(selectUser);
    console.log("user", user);
    const { username } = user;
    console.log("username", username);
    const [error, setError] = useState(null);
    const reportTypes = ["Inappropriate Content", "Spam", "Harassment", "Other"];
    const [reportType, setReportType] = useState(reportTypes[0]);
    const [reportDescription, setReportDescription] = useState("");
    useEffect(() => {
        dispatch(fetchUserAsync(userId));
    }, [dispatch, userId]);

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value);
    };

    const handleReportDescriptionChange = (event) => {
        setReportDescription(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const report = {
            id: userId,
            reportee: username,
            reason_for_report: reportType,
            message: reportDescription,
        };
        dispatch(reportUserAsync({report})).then((res) => {
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
            {/*take username and reportType and reportDescription and send to backend to create a report for that user*/}
            <h1>Report {username}</h1>
            <p>{error}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Report Type:
                    <select value={reportType} onChange={handleReportTypeChange}>
                        {reportTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Report Description:
                    <input
                        type="text"
                        value={reportDescription}
                        onChange={handleReportDescriptionChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
        </>
    );
};
export default ReportUser;