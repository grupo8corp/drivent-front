import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import { StyledTypography } from "..";
import axios from 'axios';
import TicketCard from '../../../components/Dashboard/Payment/TicketCard';

export default function Payment() {
  const { userData: { token } } = useContext(UserContext);

  const [enrollment, setEnrollment] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState({ isRemote: null });
  const [selectedTicketModality, setSelectedTicketModality] = useState();
  const renderTicketTypes = [
    {
      id: 1,
      name: 'Presencial',
      price: 250,
      isRemote: false,
    },
    {
      id: 2,
      name: 'Online',
      isRemote: true,
      price: 100,
    }
  ]
  const renderTicketModalities = [
    {
      id: 1,
      name: 'Com Hotel',
      price: 0,
      includesHotel: true,
      isModality: true
    },
    {
      id: 2,
      name: 'Sem Hotel',
      price: 350,
      includesHotel: false,
      isModality: true
    }
  ];
  const finalPrice = selectedTicketModality ? selectedTicketModality.price + selectedTicketType.price : selectedTicketType.price;

  useEffect(() => {
    const getTicketTypes = async() => {
      try{
        const enrollment = await axios.get(`${import.meta.env.VITE_API_URL}/enrollments`, { headers: { Authorization: `Bearer ${token}` } });
        setEnrollment(enrollment.data);
        const ticketTypes = await axios.get(`${import.meta.env.VITE_API_URL}/tickets/types`, { headers: { Authorization: `Bearer ${token}` } });
        setTicketTypes(ticketTypes.data);
        const ticket = await axios.get(`${import.meta.env.VITE_API_URL}/tickets`, { headers: { Authorization: `Bearer ${token}` } });
        setTicket(ticket.data);
      }catch({ response: { data: { message } } }){
        if (message === 'No result for this search!') return console.log(message);
        toast(message);
      }
    };
    getTicketTypes();
  }, []);

  async function createTicket(){
    const { id } = ticketTypes.find(ticketType => {
      const checkIsRemote = ticketType.isRemote === selectedTicketType.isRemote;
      if (selectedTicketModality) return checkIsRemote && ticketType.includesHotel === selectedTicketModality.includesHotel
      return checkIsRemote;
    })
    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/tickets`, { ticketTypeId: id }, { headers: { Authorization: `Bearer ${token}` } });
      const ticket = await axios.get(`${import.meta.env.VITE_API_URL}/tickets`, { headers: { Authorization: `Bearer ${token}` } });
      setTicket(ticket.data);
    }catch(err){
      toast(err.response.data.message);
    }
  };

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {ticket
        ?
          <StyledP>
            
            IMPLEMENTAÇAO DO PAGAMENTO
            
          </StyledP>
        :
      !enrollment 
        ?
          <StyledP>
            Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
          </StyledP>
        :
          <PaymentWrapper>
            <>
              <h5>Primeiro, escolha sua modalidade de ingresso</h5>
              <TicketTypeWrapper>
                {renderTicketTypes.map(ticketType => 
                  <TicketCard key={ticketType.id} ticket={ticketType} ticketState = { { selectedTicketType, setSelectedTicketType, setSelectedTicketModality } }/>
                )}
              </TicketTypeWrapper>
            </>
            {selectedTicketType.isRemote !== null && !selectedTicketType.isRemote
              &&
              <>
                <h5>Ótimo! Agora escolha sua modalidade de hospedagem</h5>
                <TicketTypeWrapper>
                  {renderTicketModalities.map(modality => 
                    <TicketCard key={modality.id} ticket={modality} ticketState = { { selectedTicketModality, setSelectedTicketModality } }/>
                  )}
                </TicketTypeWrapper>
              </>
            }
            {selectedTicketType.isRemote !== null && (selectedTicketModality || selectedTicketType.isRemote)
              &&
                <>
                  <h5>Fechado! O total ficou em R$ {finalPrice}. Agora é só confirmar</h5>
                  <button onClick={createTicket}>RESERVAR INGRESSO</button>
                </>
            }
          </PaymentWrapper>
        }
    </>
  )
}

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
    cursor: pointer;
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

const StyledP = styled.p`
  @media (max-width: 600px) {
    width: 75%;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
`;