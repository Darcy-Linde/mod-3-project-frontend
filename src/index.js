const usersURL = 'http://localhost:3000/users'
// const userURL = `http://localhost:3000/user/${id}`
const user = 'Sam'
document.addEventListener('DOMContentLoaded', () => {
  renderUser()
});

function clearDOM(){
  let body = document.querySelector('body')
  body.innerHTML = ""
}

// For "signed in" user:
//  clicking a button will render relevant info about stock
//  user will have option to make purchase of shares

// Interfacing
// Need Sign In Page - find or create user
// user name stored in global variable
//
// User HomePage:
// Find good stylesheet from semantic?
// Add navbar to permanent location in DOM
//    Items on Navbar:
//    'User History' - Purchase/Sale history in table with 20 cells.
//        purchase shows stock name, quantity, stock price, and total purchase cost
//        sale shows stock name, quantity, stock price, net gain on purchase/sale?
//    'User Portfolio' - Table of stocks user has invested in
//        show total portfolio value
//        table values: stock name/symbol(clickable), quantity owned, current stock value/total value
//        show graph of portfolio history? (How are we keeping track of history?)
//    'Search Bar' - Search for stock. Renders table of results with name,symbol,...
//    'Logout' - erases current user and rerenders app homescreen(loginscreen)
//    'edit funds'? (maybe edit user info?)


function renderUser(user){
  let div = document.createElement('div')
  div.className = "user-card"

  let form = document.createElement('form')
  form.innerText = "Search for company by name or symbol"
  let input = document.createElement('input')
  input.type = "text"
  input.name = "search"
  input.placeholder = "Search"

  let submit = document.createElement('input')
  submit.type = "submit"
  submit.addEventListener('click', handleSubmit)

  form.appendChild(input)
  form.appendChild(submit)
  div.appendChild(form)
  document.querySelector('body').appendChild(div)
}

function handleSubmit(e){
  e.preventDefault()
  let target = e.target.previousSibling.value
  console.log(target)
  const submitURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${target}&apikey=T8E6RZ7YEO1NDYZU`
  fetch(submitURL)
  .then((res) => res.json())
  .then((data) =>renderCompanies(data))
  e.target.parentElement.reset()
}


function renderCompanies(companies){
  let div = document.createElement('div')
  div.className = "Companies"
  companies["bestMatches"].forEach(company =>{
    let button = document.createElement('button')
    let symbol = company["1. symbol"]
    let name = company["2. name"]
    button.innerText = `Name: ${name} , Symbol: ${symbol}`
    button.id = symbol
    button.addEventListener('click', stockClick)
    div.appendChild(button)
  })
  document.querySelector('body').appendChild(div)
}

function stockClick(e){
  clearDOM()
  let symbol = e.target.id
  fetchStock(symbol)
}

function fetchStock(symbol){
  const stockURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=T8E6RZ7YEO1NDYZU`
  fetch(stockURL)
  .then((res) => res.json())
  .then((data) => renderStock(data["Global Quote"]))
}

function renderStock(quote){
  let symbol = quote["01. symbol"]
  let price = quote["05. price"]
  let volume = quote["06. volume"]
  let change = quote["09. change"]
  let changePercent = quote["10. change percent"]  //these values are strings!
  console.log(symbol)
  console.log(price)
  console.log(volume)
  console.log(change)
  console.log(changePercent)
}
