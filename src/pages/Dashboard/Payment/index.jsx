import styled from "styled-components";
import { StyledTypography } from "..";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../../contexts/UserContext";
import { toast } from "react-toastify";

export default function Payment() {

  const { userData: { token } } = useContext(UserContext);

  const [ticketTypes, setTicketTypes] = useState([]);

  useEffect(() => {
    const getTicketTypes = async() => {
      try{
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tickets/types`, { headers: { Authorization: `Bearer ${token}` } });
        setTicketTypes(data);
      }catch(err){
        toast(err.response.data.message);
      }
    };
    getTicketTypes();
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <PaymentWrapper>
        <>
          <p>Primeiro, escolha sua modalidade de ingresso</p>
          <TicketTypeWrapper>
            {ticketTypes.map(({ name, price }) => 
              <div>
                <p>{name}</p>
                <p>{price}</p>
              </div>
            )}
          </TicketTypeWrapper>
        </>
        <>
          <p>Ótimo! Agora escolha sua modalidade de hospedagem</p>
          <TicketTypeWrapper>
            <div>
              <p>nome</p>
              <p>preço</p>
            </div>
            <div>
              <p>nome</p>
              <p>preço</p>
            </div>
          </TicketTypeWrapper>
        </>
        <>
          <p>Fechado! O total ficou em R$ X. Agora é só confirmar:</p>
          <button>RESERVAR INGRESSO</button>
        </>
      </PaymentWrapper>
    </>
  )
}

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  p{
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
  div{
    cursor: pointer;
    border: #CECECE 1px solid;
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
  }
`;