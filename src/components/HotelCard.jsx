import styled from "styled-components";
import { getRooms, rooms } from "../services/hotelApi";

export default function HotelCard(hotel) {
  const { userData: { token } } = useContext(UserContext);
  const {id, name, image } = hotel;
  const rooms = getRooms(token, id)
  const vacancy = rooms.reduce((accumulator, room) => accumulator + room.capacity, 0);

  const roomtypes = rooms.map((room) => {
    if (room.capacity === 1) roomtypes += 'Single,' 
    if (room.capacity === 2) roomtypes += 'Double,'
    if (room.capacity === 3) roomtypes += ' Triple'
    if (room.capacity === 4) roomtypes += 'Quadruple'
  });

  return (
    <StyledHotelCard 
      changeColor = { { selectedTicket: selectedTicketType ? {...selectedTicketType} : {...selectedTicketModality}, id: ticket.id } } 
      onClick={() => selectedTicketType ? (setSelectedTicketType(ticket), setSelectedTicketModality(null)) : setSelectedTicketModality(ticket) }
    >
      <img src={image} />
      <h1>{name}</h1>
      <div> 
        <h3>tipos de acomodação:</h3>
        <p>x</p>
      </div>
      <div> 
        <h3>vagas disponíveis:</h3>
        <p>{vacancy}</p>
      </div>
    </StyledHotelCard>
  );
};

const StyledHotelCard = styled.div`
  cursor: pointer;
  background-color: ${({ changeColor: { selectedTicket, id } }) => selectedTicket.id === id ? '#FFEED2' : '#FFFFFF' };
  border: ${({ changeColor: { selectedTicket, id } }) => selectedTicket.id === id ? 'unset' : '#CECECE 1px solid' };
  border-radius: 20px;
  min-width: 200px;
  height: 265px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: unset;
    font-size: 20px;
    font-weight: 400;
    line-height: 19px;
    color: #454545;
  }
  h3{
    margin-bottom: unset;
    font-size: 12px;
    font-weight: 400;
    line-height: 19px;
    color: #454545;
  }
  p{
    font-size: 12px;
    color: #898989;
  }
  img {
    height: 110px;
    width: 168px;
  }
`