  console.log('%c Why, hello there...', 'color: lightblue')

  // const apiService = new ApiService()

document.addEventListener('DOMContentLoaded', function(){



  (function() {console.log('%c ..what does your future hold?', 'color:lightblue') }) ()
// IIFE being called here ^^^

  fetchReadings()
  // ApiService.fetchReadings()
  // displayReadings(readings)

  const oneCardDrawBtn = document.getElementById('oneCardDraw')
  oneCardDrawBtn.addEventListener('click', function(){
    fetch("https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1")
    .then(resp => resp.json())
    .then(function(data){
      createReading(data.cards)
      displayCards(data.cards)
      // createCards(data.cards)

      const saveButton = document.getElementById('saveReading')
      saveButton.addEventListener('click', function(){
        createCards(data.cards)
        // fetchReadings()
      })
    })
  })

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
  //   // let readingNotes = document.createElement('textarea')
  //   // let readingNotesDiv = document.getElementById('reading-notes-div')
  //   // readingNotesDiv.innerHTML = "Your thoughts?  "
  //   // readingNotes.setAttribute('id', "reading-notes")
  //   // readingNotesDiv.appendChild(readingNotes)
  //
  // })

  let resetBtn = document.getElementById('reset')
  resetBtn.addEventListener('click', resetContainer)

}) // end of DOMContentLoaded

function displayCards(cards) {
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
  }
}// end for all displayed

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
  .then(function(data){
    console.log(data)

    // let readings = data['data']
    //
    // for(const reading of readings){
    //   console.log(reading)
    // }

  })


    let readingsContainer = document.getElementById('readings-container')

    // if(readings){
    //   for(let reading of readings){
    //     let cards = reading.cards
    //     let newReadingCard = document.createElement('div')
    //
    //     let readingTitle = document.createElement('p')
    //     readingTitle.innerText = reading.created_at
    //     newReadingCard.appendChild(readingTitle)
    //     readingsContainer.appendChild(newReadingCard)
    //
    //     let readingsCards = document.createElement('ul')
    //     let cardName = document.createElement('li')
    //
    //     readingsCards.appendChild(cardName)
    //     newReadingCard.appendChild(readingsCards)
    //
    //       // for(let card of reading){
    //       //   let cardName = document.createElement('li')
    //       //   cardName.innerText = card.name
    //       //
    //       //   readingsCards.appendChild(cardName)
    //       //   newReadingCard.appendChild(readingsCards)
    //       // }
    //   }
    // }

    // do something with readings to display them


}

function createCards(cards) {
  // let cardsObj = []
  let readingNotesDiv = document.getElementById('reading-notes-div')
  let id = readingNotesDiv.dataset.id

  cards.forEach(function(element){
    let card = new Card(element)

    card.reading_id = id

    // cardsObj.push(card)
    // Object.assign(cardsObj, card)
    // console.log(readingCards)
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

function createReading(cards, notes){
  // let cardsArr = cards.map(card => card.name)
  // console.log(cardsArr)

  // let readingNotes = document.getElementById('reading-notes')

  fetch('http://localhost:3000/api/v1/readings',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      reading: {
        // reading_cards: cardsArr,
        // reading_cards: [{name: 'ace'}, {name: 'queen'}],
        notes: "Changin up da notez"
      }
    })
  })
  .then(resp => resp.json()) //can return json here? to DRY code
  .then(function(reading){
    console.log(reading)

    let readingNotesDiv = document.getElementById('reading-notes-div')
    // let newReadingID = document.createElement('p')
    // newReadingID.classList = 'reading-id'
    readingNotesDiv.setAttribute('data-id', `${reading.id}`)
    // newReadingID.innerText = reading.id
    let id = readingNotesDiv.dataset.id


    // readingNotesDiv.appendChild(newReadingID)
    // createCards(cards, reading)
    console.log(`Cool! I got the reading id here: ${id}`)
    // createCards(id)
  })

} //end createReading
