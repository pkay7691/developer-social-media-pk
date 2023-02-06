import React from 'react'
//creating a search bar so that it can be used again 
const SearchInput = ({name, setName}) => {
  return (
    <input
        type="text"
        className="mx-1 py-2 outline-none w-auto col-span-4 text-base"
        value={name || ""}
        onChange={(e)=>setName(e.target.value)}
        name="search"
        id="search"
        placeholder="Search by Name"
    />
  )
}

export default SearchInput