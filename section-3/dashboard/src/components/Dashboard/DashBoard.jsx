import DataTable from "./DataTable/DataTable"

function DashBoard ({loading, error, filteredEmployees}) {
  return (
    <DataTable 
      loading = {loading}
      error = {error}
      filteredEmployees = {filteredEmployees}
    />
  )
}

export default DashBoard