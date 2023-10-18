import { useState } from 'react';
import styled from 'styled-components';

export default function SelectBox({ text, textPrice, setSelected, setTicket, ticketType, setTicketType, array }) {
    const option = text === 'Online' ? false : true;
    const [checkBox, setCheckBox] = useState(false);

    const handleClick = () => {
        let ticket = array;

        if (text === 'Presencial' || text === 'Online') {
            if (text === 'Presencial' && (ticket[0] && ticket[1]) === false) {
                ticket = [true, false, ticket[2], ticket[3]];
                setTicketType(ticket);
            } else if (text === 'Online' && (ticket[0] && ticket[1]) === false) {
                ticket = [false, true, false, false];
                setTicketType(ticket);
            }
            if (ticket[0] === true) {
                ticket = [false, true, ticket[2], ticket[3]];
                setTicketType(ticket);
            } else {
                ticket = [true, false, ticket[2], ticket[3]];
                setTicketType(ticket);
            }
        }

        if (text === 'Sem Hotel' || text === 'Com Hotel') {
            if (text === 'Com Hotel' && (ticket[2] && ticket[3]) === false) {
                ticket = [ticket[0], ticket[1], true, false];
                setTicketType(ticket);
            } else if (text === 'Sem Hotel' && (ticket[2] && ticket[3]) === false) {
                ticket = [ticket[0], ticket[1], false, true];
                setTicketType(ticket);
            }
        }

        setSelected({ option });
        setCheckBox(!checkBox);
        if (text === 'Online' || text === 'Com Hotel' || text === 'Sem Hotel') {
            setTicket(true);
        } else {
            setTicket(false);
        }
    };

    return (
        <Container checkBox={ticketType} onClick={handleClick}>
            <h2>{text}</h2>
            <h3>{textPrice}</h3>
        </Container>
    );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 145px;
  height: 145px;
  background-color: ${(props) => (props.checkBox ? '#FFEED2' : '#ffffff')};
  border: 1px solid #cecece;
  border-radius: 20px;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-style: normal;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  h2 {
    font-size: 16px;
    line-height: 19px;
    text-align: center;

    color: #454545;
  }
  h3 {
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    color: #898989;
  }
`;