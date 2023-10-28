import { useContext, useEffect, useState } from 'react';
import { getBookings, getRooms, postBookings } from '../../../services/hotelApi.js';
import UserContext from '../../../contexts/UserContext.jsx';
import { Room } from '../../../components/Dashboard/Hotel/RoomCard.jsx';
import styled from 'styled-components';
import { toast } from 'react-toastify';

export function Rooms({ hotelId, update, setUpdate, selected: { selectedRoom, setSelectedRoom }, change }) {
  const [rooms, setRooms] = useState([]);
  const {
    userData: { token },
  } = useContext(UserContext);

  useEffect(() => {
    getRooms(token, hotelId).then(({ Rooms }) => {
      console.log(Rooms);
      setRooms(Rooms.map(m => selectedRoom === m.id ? { ...m, bookingCount: m.bookingCount - 1 } : m));
    });
  }, [token, hotelId, update]);
  const booking = () => {
    postBookings(token, selectedRoom).then(() => {
      toast('Quarto escolhido com sucesso!');
      setUpdate(!update);
    });
  };
  console.log(rooms, 'Rooms');

  return (
    <RoomsContainer>
      <h2>Ótima pedida! Agora {change ? 'troque' : 'escolha'} seu quarto:</h2>
      <div>
        {rooms.map(({ id, name, capacity, bookingCount: bc }) => (
          <Room
            key={id}
            id={id}
            name={name}
            capacity={capacity}
            bookingCount={bc}
            select={{ selectedRoom, setSelectedRoom }}
          />
        ))}
      </div>
      {!change && selectedRoom && <button onClick={booking}>RESERVAR QUARTO</button>}
    </RoomsContainer>
  );
}

const RoomsContainer = styled.div`
  > h2 {
    color: #8e8e8e;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 33px 0px;
  }
  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 17px;
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
