/* Method for creating different sections of theater. Creates array of row arrays with dedicated seats objects */

// Input parameters are: 'rows'- quantity of rows, 'seats'- quantity of seats in one row,
// 'locName'- section's name, 'locId'- string which will be used to create unique seat id,
// 'big'- boolean which has to be set to true if we create big sections like Auditorium or Balcony- Mid.,
// has to be set to false if we create other sections, because their row lengths are equal
const sectionCreate = (rows, seats, locName, locId, big) => {
  /* creating 'section' seats array, length is 'rows' according to quantity of rows in section */
  let section = new Array(rows)
    .fill()
    // iterating through each row, setting each row length, with shortest one is '14' 
    // and each next one with one digit longer, according to auditorium mockup picture
    .map((item, i) => big ? item = new Array(seats + i).fill({}) : item = new Array(seats).fill({}))
    // iterating through auditorium empty array to create seats objects, 
    // 'indexR' is row index, 'iS' is seat index
    .map((item,indexR) => item.map((ob, iS) => (
      {
        ...ob,
        location: locName,
        id: `${locId}${indexR + 1}${iS + 1}`,
        seat: iS + 1,
        row: indexR + 1,
        booked: false,       
      }
    )))

  return section
}

const auditoriumCreate = () => {
  /* creating auditorium seats array, length is 8 according to quantity of rows in auditorium */
  let auditorium = sectionCreate(8, 14, 'auditorium', 'AD', true)
    // iterating through seats objects to create 'ft', 'popularity', and subpopularities values 
    // for each seat, according to theater mockup picture and requirements.
    .map(item => item.map(ob => (
      // 'item' here is row array, 'ob' is seat object
      item.length === 14 ?
      {
        ...ob,
        ft: 5000,
        popularity: 1,
        subPopularityR: 1,
        subPopularityS: ob.seat === 7 || ob.seat === 8 ? 1 :
                        ob.seat === 6 || ob.seat === 9 ? 2 :
                        ob.seat === 5 || ob.seat === 10 ? 3 :
                        ob.seat === 4 || ob.seat === 11 ? 4 :
                        ob.seat === 3 || ob.seat === 12 ? 5 :
                        ob.seat === 2 || ob.seat === 13 ? 6 : 7
      } :
      item.length === 15 ?
      {
        ...ob, 
        ft: ob.seat === 1 || ob.seat === 15 ? 4000 : 5000,
        popularity: 1, 
        subPopularityR: ob.seat === 1 || ob.seat === 15 ? 1 : 2,
        subPopularityS: ob.seat === 8 || ob.seat === 1 || ob.seat === 15 ? 1 :
                        ob.seat === 7 || ob.seat === 9 ? 2 :
                        ob.seat === 6 || ob.seat === 10 ? 3 :
                        ob.seat === 5 || ob.seat === 11 ? 4 :
                        ob.seat === 4 || ob.seat === 12 ? 5 :
                        ob.seat === 3 || ob.seat === 13 ? 6 : 7
      } :
      item.length === 16 ?
      {
        ...ob,
        ft: ob.seat <= 2 || ob.seat >= 15 ? 4000 : 5000,
        popularity: 1,
        subPopularityR: ob.seat <= 2 || ob.seat >= 15 ? 2 : 3,
        subPopularityS: ob.seat === 8 || ob.seat === 9 || ob.seat === 2 || ob.seat === 15 ? 1 :
                        ob.seat === 7 || ob.seat === 10 || ob.seat === 1 || ob.seat === 16 ? 2 :
                        ob.seat === 6 || ob.seat === 11 ? 3 :
                        ob.seat === 5 || ob.seat === 12 ? 4 :
                        ob.seat === 4 || ob.seat === 13 ? 5 : 6
      } :
      item.length === 17 ?
      {
        ...ob,
        ft: ob.seat === 1 || ob.seat === 17 ? 3000 :
            ob.seat === 2 || ob.seat === 3 || ob.seat === 15 || ob.seat === 16 ? 4000 : 5000,
        popularity: 1,
        subPopularityR: ob.seat >= 4 && ob.seat <= 14 ? 4 :
                        ob.seat === 2 || ob.seat === 3 || ob.seat === 15 || ob.seat === 16 ? 3 : 1,
    
        subPopularityS: ob.seat === 9 || ob.seat === 1 || ob.seat === 17 || ob.seat === 3 || ob.seat === 15 ? 1 :
                        ob.seat === 8 || ob.seat === 10 || ob.seat === 2 || ob.seat === 16 ? 2 :
                        ob.seat  === 7 || ob.seat === 11 ? 3 :
                        ob.seat  === 6 || ob.seat === 12 ? 4 :
                        ob.seat  === 5 || ob.seat === 13 ? 5 : 6
      } :
      item.length === 18 ?
      {
        ...ob,
        ft: ob.seat <= 3 || ob.seat >= 16 ? 3000 : 4000,
        popularity: 1,
        subPopularityR: ob.seat >= 4 && ob.seat <= 15 ? 4 : 2,                      
        subPopularityS: ob.seat === 9 || ob.seat === 10 || ob.seat === 3 || ob.seat === 16 ? 1 :
                        ob.seat === 8 || ob.seat === 11 || ob.seat === 2 || ob.seat === 17 ? 2 :
                        ob.seat === 7 || ob.seat === 12 || ob.seat === 1 || ob.seat === 18 ? 3 :
                        ob.seat === 6 || ob.seat === 13 ? 4 :
                        ob.seat === 5 || ob.seat === 14 ? 5 : 6
      } :
      item.length === 19 ? 
      {
        ...ob,
        ft: ob.seat <= 5 || ob.seat >= 15 ? 3000 : 4000,
        popularity: 1,
        subPopularityR: ob.seat >= 6 && ob.seat <= 14 ? 5 : 3,
        subPopularityS: ob.seat === 10 || ob.seat === 5 || ob.seat === 15 ? 1 :
                        ob.seat === 9 || ob.seat === 11 || ob.seat === 4 || ob.seat === 16 ? 2 :
                        ob.seat === 8 || ob.seat === 12 || ob.seat === 3 || ob.seat === 17 ? 3 :
                        ob.seat === 7 || ob.seat === 13 || ob.seat === 2 || ob.seat === 18 ? 4 : 5
      } :
      item.length >= 20 ?
      {
        ...ob,
        ft: 3000,
        popularity: 1,
        subPopularityR: ob.row === 7 ? 4 : 5,
        subPopularityS: (ob.row === 7 && ob.seat === 10) || ob.seat === 11 || (ob.row === 8 && ob.seat === 11) ? 1 :
                        (ob.row === 7 && ob.seat === 9) || ob.seat === 12 || (ob.row === 8 && ob.seat === 10) || ob.seat === 12 ? 2 :
                        (ob.row === 7 && ob.seat === 8)|| ob.seat === 13 || (ob.row === 8 && ob.seat === 9) || ob.seat === 13 ? 3 :
                        (ob.row === 7 && ob.seat === 7) || ob.seat === 14 || (ob.row === 8 && ob.seat === 8) || ob.seat === 14 ? 4 :
                        (ob.row === 7 && ob.seat === 6) || ob.seat === 15 || (ob.row === 8 && ob.seat === 7) || ob.seat === 15 ? 5 :
                        (ob.row === 7 && ob.seat === 5) || ob.seat === 16 || (ob.row === 8 && ob.seat === 6) || ob.seat === 16 ? 6 :
                        (ob.row === 7 && ob.seat === 4) || ob.seat === 17 || (ob.row === 8 && ob.seat === 5) || ob.seat === 17 ? 7 :
                        (ob.row === 7 && ob.seat === 3) || ob.seat === 18 || (ob.row === 8 && ob.seat === 4) || ob.seat === 18 ? 8 :
                        (ob.row === 7 && ob.seat === 2) || ob.seat === 19 || (ob.row === 8 && ob.seat === 3) || ob.seat === 19 ? 9 :
                        (ob.row === 7 && ob.seat === 1) || ob.seat === 20 || (ob.row === 8 && ob.seat === 2) || ob.seat === 20 ? 10 : 11
      } :
      ob   
    )))
    // extracting 'seats' object from 'rows' sub-arrays 
    .flat()
  
  return auditorium
}

