// visual container for inputting of parameters and  displaying result on a screen
// in an intuitive way
import { useSelector, useDispatch } from 'react-redux'
import { 
  bookTwentyPerc, 
  createAdjacentSeats,
  createBookedSeats, 
  selectBest 
} from './redux/theaterSlice'
import { useForm } from "react-hook-form";


function App() {

  const { freeSeats, bookedSeats, choice } = useSelector(state => state.theater)

  const { register: register1, handleSubmit: submit1, reset: reset1 } = useForm()
  const { register: register2, handleSubmit: submit2, reset: reset2 } = useForm()
 
  const dispatch = useDispatch()

  const handleSubmit1 = (input) => {
    dispatch(bookTwentyPerc(input.quantityS))
    dispatch(createAdjacentSeats())
    dispatch(createBookedSeats())
    reset1()
  }

  const handleSubmit2 = (data) => {
    dispatch(selectBest(data.quantityP / 2))
    reset2()
  }

  const Condition = () => {
    if (choice === null) {
      return (
        <div className='body2'>
          {
            freeSeats !== null ?
            <h3>{freeSeats.length} seats are free:</h3>:
            null
          }

          {
            freeSeats !== null ?
            freeSeats.map((item, i) => 
            <div key={i}>
              <p>Seat {item.seat}, row {item.row}, at {item.location.toUpperCase()}</p>
            </div>
            ) :
            null
          }
        </div>
      )
    } else {
      return (
        <div className='body2'> 
          <h3>Your chosen adjacent pairs are:</h3> 
          {
            choice.map((item, i) => 
              <div key={i}>
                <h4>Pair {i + 1}:</h4>
                <p>Seat {item.first.seat}, row {item.first.row}, at {item.first.location.toUpperCase()}</p>
                <p>Seat {item.second.seat}, row {item.second.row}, at {item.second.location.toUpperCase()}</p>
              </div>
            ) 
          }
        </div>
      )
    }
  }

  return (
    <div>
      <h1 className='h1'>Theater Seats Reservation Tool</h1>

      <div className='formWrapper'>
        <form className={freeSeats === null ? 'form' : 'disabled'} onSubmit={submit1(handleSubmit1)}>
          <label className='label' htmlFor='bookedSeats'>Enter quantity of booked seats (between 43 and 209):</label>
          <input 
            type='text' 
            autoComplete='off'
            id='bookedSeats' 

            {...register1('quantityS', {
              min: 43,
              max: 209,
              valueAsNumber: true,
            })}
          />
          <input className='submit' type='submit' value='Submit' />
        </form>

        <form className={freeSeats !== null ? 'form' : 'disabled'} onSubmit={submit2(handleSubmit2)}>
          <label className='label' htmlFor='persons'>Enter quantity of persons between 1 and 8 (evens only):</label>
          <input 
            type='text' 
            autoComplete='off'
            id='persons' 

            {...register2('quantityP', {
              min: 2,
              max: 8,
              valueAsNumber: true,
              validate: {
                even: v => v % 2 === 0 
              } 
                
            })}
          />
          <input className='submit' type='submit' value='Submit' />
        </form>
      </div>
      <div className='bodyWrapper'>
        <div className='body1'>
          {
            freeSeats !== null ?
            <h3>{bookedSeats.length} seats are already booked:</h3>:
            null
          }

          {
            freeSeats !== null ?
            bookedSeats.map((item, i) => 
              <div key={i}>
                <p>Seat {item.seat}, row {item.row}, at {item.location.toUpperCase()}</p>
              </div>
            ) :
            null
          }
        </div>
        <>
        <Condition />
        </>
      </div>
      
    </div>
  );
}

export default App;
