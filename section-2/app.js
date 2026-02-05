/* ===================== 
Dom (Best practice at top) 
===================== */
const tableBody = document.getElementById("tableBody")
const totalEmployees = document.getElementById("totalEmployees")
const activeEmployees = document.getElementById("activeEmployees")
const averageSalaryRange = document.getElementById("averageSalaryRange")
const departmentsCount = document.getElementById("departmentsCount")
const statusFilter = document.getElementById("statusFilter")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const pageInfo = document.getElementById("pageInfo")
const fetchTime = document.getElementById("fetchTime")

let currentPage = 1
let currentData = []

/* ===================== 
CONFIGURATION 
===================== */
const CONFIG = {
  employees: [],
  statuses: ["Active", "Inactive", "On Leave"],
  startDate: new Date("2010-01-01"),
  endDate: new Date("2025-11-30"),
  pageSize: 5
}

/* ===================== 
Helpers 
===================== */
function showLoading() {
  tableBody.innerHTML = `
    <tr> 
      <td colspan="8" id="loading">Loading...</td> 
    </tr>
  `
}

function showError (message) {
  tableBody.innerHTML = `
    <tr> 
      <td colspan="8" id="error">${message}</td> 
    </tr>
  `
}

/* ===================== 
Utilities 
===================== */
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomDate = (start, end) => new Date(Math.random() * (end.getTime() - start.getTime()) + start.getTime())

//Filter function
function filterData (data, criteria) {
  return data.filter(item => {
    for(const key in criteria){
      const rule = criteria[key]
      if(!rule(item[key],item)) return false
    }
    return true
  })
}
// {{{ Loop through each item in array: 
// Loop through each rule: 
// If any rule fails → discard item immediately 
// If all rules pass → keep item }}}

//Pagination funtion
function paginate (data, page, pageSize) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return data.slice(start, end)
}

//Updating buttonState
function updateBtnState () {
  const totalPages = getTotalPages()

  prevBtn.disabled = currentPage === 1

  nextBtn.disabled = currentPage === totalPages
}

/* ===================== 
Business Logic 
===================== */

async function fetchUsers() {
  const start = performance.now()
  showLoading()
  try{
    const res = await fetch("https://jsonplaceholder.typicode.com/users") 
    if(!res.ok) throw new Error("Failed to fetch")
    const users = await res.json()

    CONFIG.employees = users.map(user => {
      let minSalary = randomNumber(30000, 50000)
      let maxSalary = randomNumber(51000, 90000)

      return {
        id: user.id,
        name: user.name,
        contact: user.email,  
        department: user.company.name,
        location: user.address.city,
        status: CONFIG.statuses[randomNumber(0, CONFIG.statuses.length-1)],
        joinDate: randomDate(CONFIG.startDate, CONFIG.endDate),
        salaryRange: `${minSalary} - ${maxSalary}`
      }
    })
    
    currentData = CONFIG.employees
    render()

    const end = performance.now()
    const duration = (end - start).toFixed(2)
    fetchTime.innerHTML = `Api fetch time was: ${duration}`
  }

  catch(error){
    showError("Failed! Please check console")
    console.error(error)
  }
}
fetchUsers()

/* ===================== 
UI 
===================== */
function renderTable (data) {
  tableBody.innerHTML = ""

  data.forEach(emp => {
    tableBody.innerHTML += `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.contact}</td>
        <td>${emp.department}</td>
        <td>${emp.location}</td>
        <td>${emp.status}</td>
        <td>${emp.joinDate}</td>
        <td>${emp.salaryRange}</td>
      </tr>
`
  });
}

function updateCards (data) {
  totalEmployees.innerHTML = data.length

  activeEmployees.innerHTML = data.filter(emp   => emp.status === 'Active').length

  averageSalaryRange.innerHTML = Math.round(data.reduce((sum, emp) => {
    const [min, max] = emp.salaryRange.split(" - ").map(Number)
    return sum + (max+min)/2
  }, 0)/data.length)

  departmentsCount.innerHTML = new Set(data.map(emp => emp.department)).size
}

function applyFilters () {
  const criteria = {
    status: val => statusFilter.value === "All" || val === statusFilter.value
  }
  currentData = filterData(CONFIG.employees, criteria)
  currentPage = 1
  render()
}

function getTotalPages() {
  return Math.ceil(currentData.length / CONFIG.pageSize)
}

function nextPage () {
  const totalPages = getTotalPages()
  if(currentPage < totalPages) {
    currentPage++
    render()
  }
}

function prevPage () {
  if(currentPage > 1) {
    currentPage--
    render()
  }
}

function render () {
  pageInfo.innerHTML = `Page ${currentPage}`
  const pageData = paginate(currentData, currentPage, CONFIG.pageSize)
  updateBtnState()
  renderTable(pageData)
  updateCards(currentData)
}
render()

/* ===================== 
Events 
===================== */
statusFilter.addEventListener("change", () => applyFilters())
prevBtn.addEventListener("click", prevPage)
nextBtn.addEventListener("click", nextPage)