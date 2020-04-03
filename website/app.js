/* Global Project Variables */
const appid = 'ef52d781ef9751fdbf5c989c46fee307'
const baseURL = 'api.openweathermap.org/data/2.5/weather?'
const zipInput = document.getElementById('zip');
const userInput = document.getElementById('feelings')
const dateHolder = document.getElementById('date')
const tempHolder = document.getElementById('temp')
const contentHolder = document.getElementById('content')



let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();


const getWeather = async (baseURL, zip, api) => {
  const url = `http://${baseURL}zip=${zip}&appid=${api}`
  const response = await fetch(url)
  let jsonResponse = await response.json()
  return jsonResponse
}


const postData = async (data = {}) => {
  const response = await fetch("/", {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}


const updateUI = async () => {
  const response = await fetch("/all")
  const jsonResponse = await response.json()
 
  dateHolder.innerHTML = `Date: ${jsonResponse.date}`
  contentHolder.innerHTML = `You feel: ${jsonResponse.user}`
  tempHolder.innerHTML = `Temperature: ${jsonResponse.temp}K`
}


const handleClick = async () => {
  const weatherData = await getWeather(baseURL, zipInput.value, appid)
  const data = {
    temperature: weatherData.main.temp,
    date: newDate,
    userresponse: userInput.value
  }
  
  await postData(data)
  updateUI()
}


const ele = document.getElementById('generate')
ele.addEventListener('click', handleClick)