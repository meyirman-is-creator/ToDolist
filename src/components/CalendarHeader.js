import React, { useContext } from 'react'
import logo from '../assets/calendar.png'
import leftArrow from '../assets/left-arrow.png';
import rightArrow from '../assets/right-arrow.png';
import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';
export default function CalendarHeader() {
  const {monthIndex, setMonthIndex} = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex-1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex+1);
  }
  function handleReset(){
    setMonthIndex(monthIndex===dayjs().month() ? dayjs().month()+Math.random():dayjs().month());
  }
  return (
    <header className='px-4 py-2 flex items-center'>
      <img src={logo} alt="calendar" className='mr-2 w-12 h-12'/>
      <h1 className='mr-10 text-xl text-grey-500 font-bold'>Calendar</h1>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
        Today
      </button>
      <button style={{ display:'flex',justifyContent:"center", alignItems:"center",border:'1px solid rgb(229 231 235/ 1'}} onClick={handlePrevMonth}>
        <span className='material-icons-outlined cursor-pointer' style={{ width:'50px', height:'50px',display:'flex',justifyContent:"center",alignItems:"center"}}>
          <img src={leftArrow} alt="" style={{width:'30%', height:'30%'}}/>
        </span>
      </button>
      <button style={{display:'flex',justifyContent:"center", alignItems:"center", border:'1px solid rgb(229 231 235 / 1)'}} onClick={handleNextMonth}>
        <span className='material-icons-outlined cursor-pointer' style={{width:'50px', height:'50px',display:'flex',justifyContent:"center",alignItems:"center"}}>
          <img src={rightArrow} alt="" style={{width:'30%', height:'30%'}}/>
        </span>
      </button>
      <h2 className='ml-4 text-xl text-gray-500 font-bold'>
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  )
}
