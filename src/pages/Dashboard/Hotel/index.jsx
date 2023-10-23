import { StyledTypography } from '..';
import { useContext, useEffect, useState } from 'react';
//import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { toast } from "react-toastify";
import UserContext from '../../../contexts/UserContext';
import { getHotels } from '../../../services/hotelApi';
import HotelCard from '../../../components/HotelCard';
//import EventInfoContext from '../../../contexts/EventInfoContext';
//import { toast } from 'react-toastify';
import axios from 'axios';
import { Rooms } from './Rooms';
import TicketContext from '../../../contexts/TicketContext';

export default function Hotel() {
  const {
    userData: { token },
  } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  //const {ticket} = useContext(TicketContext);
  const [ticket, setTicket] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  let reserve;
  let remote;


  useEffect(() => {
  //    const findHotels = async() => {

    const fetchData = async () => {
      try {
        console.log(token);
        const getTickets = await axios.get(`${import.meta.env.VITE_API_URL}/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTicket(getTickets.data);
        const gethotels = await axios.get(`${import.meta.env.VITE_API_URL}/hotels`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotels(gethotels.data);
      } catch ({
        response: {
          data: { message },
        },
      }) {
        if (message === 'No result for this search!') return console.log(message);
        toast(message);
      }
    };
    fetchData();
    console.log(hotels);
  }, [token]);

  console.log(ticket)

  if (!ticket) return(<>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <Container><StyledTypography variant="h6">Você ainda não possui um ticket.</StyledTypography></Container></>);

  ticket.status !== 'PAID' ? reserve = false : reserve = true;
  ticket.ticketTypeId !== 1 ? remote = true : remote = false;

  if (reserve && ticket.ticketTypeId === 2) return(<>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <Container><StyledTypography variant="h6">Seu ticket não inclui hotel.</StyledTypography></Container></>);

  if (!reserve) return(<>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <Container><StyledTypography variant="h6">Você ainda não efetuou o pagamento para reservar um hotel.</StyledTypography></Container></>);

  if (reserve && ticket.ticketTypeId === 2) return(<>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <Container><StyledTypography variant="h6">Seu ticket não inclui hotel.</StyledTypography></Container></>);
  
  if (remote && reserve) return(<>
  <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
  <Container><StyledTypography variant="h6">O seu ticket não inclui hotel.</StyledTypography></Container></>);

  return (
    
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      
      <Container>
      
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            rooms={hotel.Rooms}
            hotelState={{ selectedHotel, setSelectedHotel }}
          />
        ))} 
      </Container>
      <div>
        {selectedHotel && <Rooms hotelId={selectedHotel} />}
        </div>
    </>
  );
}

const Container = styled.div`
  padding: 30px;
  width: 100%;
  display: flex;
  overflow-y: auto;
  overflow: hidden;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
    padding: 20px;
  }
`;
