function FilterPanel () {
  return (
    <aside>
      <h3>Filters</h3>
      <div className="filters">
        <label className="filterTitle">Locations</label>
        <div id="locationFilter"></div>
      </div>
      <div className="filters">
        <label className="filterTitle">Sort</label>
        <select id="sortBy">
          <option value="None">None</option>
          <option value="AZ">A - Z</option>
          <option value="ZA">Z - A</option>
        </select>
      </div>
      <div className="filters">
        <label className="filterTitle">Status</label>
        <select id="statusFilter">
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>
      <div className="filters">
        <label className="filterTitle">Department</label>
        <select id="departmentFilter">
          <option value="All">All</option>
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