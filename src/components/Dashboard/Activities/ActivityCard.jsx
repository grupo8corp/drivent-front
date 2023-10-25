import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";

export default function({ activity: { id, name, startsAt, endsAt, remainingVacancies, Participants } }){
  const { userData: { user } } = useContext(UserContext);
  console.log(user.id, Participants.some(({userId}) => userId === user.id));

  const startHour = new Date(startsAt).getHours();
  const endHour = new Date(endsAt).getHours();
  return (
    <StyledActivityCard size={endHour - startHour} remainingVacancies={remainingVacancies}>
      <div>
        <p>{name}</p>
        <span>{startHour + ':' + new Date(startsAt).getMinutes() + ' - ' + endHour + ':' + new Date(endsAt).getMinutes()}</span>
      </div>
      <div>
        {/* É AQUI ONDE FICA O ICONE QUE VC VAI ALTERAR BASEADO NOS DADOS */}
        <p>{remainingVacancies === 0 ? 'Esgotado' : `${remainingVacancies} Vaga${remainingVacancies > 1 ? 's' : ''}`}</p>
      </div>
    </StyledActivityCard>
  );
};

const StyledActivityCard = styled.div`
  cursor: pointer;
  display: flex;
  min-height: ${({ size }) => `${size*80}px`};
  border-radius: 5px;
  background-color: #F1F1F1;
  position: relative;
  div:nth-child(1){
    p{
      margin-left: 10px;
      margin-top: 10px;
      align-self: flex-start;
      font-family: Roboto;
      font-size: 12px;
      font-weight: 700;
      line-height: 14px;
      color: #343434;
    }
    span{
      margin-left: 10px;
      align-self: flex-start;
      font-family: Roboto;
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      color: #343434;
    }
  }
  div:nth-child(2){
    //É AQUI ONDE FICA O ICONE QUE VC VAI ALTERAR BASEADO NOS DADOS
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 80px; 
    height: calc(100% - 18px);
    bottom: 9px;
    right: 0;
    border-left: solid 2px #CFCFCF;
    p{
      font-family: Roboto;
      font-size: 9px;
      font-weight: 400;
      line-height: 11px;
      color: ${({ remainingVacancies }) => remainingVacancies === 0 ? '#CC6666' : '#078632'}
    }
  }
`;