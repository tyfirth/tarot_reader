class ApiService {

  constructor(){
    this.baseURL = 'http://localhost:3000/api/v1'
  }


// read

getOneCard(){
  return fetch('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1')
  .then(resp => resp.json())
}


  findReadings(){
    return fetch(`${this.baseURL}/readings`)
    .then(resp => resp.json())
  }

// create

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

  postCard(card){
    return fetch(`${this.baseURL}/cards`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        card: card
      })
    })
    .then(resp => resp.json())
  }

  // destroy

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
