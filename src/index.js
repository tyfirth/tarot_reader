  console.log('%c Why, hello there...', 'color: lightblue')


  // fetch("https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=7")
  // .then(resp => resp.json())
  // .then(data => displayCards(data.cards))





document.addEventListener('DOMContentLoaded', function(){

  const oneCardDrawBtn = document.getElementById('oneCardDraw')
  oneCardDrawBtn.addEventListener('click', function(){
    fetch("https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1")
    .then(resp => resp.json())
    .then(data => displayCards(data.cards))
  })

  const sevenCardDrawBtn = document.getElementById('sevenCardDraw')
  sevenCardDrawBtn.addEventListener('click', function(){
    fetch("https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=7")
    .then(resp => resp.json())
    .then(data => displayCards(data.cards))
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
// Can I do something with that?

    let cardType = document.createElement('h3')
    cardType.classList = 'card-type'
    cardType.innerText = element.type
    cardDiv.appendChild(cardType)

    let cardSuit = document.createElement('h3')
    cardSuit.classList = 'card-suit'
    cardSuit.innerText = cardArcana(element)
    cardDiv.appendChild(cardSuit)

    let suitFirstLetter = cardArcana(element).split("")[0]
    console.log(suitFirstLetter.toLowerCase())

    // fetch('http://localhost:3000/data')
    // .then(resp => resp.json())
    // .then(data => getImgs(data.cards))
    //
    // function getImgs(cards){
    //   return cards.find(name => element.name)
    //   console.log(cards)
    // }

    let cardMeaning = document.createElement('p')
    cardMeaning.classList = 'card-meaning-up'
    cardMeaning.innerText = element.meaning_up
    infoContainer.appendChild(cardMeaning)

    // put image here
    let cardImg = document.createElement('img')
    cardImg.classList = 'card-img'
    // cardImg.src = './cards/' + suitFirstLetter + cardNumber + '.jpg'
    cardDiv.appendChild(cardImg)

    let cardDesc = document.createElement('p')
    cardDesc.classList = 'card-desc'
    cardDesc.innerText = element.desc
    infoContainer.appendChild(cardDesc)

    cardDiv.appendChild(infoContainer)

    cardContainer.appendChild(cardDiv)
    console.log(element.name)

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

    // testing area


  } // end for all displayed
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

// fetch('http://localhost:3000/data')
// .then(resp => resp.json())
// .then(data => getImgs(data.cards))
//
// function getImgs(cards){
//   return cards.find(name => element.name)
//   console.log(cards)
// }
