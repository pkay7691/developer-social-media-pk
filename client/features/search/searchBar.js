import React, { useState} from 'react';
import { useGetUserInfoQuery } from "../search/search";


const SearchBar = () => {
    const [searchBar, setSearchBar] = useState('')
    const {data: searching, error, isError, isLoading} = useGetUserInfoQuery(searchBar)

    if(isLoading) return <h1>Loading.....</h1>
    // if(isError) return <p>{error}</p>
    
  return (
    <div>
        <input
            type='text'
            onChange={(e)=>setSearchBar(e.target.value)}
            value={searchBar}
        />
        <div>
            <h1>Results</h1>
            <div>
                <ul>
                    {searching &&
                    searching.users.map((user)=>{
                        return(
                            <li>
                                {user.username}
                            </li>
                            
                        )
                    })
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SearchBar
