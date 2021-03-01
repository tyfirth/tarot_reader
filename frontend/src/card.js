class Card {

  constructor(element) {
    this.name = element.name;
    this.suit = element.suit;
    this.number = element.value_int;
    this.desc = element.desc;
    this.meaning_up = element.meaning_up;
    // this.reading_id = reading_id;
  }

  static fetchOneCard(){
    apiService.getOneCard()
    .then(data => {
      Reading.createReading(data.cards)
      // createReading(data.cards)
      displayCards(data.cards)

      const saveButton = document.getElementById('saveReading')
        saveButton.addEventListener('click', function(){
          createCards(data.cards)
          // fetchReadings()

        })


    })
  }

  // static createCards(cards){
  //   const oneCardDrawBtn = document.getElementById('oneCardDraw')
  //   oneCardDrawBtn.addEventListener('click', function(){
  //     Card.fetchOneCard()
  //   })
  // }


  appendCards(){

  }

  // displayCards(cards) {
  //   let hidden = true
  //   resetContainer()
  //   let cardContainer = document.querySelector('div.card-container')
  //   // for all displayed cards
  //   for (const element of cards) {
  //     let cardDiv = document.createElement('div')
  //     cardDiv.classList = 'card'
  //
  //     let infoContainer = document.createElement('div')
  //     infoContainer.classList = 'info-container'
  //
  //     let cardName = document.createElement('h2')
  //     cardName.classList = 'card-name'
  //     cardName.innerText = element.name
  //     cardDiv.append(cardName)
  //
  // // Important !! Card Value is here
  //     let cardNumber = document.createElement('h2')
  //     cardNumber.classList = 'card-number'
  //     cardNumber.innerText = element.value_int
  //     cardDiv.appendChild(cardNumber)
  //     let cardImgNum = element.value_int
  //
  //     let cardType = document.createElement('h3')
  //     cardType.classList = 'card-type'
  //     cardType.innerText = element.type
  //     cardDiv.appendChild(cardType)
  //
  //     let cardSuit = document.createElement('h3')
  //     cardSuit.classList = 'card-suit'
  //     cardSuit.innerText = cardArcana(element)
  //     cardDiv.appendChild(cardSuit)
  //
  //     let suitFirstLetter = cardArcana(element).split("")[0].toLowerCase()
  //
  //     let cardMeaning = document.createElement('p')
  //     cardMeaning.classList = 'card-meaning-up'
  //     cardMeaning.innerText = element.meaning_up
  //     infoContainer.appendChild(cardMeaning)
  //
  //     // put image here
  //     let cardImg = document.createElement('img')
  //     cardImg.classList = 'card-img'
  //     cardImg.src = '../cards/' + suitFirstLetter + cardImgNum + '.jpg'
  //     cardDiv.appendChild(cardImg)
  //
  //     let cardDesc = document.createElement('p')
  //     cardDesc.classList = 'card-desc'
  //     cardDesc.innerText = element.desc
  //     infoContainer.appendChild(cardDesc)
  //
  //     cardDiv.appendChild(infoContainer)
  //
  //     cardContainer.appendChild(cardDiv)
  //
  //     let newInfoBtn = document.createElement('button')
  //     newInfoBtn.classList = 'info-button'
  //     newInfoBtn.innerText = "Info"
  //     cardDiv.appendChild(newInfoBtn)
  //
  //     newInfoBtn.addEventListener('click', function(e){
  //       let infoBtn = e.target.closest('div button.info-button')
  //       if (hidden) {
  //         infoContainer.style.display = "block";
  //         hidden = !hidden
  //       } else if (!hidden) {
  //         infoContainer.style.display = "none";
  //         hidden = !hidden
  //       }
  //     })
  //     // call function that puts event listener on save button
  //     // which when clicked, takes the cards and sends a post fetch to
  //     // create a new reading object with those cards
  //
  //     // testing area
  //   }
  // }// end for all displayed


}
