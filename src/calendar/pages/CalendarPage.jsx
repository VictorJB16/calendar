import { useState } from 'react'
import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer, getMessages } from '../../helpers'
import { useCalendarStore, useUiStore } from '../../hooks'


export const CalendarPage = () => {

  const { openDateModal ,} = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  
  const eventStyleGetter = (  event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  
  }

  
  const onDodbleClick = ( event ) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event )
  }

  return (
    <>
    <Navbar/>
    
    <Calendar
     culture='es'
      localizer={ localizer }
      events={ events }
      defaultView={ lastView }
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)', margin: 2}}
      messages={ getMessages() }
      eventPropGetter={ eventStyleGetter }
      components={ {
        event: CalendarEvent
      }}
      onDoubleClickEvent={ onDodbleClick }
      onSelectEvent={ onSelect }
      onView={ onViewChanged }
    />

    <CalendarModal/>
    <FabAddNew/>
    <FabDelete/>

    </>
  )
}
