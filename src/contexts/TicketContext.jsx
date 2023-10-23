import { createContext, useState } from 'react';

//import Splash from '../components/Splash';

const TicketContext = createContext();
export default TicketContext;

export function TicketProvider({ children }) {
    const [ticket, setTicket] = useState(null);
  
  
    return (
      <TicketContext.Provider value={{ ticket, setTicket}}>
        { children }
      </TicketContext.Provider>
    );
  }