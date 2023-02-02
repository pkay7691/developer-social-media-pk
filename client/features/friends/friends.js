// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchUserAsync, selectUser } from '../single_user/singleUserSlice'

// const Friends = () => {
//     const dispatch = useDispatch();
//     const { userId } = useParams();
//     const user = useSelector(selectUser)
//     const friends = user.friends;

//     useEffect(() => {
//         dispatch(fetchUserAsync(userId))
//     }, [dispatch])

//     return (
//         <div>
//             {friends && friends.length ? friends.map((friend) =>
//                 <div>{friend.first_name} {friend.last_name}</div>
//             )
//                 :
//                 null}
//         </div>
//     )
// }

// export default Friends;