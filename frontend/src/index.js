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
