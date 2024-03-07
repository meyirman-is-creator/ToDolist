import './App.css';
import React,{useState,useContext, useEffect} from 'react';
import {getMonth} from './util'
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import EventModal from './components/EventModal';
import GlobalContext from './context/GlobalContext';
import ModalList from './components/ModalList';
function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {monthIndex, showEventModal, showModalList} = useContext(GlobalContext);
  useEffect(()=>{
    setCurrentMonth(getMonth(monthIndex))
  },[monthIndex]);
  return (
    
    <React.Fragment>
      {showEventModal && <EventModal/>}
      {showModalList && <ModalList/>}
      <div className='h-screen flex flex-col'>
        <CalendarHeader/>
        <div className="flex flex-1">
          <Sidebar/>
          <Month month = {currentMonth}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