const balconyMidCreate = () => {
  // creating balcony middle seats array, length is 2 according to quantity of rows on balcony mid.
  let balconyMid = sectionCreate(2, 18, 'balcony-mid', 'BMD', true)
  // iterating through seats objects to create 'ft' value for each seat, 
  // according to theater mockup picture
  .map((item, i) => item.map(ob => (
  // 'item' here is row array, 'ob' is seat object, 'i' is index and row number
    i === 0 ?
    {
      ...ob,
      ft: ob.seat <= 2 || ob.seat >= 17 ? 4000 : 5000,  
      popularity: 2,
      subPopularityR: 1,
      subPopularityS: ob.seat === 9 || ob.seat === 10 || ob.seat === 2 || ob.seat === 17 ? 1 :
                      ob.seat === 8 || ob.seat === 11 || ob.seat === 1 || ob.seat === 18 ? 2 :
                      ob.seat === 7 || ob.seat === 12 ? 3 :
                      ob.seat === 6 || ob.seat === 13 ? 4 :
                      ob.seat === 5 || ob.seat === 14 ? 5 :
                      ob.seat === 4 || ob.seat === 15 ? 6 : 7
    } :
    i === 1 ?
    {
      ...ob,
      ft: ob.seat <= 2 || ob.seat >= 18 ? 2000 :
          (ob.seat >= 3 && ob.seat <= 5) || (ob.seat >= 15 && ob.seat <= 17) ? 3000 : 4000,
      popularity: ob.seat <= 2 || ob.seat >= 18 ? 1 : 2,
      subPopularityR: ob.seat >= 6 && ob.seat <= 14 ? 2 : 1,              
      subPopularityS: ob.seat === 10 || ob.seat === 5 || ob.seat === 15 || ob.seat === 2 || ob.seat === 18 ? 1 :
                      ob.seat === 9 || ob.seat === 11 || ob.seat === 4 || ob.seat === 16 || ob.seat === 1 || ob.seat === 19 ? 2 :
                      ob.seat === 8 || ob.seat === 12 || ob.seat === 3 || ob.seat === 17 ? 3 :
                      ob.seat === 7 || ob.seat === 13 ? 4 : 5
                      
                      
    } :
    ob
  )))
  // extracting 'seats' object from 'rows' sub-arrays
  .flat()

  return balconyMid
}

