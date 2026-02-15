import { useState, useEffect, useMemo, useCallback } from "react"
import Header from "./components/Header"
import SideBar from "./components/Sidebar/SideBar"
import DashBoard from "./components/Dashboard/DashBoard"
import Footer from "./components/Footer"

 const sortCriteria = {
    AZ: (a, b) => a.name.localeCompare(b.name), 
    ZA: (a, b) => b.name.localeCompare(a.name)
  }

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
  const [sorting, setSorting] = useState("None")

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

  const deptData = employees.map(emp => emp.department)
  const locations = employees.map(emp => emp.location)


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

  //SORTING ENGINE
  function sortData (data, criteria, activeKey) {
    const rule = criteria[activeKey] 

    if(!rule) return data
    return data.slice().sort(rule)
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

  const updateSorting = useCallback(updates => {
    setSorting(updates)
  }, [])

  //Generating derived employees using the filters
  const filteredEmployees = useMemo (() => {
    const filtered = filterData(employees, filterCriteria(filters))
    if (sorting === "None") return filtered

    const sorted = sortData(filtered, sortCriteria, sorting)
    return sorted
  }, [employees, filters, sorting])

  

  return (
    <div>
      <Header/>
      <div className="layout">
        <SideBar 
          filters = {filters} 
          updateFilters = {updateFilters}
          sorting = {sorting}
          updateSorting = {updateSorting}
          deptData = {deptData}
          locations = {locations}
        />
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