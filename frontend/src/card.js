class Card {

  constructor(card) {
    this.id = card.id
    this.name = card.name;
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
      // createCards(data.cards)
      displayCards(data.cards)

      // const saveButton = document.getElementById('saveReading')
      //   saveButton.addEventListener('click', function(){
      //     // createCards(data.cards)
      //     Reading.fetchReadings()
      //   })
      })
    })
  }

  static createCards(cards){
    let readingsContainer = document.querySelector('#readings-container')
    let id = readingsContainer.lastChild.dataset.id

    cards.forEach(card => {
            // setTimeOut
      let newCard = new Card(card)
      newCard.reading_id = id

      apiService.postCard(newCard)
      .then(card => {
        let newCard = new Card(card)
        displayCards(newCard)
      })

      // fetch('http://localhost:3000/api/v1/cards',{
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   },
      //   body: JSON.stringify({card: card})
      // })
      // .then(resp => resp.json())
      // .then(data => console.log(data))
    })
  }


  appendCards(){

  }

  cardArcana(){
    if (this.type === "major") {
      this.suit = "Major Arcana"
    }
    return this.suit
  }

}