// single method for creating left and right balconies, accepts one parameter-
// 'side' - sets the side of a balcony.
const balconyRightLeftCreate = (side) => {
  // works same as previous methods for creating sections, except variations 
  // for different sides. Single method is used because both sides are equal.

  // creating individual ' section name' and ' section id' input parameters,
  // depending on balcony side
  let name;
  let id;
  if (side === 'left') {
    name = 'balcony-left'
    id = 'BLT'
  } else {
    name = 'balcony-right'
    id = 'BRT'
  }

  let balcony = sectionCreate(2, 4, name, id, false)
    .map((item, i) => item.map(ob => (
      i === 0 ?
      {
        ...ob,
        ft: ob.seat >= 1 && ob.seat <= 3 ? 4000 : 3000,  
        popularity: 3, 
        subPopularityR: 1,
        subPopularityS: ob.seat >= 2 && ob.seat <= 4 ? 1 : 2
      } :
      i === 1 ?
      {
        ...ob,
        ft: ob.seat >= 1 && ob.seat <= 3 ? 3000 : 2000,
        popularity: ob.seat === 4 ? 2 : 3,
        subPopularityR: ob.seat === 4 ? 1 : 2,
        subPopularityS: ob.seat >= 2 && ob.seat <= 4 ? 1 : 2
                        
      } :
      ob
    )))
    .flat()

  return balcony
}

/* single method for creating boxes because they are indentical.
   accepts 'box' parameter, sets the box coordinates */
const boxCreate = (boxType) => {
  // works same as 'balconyLeftRight' method 
  let name;
  let id;
  if (boxType === 'right1') {
    name = 'box-right1'
    id = 'BXR1'
  } else if (boxType === 'right2') {
    name = 'box-right2'
    id = 'BXR2'
  } else if (boxType === 'left1') {
    name = 'box-left1'
    id = 'BXL1'
  } else if (boxType === 'left2') {
    name = 'box-left2'
    id = 'BXL2'
  }

  let box = sectionCreate(2, 3, name, id, false)
    .map((item, i) => item.map(ob => (
      i === 0 ?
      {
        ...ob,
        ft: 3000,
        popularity: 4,
        subPopularityR: 1,
        subPopularityS: ob.seat === 2 ? 1 : 2
      } :
      i === 1 ?
      {
        ...ob,
        ft: 2000,
        popularity: 3,
        subPopularityR: 1,
        subPopularityS: ob.seat === 2 ? 1 : 2
      } :
      ob
    )))
    .flat()

  return box
}

const whole = []

whole.push(auditoriumCreate())
whole.push(balconyMidCreate())
whole.push(balconyRightLeftCreate('left'))
whole.push(balconyRightLeftCreate('right'))
whole.push(boxCreate('left1'))
whole.push(boxCreate('left2'))
whole.push(boxCreate('right1'))
whole.push(boxCreate('right2'))

const theater = [...whole.flat()]

export default theater

