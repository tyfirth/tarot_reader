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
      // console.log(reading)
      newReading.appendReading()
    }))
  }

  static createReading(){
    let readingNotesForm = document.querySelector('.reading-notes-form')
    readingNotesForm.addEventListener('submit', function(e){
      e.preventDefault()
      apiService.postReading(e)
      .then(reading => {
        let newReading = new Reading(reading)
        let readingNotesDiv = document.getElementById('reading-notes-div')
        readingNotesDiv.setAttribute('data-id', `${newReading.id}`)
        let id = readingNotesDiv.dataset.id

        console.log(reading)
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
    // console.log(this.cards)

    readingNotesDiv.append(readingTitle)
    readingNotesDiv.dataset.id = this.id
    readingsContainer.append(readingNotesDiv)
    this.renderCards(readingNotesDiv)

    let deleteReadingBtn = document.createElement('button')
    deleteReadingBtn.innerText = 'Delete Reading'
    readingNotesDiv.append(deleteReadingBtn)

    this.deleteReading(deleteReadingBtn)

  }

  renderCards(readingNotesDiv){
    if (this.cards){
      this.cards.forEach(card => {
        let newCard = new Card(card)
        console.log(card)
        newCard.appendCardToReading(readingNotesDiv)
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
