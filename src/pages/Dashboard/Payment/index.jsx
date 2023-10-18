import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import NoticePage from './NoticePage';
import TicketTypes from './SelectTicketTypes';

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
  > h1 {
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 34px;
    line-height: 40px;
    margin-bottom: 40px;
  }
`;