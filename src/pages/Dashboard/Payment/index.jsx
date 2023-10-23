import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import { StyledP, StyledTypography } from "..";
import axios from 'axios';
import TicketCard from '../../../components/Dashboard/Payment/TicketCard';
import { toast } from 'react-toastify';
import { renderTicketModalities, renderTicketTypes } from '../../../constants/renderTickets';
import CreditCardsPage from './CreditCardsPage/CreditCardsPage';
import DetailsCard from './CreditCardsPage/DetailsCard';
import TicketContext from '../../../contexts/TicketContext';

export default function Payment() {
  const { userData: { token } } = useContext(UserContext);
  const { ticket, setTicket, ticketTypes, ticketProp } = useContext(TicketContext);  

  const [enrollment, setEnrollment] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState({ isRemote: null });
  const [selectedTicketModality, setSelectedTicketModality] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrollment = await axios.get(`${import.meta.env.VITE_API_URL}/enrollments`, { headers: { Authorization: `Bearer ${token}` } });
        setEnrollment(enrollment.data);
      } catch ({ response: { data: { message } } }) {
        toast(message);
      }
    };
    fetchData();
  }, []);

  async function createTicket() {
    if (!ticketTypes || ticketTypes.length === 0) return;
    const { id } = ticketTypes.find(({ isRemote, includesHotel }) => {
      if (selectedTicketType.isRemote) return isRemote;
      if (!selectedTicketType.isRemote) return includesHotel === selectedTicketModality.includesHotel;
    });
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/tickets`, { ticketTypeId: id }, { headers: { Authorization: `Bearer ${token}` } });
      const ticket = await axios.get(`${import.meta.env.VITE_API_URL}/tickets`, { headers: { Authorization: `Bearer ${token}` } });
      setTicket(ticket.data);
    } catch (err) {
      toast(err.response.data.message);
    }
  };

  if (ticket) {
    return (
      <TicketsChoosed>
        <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

        <h2>Ingresso escolhido</h2>
        <DetailsCard userTicket={ticketProp} />

        <CreditCardsPage userTicket={ticketProp} />
      </TicketsChoosed>
    );
  }


  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!enrollment
        ?
        <StyledP>
          Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
        </StyledP>
        :
        <PaymentWrapper ticketTypes={ticketTypes}>
          <>
            <h5>Primeiro, escolha sua modalidade de ingresso</h5>
            <TicketTypeWrapper>
              {renderTicketTypes.map(ticketType =>
                <TicketCard key={ticketType.id} ticket={ticketType} ticketState={{ selectedTicketType, setSelectedTicketType, setSelectedTicketModality }} />
              )}
            </TicketTypeWrapper>
          </>
          {selectedTicketType.isRemote !== null && !selectedTicketType.isRemote
            &&
            <>
              <h5>Ótimo! Agora escolha sua modalidade de hospedagem</h5>
              <TicketTypeWrapper>
                {renderTicketModalities.map(modality =>
                  <TicketCard key={modality.id} ticket={modality} ticketState={{ selectedTicketModality, setSelectedTicketModality }} />
                )}
              </TicketTypeWrapper>
            </>
          }
          {selectedTicketType.isRemote !== null && (selectedTicketModality || selectedTicketType.isRemote)
            &&
            <>
              <h5>Fechado! O total ficou em R$ {selectedTicketModality !== null ? selectedTicketModality.price + selectedTicketType.price : selectedTicketType.price}. Agora é só confirmar</h5>
              <button onClick={createTicket}>{!ticketTypes ? 'CARREGANDO...' : (ticketTypes.length === 0 ? 'INGRESSOS INDISPONIVEIS' : 'RESERVAR INGRESSO')}</button>
            </>
          }
        </PaymentWrapper>
      }
    </>
  )
}

const TicketsChoosed = styled.div`
  h2 {
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 20px;
    color: #8E8E8E;
  }
`

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h5{
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    color: #8E8E8E;
    margin-bottom: 20px;
  }
  button{
    cursor: ${({ ticketTypes }) => !ticketTypes || ticketTypes.length === 0 ? 'default' : 'pointer'};
    width: 162px;
    height: 37px;
    border-radius: 4px;
    box-shadow: 0px 2px 10px 0px #00000040;
    border: none;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: #000000;
  }
`;

const TicketTypeWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;
  gap: 20px;
  height: 145px;
  margin-bottom: 40px;
`;