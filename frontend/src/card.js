class Card {

  constructor(card) {
    this.id = card.id
    this.name = card.name;
    this.arcana = card.type;
    this.suit = card.suit;
    this.number = card.value_int;
    this.desc = card.desc;
    this.meaning_up = card.meaning_up;
    // this.reading_id = reading_id;
  }

  static fetchOneCard(){
  const oneCardDrawBtn = document.getElementById('oneCardDraw')
  oneCardDrawBtn.addEventListener('click', function(){

    apiService.getOneCard()
    .then(data => {
      Card.createCards(data.cards)
      })
    })
  }

  // static fetchSevenCards(){
  //   const sevenCardDrawBtn = document.getElementById('sevenCardDraw')
  //   sevenCardDrawBtn.addEventListener('click', function(){
  //
  //     apiService.getSevenCards()
  //     .then(data => {
  //       Card.createCards(data.cards)
  //     })
  //   })
  // }

  static createCards(cards){
    let readingsContainer = document.querySelector('#readings-container')
    let lastReading = readingsContainer.lastChild
    let lastReadingID = lastReading.dataset.id

    cards.forEach(card => {
            // setTimeOut
      let newCard = new Card(card)
      newCard.reading_id = lastReadingID
      newCard.appendCards(newCard)
      apiService.postCard(newCard)
      newCard.appendCardName(newCard, lastReading)
      // .then(card => {
      //   // console.log(card)
      // })
    })
  }

  appendCards(card){
    let hidden = true
    apiService.resetContainer()
    let cardContainer = document.querySelector('div.card-container')

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
    cardNumber.innerText = card.number
    cardDiv.appendChild(cardNumber)
    let cardImgNum = card.number

    let cardType = document.createElement('h3')
    cardType.classList = 'card-type'
    cardType.innerText = card.arcana
    cardDiv.appendChild(cardType)

    let cardSuit = document.createElement('h3')
    cardSuit.classList = 'card-suit'

    // card arcana stuff here
    cardSuit.innerText = card.cardArcana()
    cardDiv.appendChild(cardSuit)

    let suitFirstLetter = card.suit.split("")[0].toLowerCase()

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
  }

  appendCardName(newCard, lastReading){
    let readingCardName = document.createElement('li')
    readingCardName.innerText = newCard.name
    lastReading.appendChild(readingCardName)
  }

  cardArcana(){
    if (this.arcana === "major") {
      this.suit = "Major Arcana"
    }
    return this.suit
  }
}
