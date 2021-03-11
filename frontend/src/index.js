const apiService = new ApiService()

console.log('%c Why, hello there...', 'color: lightblue')

document.addEventListener('DOMContentLoaded', function(){

  (function() {console.log('%c ..what does your future hold?', 'color:lightblue') }) ()
// IIFE being called here ^^^
  Reading.fetchReadings()
  Reading.createReading()
  Card.fetchOneCard()
  // Card.fetchSevenCards()
  Reading.searchReadings()
})
