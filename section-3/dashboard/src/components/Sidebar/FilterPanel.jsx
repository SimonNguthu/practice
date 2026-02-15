function FilterPanel ({filters, updateFilters, sorting, updateSorting, deptData, locations}) {
  return (
    <aside>
      <h3>Filters</h3>
      <div className="filters">
        <label className="filterTitle">Locations</label>
        <div id="locationFilter">
          {locations.map(loc => (
             <label key = {loc}>
                <input 
                  key = {loc} 
                  type = "checkbox" 
                  value = {loc}
                  onChange={e => {
                    const ischecked = e.target.checked

                    let newLocations
                    if(ischecked) newLocations = [...filters.location, e.target.value]
                    else {
                      newLocations = filters.location.filter(loc => loc !== e.target.value) 
                    }
                    updateFilters({location: newLocations})
                  }}
                >
                </input>{loc}
             </label>
          ))}
        </div>
      </div>
      <div className="filters">
        <label className="filterTitle">Sort</label>
        <select 
          id="sortBy"
          value = {sorting}
          onChange={e => updateSorting(e.target.value)}
        >
          <option value="None">None</option>
          <option value="AZ">A - Z</option>
          <option value="ZA">Z - A</option>
        </select>
      </div>
      <div className="filters">
        <label className="filterTitle">Status</label>
        <select 
          id="statusFilter"
          value = {filters.status}
          onChange={e => updateFilters({status:e.target.value})}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>
      <div className="filters">
        <label className="filterTitle">Department</label>
        <select 
          id="departmentFilter"
          value = {filters.department}
          onChange={e => updateFilters({department:e.target.value})}
        >
          <option value="All">All</option>
          {deptData.map(dept => {
            return <option key = {dept} value={dept}>{dept}</option>
          })}
        </select>
      </div>
      <div className="filters">
        <label className="filterTitle">Date Range (2010-2025)</label>
        <input type="date" id="dateFrom"/> ↓ <input type="date" id="dateTo"/>
      </div>
      <button id="clearFiltersBtn">Clear Filters</button>
    </aside>
  )
}

export default FilterPanel