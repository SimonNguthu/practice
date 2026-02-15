import {useEffect, useState} from "react"

function SearchBar ( {filters, updateFilters}) {
  const [searchValue, setSearchValue] = useState(filters.search)

  useEffect(() => {
    const timer = setTimeout(() => updateFilters({search:searchValue}), 300)
    return () => clearTimeout(timer)
  }, [searchValue, updateFilters])

  return (
    <div className="filters">
        <label className="filterTitle">Search</label>
        <input 
          type="text" 
          placeholder="Name, email or department"
          value = {searchValue}
          onChange={e => setSearchValue(e.target.value)}
        /> 
    </div>
  )
}

export default SearchBar