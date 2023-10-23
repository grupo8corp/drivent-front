import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserContext from './UserContext';

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const { userData: { token } } = useContext(UserContext);
  const [ticket, setTicket] = useState(null);
  const [ticketTypes, setTicketTypes] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketTypes = await axios.get(`${import.meta.env.VITE_API_URL}/tickets/types`, { headers: { Authorization: `Bearer ${token}` } });
        setTicketTypes(ticketTypes.data);
        const UserTicket = await axios.get(`${import.meta.env.VITE_API_URL}/tickets`, { headers: { Authorization: `Bearer ${token}` } });
        setTicket(UserTicket.data);
      } catch ({ response: { data: { message } } }) {
        if (message === 'No result for this search!') return console.log(message);
        toast(message);
      }
    };
    fetchData();
  }, [buttonClicked]);

  let ticketProp;
  if (ticketTypes && ticket) ticketProp = { ...ticketTypes.find(({ id }) => id === ticket.ticketTypeId), ticketId: ticket.id, ticketStatus: ticket.status };
  return (
    <TicketContext.Provider value={{ ticket, setTicket, ticketTypes, setTicketTypes, ticketProp, buttonClicked, setButtonClicked}}>
      { children }
    </TicketContext.Provider>
  );
}

export default TicketContext;