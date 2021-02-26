class ApiService {

  constructor(){
    this.baseURL = 'http://localhost:3000/api/v1'
  }


// read
 static fetchReadings(){
  return fetch(`${this.baseURL}/readings`)
  .then(resp => resp.json())
  .then(function(readings){
    console.log(readings)
    // let readingsContainer = document.getElementById('readings-container')
  })
}

// create

// delete

}
