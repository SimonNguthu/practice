function SearchBar ( {filters, updateFilters}) {
  return (
    <div className="filters">
        <label className="filterTitle">Search</label>
        <input 
          type="text" 
          placeholder="Name, email or department"
          value = {filters.SearchBar}
          onChange={e => updateFilters({search: e.target.value})}
        /> 
    </div>
  )
}

export default SearchBar