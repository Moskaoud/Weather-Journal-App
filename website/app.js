// Personal API Key for OpenWeatherMap API//metric for Celcius  unit
const apiKey = 'dd9750424dc433ec9e3348ded201118f&units=metric';
//http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=dd9750424dc433ec9e3348ded201118f;
let baseURL = 'http://api.openweathermap.org/data/2.5/weather';
/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  })
}
var updateUI = async () => {
  // fetch the data from the app endpoint  
  const data = await fetch('/projectData')

  const jsonData = await data.json()
  console.log('jsonData', jsonData)
  const dataId = document.getElementById('date')
  const tempId = document.getElementById('temp')
  const contentId = document.getElementById('content')

  dataId.innerHTML = 'Date: ' + jsonData.date  
  tempId.innerHTML = `Temperature: ${jsonData.temperature}  &#8451;`
  contentId.innerHTML = 'Feelings: ' + jsonData.userResponse

}
/* Function called by event listener */
// let request,projectData
// /* Function to GET Web API Data*/
let getData = async (url = '', zip, key, date, feeling) => {
  var request = await fetch(url + zip + key)
  try {
    // Transform into JSON
    var projectData = await request.json()
    if (projectData.main == undefined)
      alert('Error fetching data from API')
    else {

      var data = { 'temperature': '', 'date': '', 'userResponse': '' }
      data.temperature = projectData.main.temp
      data.date = date
      data.userResponse = feeling
      //  send data to server to save it
      console.log('XXXXXXXXX', data)
      return (data)
    }
  }

  catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}



// Event listener to add function to existing HTML DOM element
let generateId = document.getElementById('generate')
generateId.addEventListener('click', () => {
  let zipCode = document.getElementById('zip').value
  let feelings = document.getElementById('feelings').value


  if (!zipCode || zipCode == '')
    return alert('Please Enter a Zip Code')

  var zip = `?zip=${zipCode}`
  var key = `&appid=${apiKey}`

  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear() + ' GMT+0200 (Eastern European Standard Time)';

  // call async GET
  getData(baseURL, zip, key, newDate, feelings)
  // if i just Update this code .then to arrow function without console.log 
  // update function not working can you help me why ?!! 
  // i don't understant it properly ??!!!
    .then(data => {
      console.log('LOL', data)
      postData('/postData', data)})
    .then(() => updateUI())
})


