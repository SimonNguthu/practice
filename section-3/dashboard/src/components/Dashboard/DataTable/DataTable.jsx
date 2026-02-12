import TableHeader from "./TableHeader"
import TableBody from "./TableBody"

function DataTable ({loading, error, filteredEmployees}) {

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <table>
        <TableHeader/>
        <TableBody filteredEmployees = {filteredEmployees}/>
      </table>
    </div>
  )
}

export default DataTable