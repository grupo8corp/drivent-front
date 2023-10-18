import styled from 'styled-components';
import SelectBox from './SelectBox';
import { useEffect, useState } from 'react';
import api from '../../../services/api';
import useToken from '../../../hooks/useToken';
import CreditCardsPage from './CreditCardsPage/CreditCardsPage';

export default function TicketTypes() {
    const [selected, setSelected] = useState(false);
    const [ticket, setTicket] = useState(false);
    const [ticketType, setTicketType] = useState([false, false, false, false]);
    const [ticketTypeId, setTicketTypeId] = useState();
    const array = [...ticketType];
    const token = useToken();
    const [isBooked, setIsBooked] = useState(false);
    const [userTicket, setUserTicket] = useState([]);

    useEffect(async () => {
        const ticketTypes = await api.get('/tickets/types', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const types = ticketTypes.data;
        setTicketTypeId(types);
    }, []);

    function checkTicketTypeId() {
        if (JSON.stringify(ticketType) === JSON.stringify([false, true, false, true])) return ticketTypeId[0].id;
        if (JSON.stringify(ticketType) === JSON.stringify([false, true, true, false])) return ticketTypeId[1].id;
        if (JSON.stringify(ticketType) === JSON.stringify([true, false, false, false])) return ticketTypeId[2].id;
    }

    const ticketId = checkTicketTypeId();

    function checkTicketTypePrice() {
        if (JSON.stringify(ticketType) === JSON.stringify([false, true, false, true])) return ticketTypeId[0].price;
        if (JSON.stringify(ticketType) === JSON.stringify([false, true, true, false])) return ticketTypeId[1].price;
        if (JSON.stringify(ticketType) === JSON.stringify([true, false, false, false])) return ticketTypeId[2].price;
    }

    const ticketPrice = checkTicketTypePrice();

    async function postTicket() {
        const body = {
            ticketTypeId: ticketId,
        };
        const response = await api.post('/tickets', body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUserTicket(response.data);
        setIsBooked(true);
    }
    if (!isBooked) {
        return (
            <>
                <Container>
                    <h1>Primeiro, escolha sua modalidade de ingresso</h1>
                    <Boxes>
                        <SelectBox
                            setSelected={setSelected}
                            text={'Presencial'}
                            textPrice={'R$250'}
                            setTicket={setTicket}
                            ticketType={ticketType[1]}
                            setTicketType={setTicketType}
                            array={array}
                        />
                        <SelectBox
                            setSelected={setSelected}
                            text={'Online'}
                            textPrice={'R$100'}
                            setTicket={setTicket}
                            ticketType={ticketType[0]}
                            setTicketType={setTicketType}
                            array={array}
                        />
                    </Boxes>
                </Container>
                {selected.option && (
                    <Container>
                        <h1>Ótimo! Agora escolha sua modalidade de hospedagem</h1>
                        <Boxes>
                            <SelectBox
                                setSelected={setSelected}
                                text={'Sem Hotel'}
                                textPrice={'R$0'}
                                onClick={() => setTicket(true)}
                                setTicket={setTicket}
                                ticketType={ticketType[3]}
                                setTicketType={setTicketType}
                                array={array}
                            />
                            <SelectBox
                                setSelected={setSelected}
                                text={'Com Hotel'}
                                textPrice={'R$350'}
                                onClick={() => setTicket(true)}
                                setTicket={setTicket}
                                ticketType={ticketType[2]}
                                setTicketType={setTicketType}
                                array={array}
                            />
                        </Boxes>
                    </Container>
                )}

                {ticket && (
                    <Book>
                        <h1>
                            Fechado! O total ficou em R$ <strong>{ticketPrice}</strong>. Agora é só confirmar:
                        </h1>
                        <button onClick={postTicket}>RESERVAR INGRESSO</button>
                    </Book>
                )}
            </>
        );
    }
    return <CreditCardsPage userTicket={userTicket} />;
}

const Container = styled.div`
  height: 230px;
  display: flex;
  flex-direction: column;
  display: flex;
  text-align: center;
  justify-content: center;
  > h1 {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    font-size: 34px;
    font-size: 20px;
    line-height: 23px;

    color: #8e8e8e;
  }
`;

const Boxes = styled.div`
  margin-bottom: 15px;
  display: flex;
  gap: 20px;
`;

const Book = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  h1 {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
  }
  button {
    width: 162px;
    height: 37px;
    border: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    margin-bottom: 20px;

    color: #000000;

    background: #e0e0e0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    cursor: pointer;
  }
`;