import { createSlice } from '@reduxjs/toolkit'
import theater from './theater'


const theaterSlice = createSlice({
  name: 'theater',
  initialState: {
    theater: theater,
    bookedSeats: null,
    freeSeats: null,
    adjacentSeats: null,
    choice: null
  },
  reducers: {
    // method for booking random 20% of all seats
    bookTwentyPerc: (state, action) => {
      // input parameter
      const input = action.payload

      // to book randomly 20% of all seats, I have to choose randomly 43 'seat' objects
      // if I just loop 43 times Math.random() method, some of the numbers will repeat,
      // but I need 43 different random numbers. For that, I have to do more:

      // creating array of numbers, each number equal to index of 'seat' item in 'state.theater' array
      const randomArr = []
      for (let i = 0; i < state.theater.length; i++) {
        randomArr.push(i)
      }

      // method for generating random number, 'min' is start of range,
      // 'max' is end of range
      const getRandomNumber = (min, max) => {
        let step1 = max - min + 1;
        let step2 = Math.random() * step1;
        let result = Math.floor(step2) + min;
        return result;
      }
      // finally, looping 'input' number of times through operation of
      // receiving random index from previously created array of indexes and
      // declaring random number
      for (let i = 0; i < input; i++) {
        let randomIndex = getRandomNumber(0, randomArr.length-1)
        let randomNumber = randomArr[randomIndex];
        // changing 'booked' property to true on randomly chosen 20 %
        // of all 'seats' objects
        state.theater = state.theater.map((item, index) => 
          index === randomNumber ? {...item, booked: true} : item
        )
        // cleaning indexes array from used 'randomIndex', to avoid repetition
        randomArr.splice(randomIndex, 1)
      }
      state.freeSeats = [].concat(state.theater.map(item => ({...item})).filter(seat => seat.booked === false))
    },
    // method for creating 'adjacent seats' object, which is part of state
    createAdjacentSeats: (state) => {
      // method for transforming 'freeSeats' array, creates adjacent pairs of seats and deletes
      // seats without pairs. Returns array of adjacent seats.
      const findPair = (input) => {
        const sorted = input.sort((a, b) => b.seat - a.seat)
        const arr = []
      
        for (let x = 0; x < sorted.length; x++) {
          for (let j = 1; j < sorted.length; j++) {
            if ( (sorted[j].seat - sorted[x].seat === 1 &&
                  sorted[j].location === sorted[x].location &&
                  sorted[j].row === sorted[x].row) || 
                 (sorted[j].seat + sorted[x].seat === 1 &&
                  sorted[j].location === sorted[x].location &&
                  sorted[j].row === sorted[x].row)
              ) {
              
              if (!arr.includes(sorted[j]) && !arr.includes(sorted[x])) {
                arr.push(sorted[j])
                arr.push(sorted[x])
              }
            }
          } 
        }

        return arr
      }

      // creates final object, which will be 'adjacentSeats' part of a state,
      // groups pairs into categories according to price
      const sortPair = () => {

        let sortedFree = [].concat(findPair(state.freeSeats))
        
        let first = []
        let second = []
        let third = []
        let forth = []

        let bestSeats = {}

        // fills 'category' arrays with pairs
        const pusher = (fat, arr) => {

          if (sortedFree !== undefined && sortedFree.length > 0) {

            for (let i = 0; i < sortedFree.length; i++) {
              for (let j = 1; j < sortedFree.length; j++) {
                let seat1 = sortedFree[i]
                let seat2 = sortedFree[j]

                // calculates ratio of the pair, the lowest number means better adjacent pair
                const calculateRatio = () => {

                  const ratio = Number(
                    seat1.subPopularityS + 
                    seat2.subPopularityS + 
                    (seat1.subPopularityR * 3) +
                    (seat2.subPopularityR * 3) +
                    (seat1.popularity * 3) +
                    (seat2.popularity * 3) +
                    (seat1.row * 3) +
                    (seat2.row * 3) 
                  )
        
                  let rat = 
                    seat1.location === 'auditorium' && seat2.location === 'auditorium' ?
                      ratio - 10 :
                      seat1.location === 'balcony-mid' && seat2.location === 'balcony-mid' ?
                      ratio * 3 :
                      seat1.location === 'balcony-left' && seat2.location === 'balcony-left' ?
                      ratio * 5 :
                      seat1.location === 'balcony-right' && seat2.location === 'balcony-right' ?
                      ratio * 5 :
                      seat1.location === 'box-left1' && seat2.location === 'box-left1' ?
                      ratio * 7 :
                      seat1.location === 'box-right1' && seat2.location === 'box-right1' ?
                      ratio * 7 :
                      seat1.location === 'box-left2' && seat2.location === 'box-left2' ?
                      ratio * 7 :
                      seat1.location === 'box-right2' && seat2.location === 'box-right2' ?
                      ratio * 7 :
                      null
                  return rat
                }
      
                if ((seat1.ft === fat && seat2.ft === fat &&
                    seat1.seat - seat2.seat === 1 &&
                    seat1.row === seat2.row &&
                    seat1.location === seat2.location) ||
                    (seat1.ft === fat && seat2.ft === fat &&
                    seat1.seat + seat2.seat === 1 &&
                    seat1.row === seat2.row &&
                    seat1.location === seat2.location)
                  ) {
    
                  let bestPair = {}

                  bestPair.first = seat1
                  bestPair.second = seat2
                  bestPair.ratio = calculateRatio()
                                   
                  arr.push(bestPair)
                  sortedFree.splice(sortedFree.indexOf(seat1), 1)
                  sortedFree.splice(sortedFree.indexOf(seat2), 1)
                }
              }
              
            }
          }
          
        }

        pusher(5000, first)
        pusher(4000, second)
        pusher(3000, third)
        pusher(2000, forth)

        bestSeats.first = first
        bestSeats.second = second
        bestSeats.third = third
        bestSeats.forth = forth

        return bestSeats
      }
      
      state.adjacentSeats = sortPair()
      
    },
    // selects best pairs, according to the input
    selectBest: (state, action) => {
      
      const sorter = (input) => input.sort((a, b) => a.ratio - b.ratio)

      let firstSort = sorter(state.adjacentSeats.first)
      let secondSort = sorter(state.adjacentSeats.second)
      let thirdSort = sorter(state.adjacentSeats.third)
      let forthSort = sorter(state.adjacentSeats.forth)
      
      let choice = [
        ...firstSort,
        ...secondSort,
        ...thirdSort,
        ...forthSort
      ].slice(0, action.payload)

      state.choice = choice

    },

    createBookedSeats: (state) => {
      state.bookedSeats = state.theater.filter(seat => seat.booked === true)
    }

  }
})


export default theaterSlice.reducer

export const { bookTwentyPerc, createAdjacentSeats, createBookedSeats, selectBest } = theaterSlice.actions