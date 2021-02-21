  console.log('%c Why, hello there...', 'color: lightblue')

  // (function() {console.log('%c ..what does your future hold?', 'color:lightblue') }) ()
  // why cant this IIFE be called here?

// basic fetch
  // fetch("https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=7")
  // .then(resp => resp.json())
  // .then(data => displayCards(data.cards))

// click button to get random readings from api
// pass a customized reading object to a another function that will wait
// for save button click, at which point will trigger a
// post fetch to YOUR Api with customized reading object (that has_many cards)

document.addEventListener('DOMContentLoaded', function(){

  (function() {console.log('%c ..what does your future hold?', 'color:lightblue') }) ()
// IIFE being called here ^^^

  fetchReadings()
  // ApiService.fetchReadings()

  const oneCardDrawBtn = document.getElementById('oneCardDraw')
  oneCardDrawBtn.addEventListener('click', function(){
    fetch("https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1")
    .then(resp => resp.json())
    .then(function(data){
      displayCards(data.cards)
      const saveButton = document.getElementById('saveReading')
      saveButton.addEventListener('click', function(){
        createReading(data.cards)
      })
    })
  })

  const sevenCardDrawBtn = document.getElementById('sevenCardDraw')
  sevenCardDrawBtn.addEventListener('click', function(){
    fetch("https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=7")
    .then(resp => resp.json())
    .then(function(data){
      displayCards(data.cards)
      // createReading(data.cards)
      const saveButton = document.getElementById('saveReading')
      saveButton.addEventListener('click', function(){
        createReading(data.cards)
      })
    })

    let readingNotes = document.createElement('textarea')
    let readingNotesDiv = document.getElementById('reading-notes-div')
    readingNotesDiv.innerHTML = "Your thoughts?  "
    readingNotes.setAttribute('id', "reading-notes")
    readingNotesDiv.appendChild(readingNotes)

  })

  let resetBtn = document.getElementById('reset')
  resetBtn.addEventListener('click', resetContainer)

}) // end of DOMContentLoaded

function displayCards(cards) { // should probably separate into createCard method and display method
  let hidden = true
  resetContainer()
  let cardContainer = document.querySelector('div.card-container')
  // for all displayed cards
  for (const element of cards) {
    let cardDiv = document.createElement('div')
    cardDiv.classList = 'card'

    let infoContainer = document.createElement('div')
    infoContainer.classList = 'info-container'

    let cardName = document.createElement('h2')
    cardName.classList = 'card-name'
    cardName.innerText = element.name
    cardDiv.append(cardName)

// Important !! Card Value is here
    let cardNumber = document.createElement('h2')
    cardNumber.classList = 'card-number'
    cardNumber.innerText = element.value_int
    cardDiv.appendChild(cardNumber)
    let cardImgNum = element.value_int

    let cardType = document.createElement('h3')
    cardType.classList = 'card-type'
    cardType.innerText = element.type
    cardDiv.appendChild(cardType)

    let cardSuit = document.createElement('h3')
    cardSuit.classList = 'card-suit'
    cardSuit.innerText = cardArcana(element)
    cardDiv.appendChild(cardSuit)

    let suitFirstLetter = cardArcana(element).split("")[0].toLowerCase()

    let cardMeaning = document.createElement('p')
    cardMeaning.classList = 'card-meaning-up'
    cardMeaning.innerText = element.meaning_up
    infoContainer.appendChild(cardMeaning)

    // put image here
    let cardImg = document.createElement('img')
    cardImg.classList = 'card-img'
    cardImg.src = '../cards/' + suitFirstLetter + cardImgNum + '.jpg'
    cardDiv.appendChild(cardImg)

    let cardDesc = document.createElement('p')
    cardDesc.classList = 'card-desc'
    cardDesc.innerText = element.desc
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
    // call function that puts event listener on save button
    // which when clicked, takes the cards and sends a post fetch to
    // create a new reading object with those cards

    // testing area
  } // end for all displayed
}

function createReading(cards){
  let readingObj = {}

  for(let i = 0; i < cards.length; i++){
    readingObj[`card${i+1}`] = cards[i]
  }

  let readingNotes = document.getElementById('reading-notes')
  

  fetch('http://localhost:3000/api/v1/readings',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      reading: readingObj
      // reading: {
      //   card1: {
      //     name: "Ace",
      //     suit: "Wands"
      //   },
      //   card2: {
      //     name: "King",
      //     suit: "Cups"
      //   },
      //   notes: "This is weird"
      // }

        // readingObj,
        // notes: "I always get the same reading..."

    })
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}

function resetContainer() {
  let cardContainer = document.querySelector('div.card-container')
  cardContainer.remove()
  let newCardContainer = document.createElement('div')
  newCardContainer.classList = 'card-container'
  document.body.append(newCardContainer)
}

function cardArcana(card){
  if (card.type === "major") {
    card.suit = "Major Arcana"
  }
  return card.suit
}

function fetchReadings(){
  fetch('http://localhost:3000/api/v1/readings')
  .then(resp => resp.json())
  .then(function(readings){
    console.log(readings)
    let readingsContainer = document.getElementById('readings-container')
  })
}



// function getCardData() {
//   let cardArray = Array.from(document.getElementsByClassName('card'))
//   const readingObj = {}
//   for(let i = 0; i < cardArray.length; i++){
//     readingObj[`card${i+1}`] = cardArray[i].childNodes
//   }
//   console.log(cardArray)
//   console.log(readingObj)
//   return readingObj
// }

// fetch('http://localhost:3000/data')
// .then(resp => resp.json())
// .then(data => getImgs(data.cards))
//
// function getImgs(cards){
//   return cards.find(name => element.name)
//   console.log(cards)
// }
