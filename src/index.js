const usersURL = 'http://localhost:3000/users'
const sharesURL = 'http://localhost:3000/shares'
const transactionsURL = 'http://localhost:3000/transactions'
let user = 'test_1'
let userID = 1
let userURL = `http://localhost:3000/users/${userID}`
let currentMoney = getMoney()


function getMoney(){
  let request = new XMLHttpRequest();
    request.open('GET', userURL, false);  // `false` makes the request synchronous
    request.send();

    if (request.status === 200) {
      return JSON.parse(request.responseText).money;
    }
  // return fetch(userURL)
  // .then((res) => res.json())
  // .then((data) => data)
}

document.addEventListener('DOMContentLoaded', () => {
  renderUser()
});

function clearDOM(){
  let body = document.querySelector('body')
  body.innerHTML = ""
}

function renderNavbar(){
  let menu = document.createElement('div')
  menu.className = 'ui secondary menu'

  // Transaction History
  let history = document.createElement('a')
  history.className = 'ui item'
  history.innerText = 'Transaction History'
  history.addEventListener('click', fetchTransactions)

  // Transaction History
  let portfolio = document.createElement('a')
  portfolio.className = 'ui item'
  portfolio.innerText = 'My Portfolio'
  portfolio.addEventListener('click', fetchPortfolio)

  // searchbar (remove form and reinstate search icon)
  let menuSearch = document.createElement('div')
  menuSearch.className = 'ui right aligned category search item'
  let form = document.createElement('form')
  let input = document.createElement('input')
  input.type = "text"
  input.name = 'input'
  input.placeholder = 'Search Companies...'
  let i = document.createElement('button')
  i.className = 'ui button'
  i.innerText = 'Submit'
  i.type = 'submit'
  form.addEventListener('submit', handleSubmit)

  // logout (needs event listener)
  let logout = document.createElement('a')
  logout.className = 'ui item'
  logout.innerText = 'Logout'

  //appending all items to DOM
  document.querySelector('body').appendChild(menu)
  menu.appendChild(history)
  menu.appendChild(portfolio)
  menu.appendChild(menuSearch)
  menu.appendChild(logout)
  menuSearch.appendChild(form)
  form.appendChild(input)
  form.appendChild(i)
}

// For "signed in" user:
//  clicking a button will render relevant info about stock
//  user will have option to make purchase of shares

// Interfacing
// Need Sign In Page - find or create user
// user name stored in global variable
//
// User HomePage:
//    Items on Navbar:

//

//


function renderUser(user){
  renderNavbar()
  // let div = document.createElement('div')
  // div.className = 'page-body'
  // document.querySelector('body').appendChild(div)
}

