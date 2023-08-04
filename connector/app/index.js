import Connector from '@tableau/taco-toolkit'

let connectorInitialized = false
let pageLoaded = false
let latitude;
let longitude;

const connector = new Connector(() => {
  connectorInitialized = true
  enableButtonWhenReady()
})

function submit() {
  connector.handlerInputs = [
    {
      fetcher: 'MyFetcher',
      parser: 'MyParser',
      data: {
        url: 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=<your API Token>',
      },
    },
  ]
  connector.submit()
}

function handleSubmit() {
  const elem = document.getElementById('submitButton')
  elem.toggleAttribute('disabled')
  elem.innerText = 'Processing...'

  var selectElement = document.getElementById("stadiumSelect")
  var selectedStadium = selectElement.value

  switch (selectedStadium) {
    case "Mumbai":
      latitude = 18.93
      longitude = 72.82
      break
    case "Kolkata":
      latitude = 22.56
      longitude = 88.34
      break
    case "Delhi":
      latitude = 28.63
      longitude = 77.24
      break
    case "Bengaluru":
      latitude = 12.97
      longitude = 77.59
      break
    case "Hyderabad":
      latitude = 17.4
      longitude = 78.55
      break
    default:
      latitude = null
      longitude = null
      break
  }
    
  submit()
}

function enableButtonWhenReady() {
  if (connectorInitialized && pageLoaded) {
    const elem = document.getElementById('submitButton')
    elem.innerText = 'Get Weather Data!'
    elem.removeAttribute('disabled')
    elem.addEventListener('click', handleSubmit, { once: true })
  }
}

window.addEventListener('load', function () {
  pageLoaded = true
  enableButtonWhenReady()
})
