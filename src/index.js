const usersURL = 'http://localhost:3000/users'
// const userURL = `http://localhost:3000/user/${id}`
const user = 'Sam'
document.addEventListener('DOMContentLoaded', () => {
  renderUser()
});
let br = document.createElement('br')

// For "signed in" user:
//  searching for a keyword returns buttons with stock names
//  buttons have event listeners for clicks
//  clicking a button will render relevant info about stock
//  user will have option to make purchase of shares

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
    button.addEventListener('click', renderStock)
    div.appendChild(button)
  })
  document.querySelector('body').appendChild(div)
}
