import { StyledP, StyledTypography } from '..';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import { Rooms } from './Rooms';
import TicketContext from '../../../contexts/TicketContext';
import { getBookings, getHotels, getRooms, putBookings } from '../../../services/hotelApi.js';
import HotelCard, { StyledHotelCard } from '../../../components/Dashboard/Hotel/HotelCard.jsx';

export default function Hotel() {
  const {
    userData: { token },
  } = useContext(UserContext);
  const { ticket, ticketProp } = useContext(TicketContext);
  const [hotels, setHotels] = useState([]);
  const [booking, setBooking] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [update, setUpdate] = useState(null);
  const [change, setChange] = useState(null);
  const type = { 1: 'Single', 2: 'Double', 3: 'Triple', 4: 'Quadruple' };
  const changeRoom = () => {
    setSelectedRoom(booking.Room.id);
    setChange(!change);
    if (change) {
      putBookings(token, booking.id, selectedRoom)
        .then(() => {
          setUpdate(!update);
          toast('Quarto trocado com sucesso!');
        })
        .catch((err) => console.log(err));
    }
  };
  const fetchData = async () => {
    try {
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

  useEffect(() => {
    getBookings(token)
      .then((data) => {
        setBooking(data);
        if (data.length === 0) fetchData();
      })
      .catch((err) => {
        if (err.response.data.message !== 'No result for this search!') console.log(err);
        fetchData();
      });
  }, [token, update]);

  useEffect(() => {
    setSelectedRoom(null);
  }, [selectedHotel]);

  if (booking !== null) {
    console.log(booking);
    return (
      <Container>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <h5>Você já escolheu seu quarto:</h5>
        <div>
          <StyledHotelCard $selected={true}>
            <img src={booking.Room.Hotel.image} />
            <h1>{booking.Room.Hotel.name}</h1>
            <div>
              <h3>Quarto reservado:</h3>
              <p>
                {booking.Room?.name} ({type[booking.Room.capacity]})
              </p>
            </div>
            <div>
              <h3>Pessoas no seu quarto</h3>
              <p>Você e mais {Number(booking.Room?.capacity) - 1}</p>
            </div>
          </StyledHotelCard>
        </div>
        <div>
          {change && (
            <Rooms hotelId={booking.Room.hotelId} selected={{ selectedRoom, setSelectedRoom }} change={true} />
          )}
        </div>
        <button onClick={changeRoom}>TROCAR DE QUARTO</button>
      </Container>
    );
  }
  if (!ticket)
    return (
      <Container>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <StyledP variant="h6">Você ainda não possui um ticket.</StyledP>
      </Container>
    );
  let reserved;
  ticket.status !== 'PAID' ? (reserved = false) : (reserved = true);
  if ((reserved && !ticketProp.includesHotel) || (ticketProp.isRemote && reserved))
    return (
      <Container>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <StyledP variant="h6">Seu ticket não inclui hotel.</StyledP>
      </Container>
    );
  if (!reserved)
    return (
      <Container>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <StyledP variant="h6">Você ainda não efetuou o pagamento para reservar um hotel.</StyledP>
      </Container>
    );

  return (
    <Container>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {<h5>Primeiro, escolha seu hotel</h5>}
      <div>
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            rooms={hotel.Rooms}
            hotelState={{ selectedHotel, setSelectedHotel }}
          />
        ))}
      </div>
      <div>
        {selectedHotel && (
          <Rooms
            update={update}
            setUpdate={setUpdate}
            hotelId={selectedHotel}
            selected={{ selectedRoom, setSelectedRoom }}
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 0px 80px;
  overflow: hidden;
  > h5 {
    margin-top: 36px;
    color: #8e8e8e;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  > div {
    margin-top: 14px;
    width: 100%;
    display: flex;
    /* overflow-y: auto; */

    @media (max-width: 600px) {
      padding: 20px;
    }
  }
  > button {
    margin-top: 46px;
    border: none;
    width: 182px;
    height: 37px;
    flex-shrink: 0;
    border-radius: 4px;
    background: #e0e0e0;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    color: #000;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 37px;
  }
`;