function handleSubmit(e){
  e.preventDefault()
  let target = e.target.input.value
  const submitURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${target}&apikey=T8E6RZ7YEO1NDYZU`
  fetch(submitURL)
  .then((res) => res.json())
  .then((data) =>renderCompanies(data["bestMatches"]))
  e.target.reset()
}


function renderCompanies(companies){
  clearDOM()
  renderNavbar()
  let div = document.createElement('div')
  div.className = 'ui grid container'
  let table = document.createElement('table')
  table.className = "ui celled striped table"
  let thead = document.createElement('thead')
  let tr = document.createElement('tr')
  let th1 = document.createElement('th')
  th1.innerText = 'Company'
  let th2 = document.createElement('th')
  th2.innerText = 'Daily Info'
  let tbody = document.createElement('tbody')

  document.querySelector('body').appendChild(div)
  div.appendChild(table)
  table.appendChild(thead)
  thead.appendChild(tr)
  tr.appendChild(th1)
  tr.appendChild(th2)
  table.appendChild(tbody)

    companies.forEach(company => {
      let symbol = company["1. symbol"]
      let name = company["2. name"]

      //create table
      let tr = document.createElement('tr')
      let td = document.createElement('td')
      td.className = 'collapsing'
      let h4 = document.createElement('h4')
      let content = document.createElement('button')
      content.className = 'ui button'
      content.addEventListener('click', stockClick)
      content.id = symbol
      content.innerText = symbol
      let subHeader = document.createElement('div')
      subHeader.className = 'sub header'
      subHeader.innerText = name

      let td2 = document.createElement('td')
      td2.innerText = ''

      //append all elements to table
      tbody.appendChild(tr)
      tr.appendChild(td)
      tr.appendChild(td2)
      td.appendChild(h4)
      h4.appendChild(content)
      h4.appendChild(subHeader)

    })

  // document.querySelector(".page-body").innerHTML = ""
  // let div = document.createElement('div')
  // div.className = "Companies"
  // companies["bestMatches"].forEach(company =>{
  //   let button = document.createElement('button')
  //   let symbol = company["1. symbol"]
  //   let name = company["2. name"]
  //   button.innerText = `Name: ${name} , Symbol: ${symbol}`
  //   button.id = symbol
  //   button.addEventListener('click', stockClick)
  //   div.appendChild(button)
  // })
  // document.querySelector('.page-body').appendChild(div)
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
  renderNavbar()
  const symbol = quote["01. symbol"]
  const open = quote["02. open"]
  const high = quote["03. high"]
  const low = quote["04. low"]
  const price = quote["05. price"]
  const volume = quote["06. volume"]
  const day = quote["07. latest trading day"]
  const close = quote["08. previous close"]
  const change = quote["09. change"]
  const percent = quote["10. change percent"]  //these values are strings!

  let table = document.createElement('table')
  table.className = "ui celled table"
  let thead = document.createElement('thead')
  let tr = document.createElement('tr')
  let th1 = document.createElement('th')
  th1.innerText = symbol
  let th2 = document.createElement('th')
  th2.innerText = 'Value'
  let tbody = document.createElement('tbody')

  document.querySelector('body').appendChild(table)
  table.appendChild(thead)
  thead.appendChild(tr)
  tr.appendChild(th1)
  tr.appendChild(th2)
  table.appendChild(tbody)

  let trOpen = document.createElement('tr')
  let tdOpen1 = document.createElement('td')
  tdOpen1.innerText = "Open"
  let tdOpen2 = document.createElement('td')
  tdOpen2.innerText = open
  tbody.appendChild(trOpen)
  trOpen.appendChild(tdOpen1)
  trOpen.appendChild(tdOpen2)

  let trHigh = document.createElement('tr')
  let tdHigh1 = document.createElement('td')
  tdHigh1.innerText = "High"
  let tdHigh2 = document.createElement('td')
  tdHigh2.innerText = high
  tbody.appendChild(trHigh)
  trHigh.appendChild(tdHigh1)
  trHigh.appendChild(tdHigh2)

  let trLow = document.createElement('tr')
  let tdLow1 = document.createElement('td')
  tdLow1.innerText = "Low"
  let tdLow2 = document.createElement('td')
  tdLow2.innerText = low
  tbody.appendChild(trLow)
  trLow.appendChild(tdLow1)
  trLow.appendChild(tdLow2)

  let trPrice = document.createElement('tr')
  let tdPrice1 = document.createElement('td')
  tdPrice1.innerText = "Price"
  let tdPrice2 = document.createElement('td')
  tdPrice2.innerText = price
  tbody.appendChild(trPrice)
  trPrice.appendChild(tdPrice1)
  trPrice.appendChild(tdPrice2)

  let trVolume = document.createElement('tr')
  let tdVolume1 = document.createElement('td')
  tdVolume1.innerText = "Volume"
  let tdVolume2 = document.createElement('td')
  tdVolume2.innerText = volume
  tbody.appendChild(trVolume)
  trVolume.appendChild(tdVolume1)
  trVolume.appendChild(tdVolume2)

  let trDay = document.createElement('tr')
  let tdDay1 = document.createElement('td')
  tdDay1.innerText = "Latest Trading Day"
  let tdDay2 = document.createElement('td')
  tdDay2.innerText = day
  tbody.appendChild(trDay)
  trDay.appendChild(tdDay1)
  trDay.appendChild(tdDay2)

  let trClose = document.createElement('tr')
  let tdClose1 = document.createElement('td')
  tdClose1.innerText = "Previous Close"
  let tdClose2 = document.createElement('td')
  tdClose2.innerText = close
  tbody.appendChild(trClose)
  trClose.appendChild(tdClose1)
  trClose.appendChild(tdClose2)

  let trChange = document.createElement('tr')
  let tdChange1 = document.createElement('td')
  tdChange1.innerText = "Change"
  let tdChange2 = document.createElement('td')
  tdChange2.innerText = change
  change[0] == "-" ? tdChange2.className = 'negative' : tdChange2.className = 'positive'
  tbody.appendChild(trChange)
  trChange.appendChild(tdChange1)
  trChange.appendChild(tdChange2)

  let trPercent = document.createElement('tr')
  let tdPercent1 = document.createElement('td')
  tdPercent1.innerText = "Change Percent"
  let tdPercent2 = document.createElement('td')
  tdPercent2.innerText = percent
  percent[0] == "-" ? tdPercent2.className = 'negative' : tdPercent2.className = 'positive'
  tbody.appendChild(trPercent)
  trPercent.appendChild(tdPercent1)
  trPercent.appendChild(tdPercent2)

  let buy = document.createElement('button')
  buy.className = 'ui button'
  buy.innerText = 'Buy'
  buy.addEventListener('click', buyForm)

  document.querySelector('body').appendChild(buy)

  let maxPurchase = Math.floor(currentMoney / price)

  let buyDiv = document.createElement('div')
  buyDiv.id = 'buyDiv'
  buyDiv.style.display = 'none'
  let form = document.createElement('form')
  form.className = 'ui small form'
  form.addEventListener('submit', buySubmit)
  let field = document.createElement('field')
  let label = document.createElement('label')
  label.innerText = `Enter Quantity Of Shares To Buy. User Has $${currentMoney}. Maximum possible purchase is ${maxPurchase} shares.`
  let input = document.createElement('input')
  input.type = 'text'
  input.name = 'input'
  input.price = `${price}`
  input.symbol = `${symbol}`
  input.money = `${currentMoney}`
  let submit = document.createElement('button')
  submit.className = 'ui button'
  submit.type = submit
  submit.innerText = 'Purchase'

  document.querySelector('body').appendChild(buyDiv)
  buyDiv.appendChild(form)
  form.appendChild(field)
  form.appendChild(label)
  form.appendChild(input)
  form.appendChild(submit)
}

function buyForm(){
  form = document.querySelector("#buyDiv")
  form.style = ""
}

function buySubmit(e){
  e.preventDefault()
  let quantity = e.target.input.value
  let price = e.target.input.price
  let symbol = e.target.input.symbol
  let currentMoney = e.target.input.money
  let total = quantity * price

  let newMoney = currentMoney - total
  for(let i = 0; i < quantity; i++){
    postShares(symbol, price)
  }

  postBuyTransaction(symbol, price, quantity, total)
  editMoney(newMoney)
  currentMoney = getMoney()
  fetchTransactions()
}

function postShares(symbol, price){
  fetch(sharesURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userID,
            stock_symbol: symbol,
            purchase_value: price
        })
  })
}

function postBuyTransaction(symbol, price, quantity, total){
  fetch(transactionsURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userID,
            bought: true,
            stock_symbol: symbol,
            stock_price: price,
            quantity: quantity,
            transaction_total: total
        })
  })
}

function editMoney(newMoney){
  fetch(userURL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            money: newMoney
        })
  })
}

function fetchTransactions(){
  fetch(transactionsURL)
  .then((res) => res.json())
  .then((data) =>renderTransactions(data))
}


function renderTransactions(data){
  clearDOM()
  renderNavbar()
  let div = document.createElement('div')
  div.className = 'ui grid container'
  let table = document.createElement('table')
  table.className = "ui celled striped table"
  let thead = document.createElement('thead')
  let tr = document.createElement('tr')
  let th1 = document.createElement('th')
  th1.innerText = 'Stock Symbol'
  let th2 = document.createElement('th')
  th2.innerText = 'Transaction'
  let th3 = document.createElement('th')
  th3.innerText = 'Quantity'
  let th4 = document.createElement('th')
  th4.innerText = 'Individual Stock Price'
  let th5 = document.createElement('th')
  th5.innerText = 'Total Transaction Value'

  let tbody = document.createElement('tbody')

  document.querySelector('body').appendChild(div)
  div.appendChild(table)
  table.appendChild(thead)
  thead.appendChild(tr)
  tr.appendChild(th1)
  tr.appendChild(th2)
  tr.appendChild(th3)
  tr.appendChild(th4)
  tr.appendChild(th5)
  table.appendChild(tbody)

  data.forEach(transaction =>{
    //create conditional table
    if (transaction["user_id"] == userID){
      let tr = document.createElement('tr')
      let td1 = document.createElement('td')
      td1.innerText = transaction["stock_symbol"]
      let td2 = document.createElement('td')
      transaction["bought"] == true ? td2.innerText = 'Bought' : td2.innerText = 'Sold'
      let td3 = document.createElement('td')
      td3.innerText = transaction["quantity"]
      let td4 = document.createElement('td')
      td4.innerText = transaction["stock_price"]
      let td5 = document.createElement('td')
      td5.innerText = transaction["transaction_total"]

      //append all elements to table
      tbody.appendChild(tr)
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      tr.appendChild(td5)
    }
  })
}

function fetchPortfolio(){
  fetch(sharesURL)
  .then((res) => res.json())
  .then((portfolioData) =>createObj(portfolioData))
}

function createObj(portfolioData){
  let userObj = {}
  portfolioData.forEach(share=>{
    if (share["user_id"] == userID){
      let symbol = share["stock_symbol"]
      symbol in userObj ? userObj[symbol][0] += 1 : userObj[symbol] = [1, 0]
    }
  })

  Promise.all(fetchCurrentPrices(userObj)).then(dataArray => renderPortfolio(dataArray, userObj))

  //renderPortfolio(userObj)
}

function fetchCurrentPrices(userObj){
  const fetchArray = Object.keys(userObj).map(key =>{
    let stockURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${key}&apikey=T8E6RZ7YEO1NDYZU`

    return fetch(stockURL)
    .then((res) => res.json())
    //.then((data) => userObj[key][1] = (data["Global Quote"]["05. price"]))
  })
  return fetchArray
}


