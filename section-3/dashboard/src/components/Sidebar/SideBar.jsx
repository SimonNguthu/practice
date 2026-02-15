import SearchBar from "./SearchBar"
import FilterPanel from "./FilterPanel"

function SideBar ({filters, updateFilters, sorting, updateSorting, deptData, locations}) {
  return (
   <div>
    <SearchBar filters = {filters} updateFilters = {updateFilters}/>
    <FilterPanel 
      filters = {filters} 
      updateFilters = {updateFilters}
      sorting={sorting}
      updateSorting = {updateSorting}
      deptData = {deptData}
      locations = {locations}
    />
   </div>
  )
}
export default SideBar