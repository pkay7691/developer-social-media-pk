import React from 'react'
//creating a search bar so that it can be used again 
const SearchProject = ({projectName, setProjectName}) => {
  return (
    <input
        type="text"
        className="mx-1 py-2 outline-none w-auto col-span-4 text-base"
        value={projectName || ""}
        onChange={(e)=>setProjectName(e.target.value)}
        name="search"
        id="search"
        placeholder="Search For Projects"
    />
  )
}
export default SearchProject