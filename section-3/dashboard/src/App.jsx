import { useState, useEffect, useMemo, useCallback } from "react"
import Header from "./components/Header"
import SideBar from "./components/Sidebar/SideBar"
import DashBoard from "./components/Dashboard/DashBoard"
import Footer from "./components/Footer"

function App () {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    department: "All",
    location: [],
    dateFrom: "",
    dateTo: ""
  })

  //Fetching the employees
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      try{
        const res = await fetch("https://jsonplaceholder.typicode.com/users") 
        if(!res.ok) throw new Error("Failed to fetch")
        const users = await res.json()

        const mapped = users.map(user => ({
          id: user.id,
          name: user.name,
          contact: user.email,
          department: user.company.name,
          location: user.address.city,
          status: ["Active", "Inactive", "On Leave"][Math.floor(Math.random()*3)],
          joinDate: new Date(),
          salaryRange: "30000 - 50000"
        }))
        setEmployees(mapped)
      }

      catch{
        setError("Failed to fetch")
      }
      finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])


  //FILTER ENGINE
  function filterData(data, criteria) {
    return data.filter(item => {
      for (const key in criteria) {
        const rule = criteria[key]
        if (!rule(item[key], item)) return false
      }
      return true
    })
  }

  //Building filter criteria
  function filterCriteria (filters) {
    return {
    status: val => filters.status === "All" || val === filters.status,
    department: val => filters.department === "All" || val === filters.department,
    search: (val, item) => {
      const word = filters.search.toLowerCase()

      if(!word) return true

      return (
        item.name.toLowerCase().includes(word) ||
        item.contact.toLowerCase().includes(word) ||
        item.department.toLowerCase().includes(word) 
      )
    },
    location: val => {
      if(filters.location.length === 0) return true

      return filters.location.includes(val)
    },
    joinDate: val => {
      const from = filters.dateFrom ? new Date(filters.dateFrom) : null
      const to = filters.dateTo ? new Date(filters.dateTo) : null
      const itemDate = new Date(val)

      if(!from && !to) return true
      if (from && itemDate < from) return false
      if (to && itemDate > to) return false

      return true
    }
  }
  }

  //Updating the filters
  const updateFilters = useCallback((updates) => {
    setFilters(prev => ({ ...prev, ...updates }))
  }, [])

  //Generating derived employees using the filters
  const filteredEmployees = useMemo (() => {
  return filterData(employees, filterCriteria(filters))
  }, [employees, filters])

  

  return (
    <div>
      <Header/>
      <div className="layout">
        <SideBar filters = {filters} updateFilters = {updateFilters}/>
        <DashBoard 
          loading = {loading}
          error = {error}
          filteredEmployees = {filteredEmployees}
          />
      </div>
      <Footer/>
    </div>
  )
}

export default App
