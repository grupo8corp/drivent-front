import styled from "styled-components";

export default function({ ticketState: { selectedTicketType, setSelectedTicketType, selectedTicketModality, setSelectedTicketModality }, ticket } ){
  return (
    <StyledTicketCard 
      changeColor = { { selectedTicket: selectedTicketType ? {...selectedTicketType} : {...selectedTicketModality}, id: ticket.id } } 
      onClick={() => selectedTicketType ? (setSelectedTicketType(ticket), setSelectedTicketModality(null)) : setSelectedTicketModality(ticket) }
    >
      <p>{ticket.name}</p>
      <p>{ticket.isModality && '+ '}R$ {ticket.price}</p>
    </StyledTicketCard>
  );
};

const StyledTicketCard = styled.div`
  cursor: pointer;
  background-color: ${({ changeColor: { selectedTicket, id } }) => selectedTicket.id === id ? '#FFEED2' : '#FFFFFF' };
  border: ${({ changeColor: { selectedTicket, id } }) => selectedTicket.id === id ? 'unset' : '#CECECE 1px solid' };
  border-radius: 20px;
  min-width: 145px;
  height: 145px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p{
    margin-bottom: unset;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: #454545;
  }
  p:nth-child(2){
    font-size: 14px;
    color: #898989;
  }
`