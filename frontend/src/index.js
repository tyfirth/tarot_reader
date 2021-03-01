const apiService = new ApiService()

console.log('%c Why, hello there...', 'color: lightblue')

document.addEventListener('DOMContentLoaded', function(){

  (function() {console.log('%c ..what does your future hold?', 'color:lightblue') }) ()
// IIFE being called here ^^^

  Reading.fetchReadings()
  Reading.createReading()
  Card.fetchOneCard()

  // const oneCardDrawBtn = document.getElementById('oneCardDraw')
  // oneCardDrawBtn.addEventListener('click', function(){
  //   Card.fetchOneCard()
  // })

  // const sevenCardDrawBtn = document.getElementById('sevenCardDraw')
  // sevenCardDrawBtn.addEventListener('click', function(){
  //   fetch("https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=7")
  //   .then(resp => resp.json())
  //   .then(function(data){
  //     createReading(data.cards)
  //     displayCards(data.cards)
  //     // createCards(data.cards)
  //
  //     const saveButton = document.getElementById('saveReading')
  //     saveButton.addEventListener('click', function(){
  //       createCards(data.cards)
  //       // fetchReadings()
  //     })
  //   })
  //
  // })

  // let resetBtn = document.getElementById('reset')
  // resetBtn.addEventListener('click', resetContainer)

}) // end of DOMContentLoaded

function displayCards(cards) {
  let hidden = true
  apiService.resetContainer()
  let cardContainer = document.querySelector('div.card-container')


cards.forEach(card => {

  let cardDiv = document.createElement('div')
  cardDiv.classList = 'card'

  let infoContainer = document.createElement('div')
  infoContainer.classList = 'info-container'

  let cardName = document.createElement('h2')
  cardName.classList = 'card-name'
  cardName.innerText = card.name
  cardDiv.append(cardName)

  let cardNumber = document.createElement('h2')
  cardNumber.classList = 'card-number'
  cardNumber.innerText = card.value_int
  cardDiv.appendChild(cardNumber)
  let cardImgNum = card.value_int

  let cardType = document.createElement('h3')
  cardType.classList = 'card-type'
  cardType.innerText = card.type
  cardDiv.appendChild(cardType)

  let cardSuit = document.createElement('h3')
  cardSuit.classList = 'card-suit'
  cardSuit.innerText = cardArcana(card)
  cardDiv.appendChild(cardSuit)

  let suitFirstLetter = cardArcana(card).split("")[0].toLowerCase()

  let cardMeaning = document.createElement('p')
  cardMeaning.classList = 'card-meaning-up'
  cardMeaning.innerText = card.meaning_up
  infoContainer.appendChild(cardMeaning)

  let cardImg = document.createElement('img')
  cardImg.classList = 'card-img'
  cardImg.src = '../cards/' + suitFirstLetter + cardImgNum + '.jpg'
  cardDiv.appendChild(cardImg)

  let cardDesc = document.createElement('p')
  cardDesc.classList = 'card-desc'
  cardDesc.innerText = card.desc
  infoContainer.appendChild(cardDesc)

  cardDiv.appendChild(infoContainer)

  cardContainer.appendChild(cardDiv)

  let newInfoBtn = document.createElement('button')
  newInfoBtn.classList = 'info-button'
  newInfoBtn.innerText = "Info"
  cardDiv.appendChild(newInfoBtn)

  newInfoBtn.addEventListener('click', function(e){
    let infoBtn = e.target.closest('div button.info-button')
    if (hidden) {
      infoContainer.style.display = "block";
      hidden = !hidden
    } else if (!hidden) {
      infoContainer.style.display = "none";
      hidden = !hidden
    }
  })
}) // end forEach


  // // for all displayed cards
  // for (const element of cards) {
  //   let cardDiv = document.createElement('div')
  //   cardDiv.classList = 'card'
  //
  //   let infoContainer = document.createElement('div')
  //   infoContainer.classList = 'info-container'
  //
  //   let cardName = document.createElement('h2')
  //   cardName.classList = 'card-name'
  //   cardName.innerText = element.name
  //   cardDiv.append(cardName)
  //
  //   let cardNumber = document.createElement('h2')
  //   cardNumber.classList = 'card-number'
  //   cardNumber.innerText = element.value_int
  //   cardDiv.appendChild(cardNumber)
  //   let cardImgNum = element.value_int
  //
  //   let cardType = document.createElement('h3')
  //   cardType.classList = 'card-type'
  //   cardType.innerText = element.type
  //   cardDiv.appendChild(cardType)
  //
  //   let cardSuit = document.createElement('h3')
  //   cardSuit.classList = 'card-suit'
  //   cardSuit.innerText = cardArcana(element)
  //   cardDiv.appendChild(cardSuit)
  //
  //   let suitFirstLetter = cardArcana(element).split("")[0].toLowerCase()
  //
  //   let cardMeaning = document.createElement('p')
  //   cardMeaning.classList = 'card-meaning-up'
  //   cardMeaning.innerText = element.meaning_up
  //   infoContainer.appendChild(cardMeaning)
  //
  //   let cardImg = document.createElement('img')
  //   cardImg.classList = 'card-img'
  //   cardImg.src = '../cards/' + suitFirstLetter + cardImgNum + '.jpg'
  //   cardDiv.appendChild(cardImg)
  //
  //   let cardDesc = document.createElement('p')
  //   cardDesc.classList = 'card-desc'
  //   cardDesc.innerText = element.desc
  //   infoContainer.appendChild(cardDesc)
  //
  //   cardDiv.appendChild(infoContainer)
  //
  //   cardContainer.appendChild(cardDiv)
  //
  //   let newInfoBtn = document.createElement('button')
  //   newInfoBtn.classList = 'info-button'
  //   newInfoBtn.innerText = "Info"
  //   cardDiv.appendChild(newInfoBtn)
  //
  //   newInfoBtn.addEventListener('click', function(e){
  //     let infoBtn = e.target.closest('div button.info-button')
  //     if (hidden) {
  //       infoContainer.style.display = "block";
  //       hidden = !hidden
  //     } else if (!hidden) {
  //       infoContainer.style.display = "none";
  //       hidden = !hidden
  //     }
  //   })
  // }
}// end for all displayed

function cardArcana(card){
  if (card.type === "major") {
    card.suit = "Major Arcana"
  }
  return card.suit
}


function createCards(cards) {
// get reading_id

let readingsContainer = document.querySelector('#readings-container')
let id = readingsContainer.lastChild.dataset.id


  cards.forEach(function(element){
    let card = new Card(element)

    card.reading_id = id

    // setTimeOut
    fetch('http://localhost:3000/api/v1/cards',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({card: card})
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    // console.log(cardsObj)
  })

}