function renderPortfolio(dataArray, userObj){
  let newObj = {}
  dataArray.forEach(obj=>{
    newObj[obj["Global Quote"]["01. symbol"]] = obj["Global Quote"]["05. price"]
  })

  Object.keys(newObj).forEach(key=>{
    userObj[key][1] = newObj[key]
  })

  clearDOM()
  renderNavbar()

  let div = document.createElement('div')
  div.className = 'ui grid container'
  let table = document.createElement('table')
  table.className = "ui celled striped table"
  let thead = document.createElement('thead')
  let tr = document.createElement('tr')
  let th1 = document.createElement('th')
  th1.innerText = 'Stock Symbol'
  let th2 = document.createElement('th')
  th2.innerText = 'Quantity Owned'
  let th3 = document.createElement('th')
  th3.innerText = 'Current Individual Share Value'
  let th4 = document.createElement('th')
  th4.innerText = 'Current Total Market Value'
  let th5 = document.createElement('th')

  let tbody = document.createElement('tbody')

  document.querySelector('body').appendChild(div)
  div.appendChild(table)
  table.appendChild(thead)
  thead.appendChild(tr)
  tr.appendChild(th1)
  tr.appendChild(th2)
  tr.appendChild(th3)
  tr.appendChild(th4)
  tr.appendChild(th5)
  table.appendChild(tbody)

  Object.keys(userObj).forEach(key=>{
    let tr = document.createElement('tr')
    let td1 = document.createElement('td')
    td1.innerText = key
    let td2 = document.createElement('td')
    td2.innerText = userObj[key][0]
    let td3 = document.createElement('td')
    td3.innerText = userObj[key][1]
    let td4 = document.createElement('td')
    td4.innerText = userObj[key][0] * userObj[key][1]
    let td5 = document.createElement('td')
    let button = document.createElement('button')
    button.className = 'ui button'
    button.innerText = 'Sell This Stock'
    button.symbol = key
    button.quantity = userObj[key][0]
    button.price = userObj[key][1]
    button.addEventListener('click', sellForm)
    td5.appendChild(button)

    tbody.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
  })

  let sellDiv = document.createElement('div')
  sellDiv.id = 'sellDiv'
  sellDiv.className = 'ui grid container'
  document.querySelector('body').appendChild(sellDiv)
}

