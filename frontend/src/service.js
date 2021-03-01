class ApiService {

  constructor(){
    this.baseURL = 'http://localhost:3000/api/v1'
  }


// read
  findReadings(){
    return fetch(`${this.baseURL}/readings`)
    .then(resp => resp.json())
  }

  getOneCard(){
    return fetch('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1')
    .then(resp => resp.json())
  }


  postReading(e){
    return fetch(`${this.baseURL}/readings`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        notes: e.target.notes.value
      })
    })
    .then(resp => resp.json())
  }

  removeReading(e){
    let id = e.target.parentElement.dataset.id
    fetch(`${this.baseURL}/readings/${id}`,{
      method: 'delete'
    })
  }

  resetContainer(){
    let cardContainer = document.querySelector('div.card-container')
    cardContainer.remove()
    let newCardContainer = document.createElement('div')
    newCardContainer.classList = 'card-container'
    document.body.append(newCardContainer)
  }


}
