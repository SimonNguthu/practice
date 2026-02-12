import SearchBar from "./SearchBar"
import FilterPanel from "./FilterPanel"

function SideBar ({filters, updateFilters}) {
  return (
   <div>
    <SearchBar filters = {filters} updateFilters = {updateFilters}/>
    <FilterPanel filters = {filters} updateFilters = {updateFilters}/>
   </div>
  )
}
export default SideBar