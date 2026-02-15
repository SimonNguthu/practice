function TableBody ({filteredEmployees}) {
  return (
    <tbody>
          {filteredEmployees.map(emp => {
            return (
              <tr key ={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.contact}</td>
                <td>{emp.department}</td>
                <td>{emp.location}</td>
                <td>{emp.status}</td>
              </tr>
            )
          })}
    </tbody>
  )
}

export default TableBody