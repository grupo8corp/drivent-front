import { useEffect, useState } from 'react';
import { BsPerson, BsFillPersonFill } from 'react-icons/bs';
import styled from 'styled-components';

export function Room({ id, name, capacity, bookingCount: bc, select: { selectedRoom, setSelectedRoom } }) {
  const crowded = bc === capacity;
  const [booking, setBooking] = useState(
    Array.from({ length: capacity }, (_, i) => (capacity - i <= bc ? 'busy' : 'free'))
  );
  const slot = {
    user: <BsFillPersonFill fill="#FF4791" />,
    busy: <BsFillPersonFill />,
    free: <BsPerson />,
  };
  useEffect(() => {
    if (!booking.includes('user') && selectedRoom === id) {
      booking[capacity - bc - 1] = 'user';
      setBooking([...booking]);
    }
    if (booking.includes('user') && selectedRoom !== id) {
      booking[capacity - bc - 1] = 'free';
      setBooking([...booking]);
    }

  }, [selectedRoom]);

  const selecting = () => {
    if (bc !== capacity) setSelectedRoom(id);
  };
  return (
    <RoomContainer onClick={selecting} disabled={crowded} $disabled={crowded} $selected={selectedRoom === id}>
      <h3>{name}</h3>
      <div>
        {booking.map((state, i) => (
          <span key={i}>{slot[state]}</span>
        ))}
      </div>
    </RoomContainer>
  );
}

const RoomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #cecece;
  padding: 0px 16px 0px 10px;
  background-color: ${({ $disabled, $selected }) => ($disabled ? '#e9e9e9' : $selected ? '#ffeed2' : '#ffffff')};
  h3 {
    color: #454545;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  div {
    margin-left: auto;
  }
  svg {
    flex-shrink: 0;
    height: 27px;
    width: 27px;
  }
`;
