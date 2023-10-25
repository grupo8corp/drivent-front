import { useContext, useEffect, useState } from 'react';
import { getRooms } from '../../../services/hotelApi.js';
import UserContext from '../../../contexts/UserContext.jsx';
import { Room } from '../../../components/Dashboard/Hotel/RoomCard.jsx';
import styled from 'styled-components';

export function Rooms({ hotelId }) {
  const [rooms, setRooms] = useState([]);
  const {
    userData: { token },
  } = useContext(UserContext);

  useEffect(() => {
    getRooms(token, hotelId).then(({ Rooms }) => {
      setRooms(Rooms);
    });
  }, [token, hotelId]);
  return (
    <RoomsContainer>
      <h2>Ótima pedida! Agora escolha seu quarto:</h2>
      <div>
        {rooms.map(({ id, name, capacity, bookingCount }) => (
          <Room key={id} name={name} capacity={capacity} bookingCount={bookingCount} />
        ))}
      </div>
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
    gap: 17px;
    padding: 30px;
  }
`;
