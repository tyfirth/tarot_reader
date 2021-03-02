class Reading {

  constructor(reading){
    this.id = reading.id
    this.notes = reading.notes
    this.cards = reading.cards
  }

  static fetchReadings(){
    apiService.findReadings()
    .then(readings => readings.forEach(reading => {
      let newReading = new Reading(reading)
      console.log(reading)
      newReading.appendReading()
    }))
  }

  static createReading(){
    let readingNotesForm = document.querySelector('.reading-notes-form')
    readingNotesForm.addEventListener('submit', function(e){
      e.preventDefault()
      apiService.postReading(e)
      // readingNotesForm.reset()
      .then(reading => {
        let newReading = new Reading(reading)
        console.log(newReading)

        newReading.appendReading(newReading)
        console.log(`Cool! I got the reading id here: ${newReading.id}`)
      })
    })
  }

  appendReading(){

    let readingsContainer = document.querySelector('#readings-container')
    let readingNotesDiv = document.createElement('div')
    readingNotesDiv.setAttribute('class', 'reading')
    readingNotesDiv.dataset.id = this.id


    let readingTitle = document.createElement('p')
    readingTitle.innerText = `${this.id} Your thoughts: ${this.notes}`
    let readingCards = document.createElement('ul')


    readingNotesDiv.append(readingTitle, readingCards)
    readingsContainer.append(readingNotesDiv)

    // console.log(this.cards)

    this.renderCards(readingCards)


    let deleteReadingBtn = document.createElement('button')
    deleteReadingBtn.innerText = 'Delete Reading'
    readingNotesDiv.append(deleteReadingBtn)
    this.deleteReading(deleteReadingBtn)

  }

  renderCards(readingCards){
    if (this.cards){
      this.cards.forEach(card => {
        let newCard = new Card(card)
        console.log(card)
        let readingCardName = document.createElement('li')
        readingCardName.innerText = card.name
        readingCards.append(readingCardName)
      })
    }
  }

  deleteReading(deleteReadingBtn){
    deleteReadingBtn.addEventListener('click', function(e){
      e.preventDefault()
      apiService.removeReading(e)
      e.target.parentElement.remove()
    })
  }


}
