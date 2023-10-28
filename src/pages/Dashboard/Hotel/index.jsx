import { StyledP, StyledTypography } from '..';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from "react-toastify";
import UserContext from '../../../contexts/UserContext';
import HotelCard from '../../../components/HotelCard';
import axios from 'axios';
import { Rooms } from './Rooms';
import TicketContext from '../../../contexts/TicketContext';

export default function Hotel() {
  const {
    userData: { token },
  } = useContext(UserContext);
  const { ticket, ticketProp } = useContext(TicketContext);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gethotels = await axios.get(`${import.meta.env.VITE_API_URL}/hotels`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotels(gethotels.data);
      } catch ({ response: { data: { message } } }) {
        if (message === 'No result for this search!') return console.log(message);
        toast(message);
      }
    };
    fetchData();
  }, [token]);

  if (!ticket) return(
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <StyledP variant="h6">Você ainda não possui um ticket.</StyledP>
    </>
  );
  let reserved
  ticket.status !== 'PAID' ? reserved = false : reserved = true;
  if ((reserved && !ticketProp.includesHotel) || (ticketProp.isRemote && reserved)) return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <StyledP variant="h6">Seu ticket não inclui hotel.</StyledP>
    </>
  );
  if (!reserved) return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <StyledP variant="h6">Você ainda não efetuou o pagamento para reservar um hotel.</StyledP>
    </>
  );

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