function sellForm(e){
  let symbol = e.target.symbol
  let quantity = e.target.quantity
  let price = e.target.price

  let form = document.createElement('form')
  form.className = 'ui small form'
  form.addEventListener('submit', sellSubmit)
  let label = document.createElement('label')
  label.for = 'select'
  label.innerText = `Select Quantity Of ${symbol} Shares To Sell`
  let select = document.createElement('select')
  select.name = 'select'
  select.id = 'select'
  select.price = price
  select.symbol = symbol
  for(let i = 1; i <= quantity; i++){
    let option = document.createElement('option')
    option.value = `${i}`
    option.innerText = i
    select.appendChild(option)
  }
  let submit = document.createElement('button')
  submit.className = 'ui button'
  submit.type = submit
  submit.innerText = 'Sell'

  form.appendChild(label)
  form.appendChild(select)
  form.appendChild(submit)

  sell = document.querySelector('#sellDiv')
  sell.innerHTML = ""
  sell.appendChild(form)
}

function sellSubmit(e){
  e.preventDefault()
  let quantity = parseInt(e.target.select.value)
  let price = e.target.select.price
  let symbol = e.target.select.symbol
  let total = quantity * price
  let newMoney = currentMoney + total

  getSharesToDelete(symbol, quantity)
  postSellTransaction(symbol, price, quantity, total)
  editMoney(newMoney)
  currentMoney = getMoney()
  fetchTransactions()
}

function getSharesToDelete(symbol,quantity){
  fetch(sharesURL)
  .then((res) => res.json())
  .then((sharesData) => parseShares(sharesData, symbol, quantity))
}

function parseShares(sharesData, symbol, quantity){
  const sharesArray = []
  sharesData.forEach(share =>{
    if (share.user_id == userID && share.stock_symbol == symbol){
      sharesArray.push(share.id)
    }
  })
  const newArray = sharesArray.slice(0,quantity)
  deleteShares(newArray)
}

function deleteShares(newArray){
  newArray.forEach(share=>{
    let shareUrl = `http://localhost:3000/shares/${share}`
    fetch(shareUrl,{
      method: 'DELETE'
    })
  })
}

function postSellTransaction(symbol, price, quantity, total){
  fetch(transactionsURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userID,
            bought: false,
            stock_symbol: symbol,
            stock_price: price,
            quantity: quantity,
            transaction_total: total
        })
  })
}
