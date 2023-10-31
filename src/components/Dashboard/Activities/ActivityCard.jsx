import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { BiExit } from 'react-icons/bi';
import { CiCircleCheck } from 'react-icons/ci'
import { CiCircleRemove } from 'react-icons/ci'


export default function ActivityCard({ activity: { id, name, startsAt, endsAt, remainingVacancies, Participants }, setReloadActivities }){
  const { userData: { token, user } } = useContext(UserContext);
  const [participantFront, setParticipantFront] = useState(false);

  const isUserParticipating = (participantFront || Participants.some(({ userId }) => userId === user.id));
  async function postParticipant() {
    if (isUserParticipating || remainingVacancies === 0) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/activities/participant`, { activityId: id }, { headers: { Authorization: `Bearer ${token}` } });
      setReloadActivities(previous => previous + 1);
      setParticipantFront(true);
      toast('succesfully subscribed to this activity');
    } catch ({ response: { data: { message } } }) {
      if (message === 'No result for this search!') return console.log(message);
      toast(message);
    }
  };
  
  const startHour = new Date(startsAt).getHours();
  const endHour = new Date(endsAt).getHours();
  return (
    <StyledActivityCard size={endHour - startHour} remainingVacancies={remainingVacancies} isUserParticipating={isUserParticipating}>
      <div>
        <p>{name}</p>
        <span>{startHour + ':' + new Date(startsAt).getMinutes() + ' - ' + endHour + ':' + new Date(endsAt).getMinutes()}</span>
      </div >
      <div onClick={postParticipant}>
        {isUserParticipating ? <Check /> : remainingVacancies === 0 ? <Full /> : <Door/>}
        {isUserParticipating ? <p>inscrito</p> : remainingVacancies === 0 ? <p>Esgotado</p> : <p>{remainingVacancies} Vaga{remainingVacancies > 1 ? 's' : ''}</p>}
      </div>
    </StyledActivityCard>
  );
}

const StyledActivityCard = styled.div`
  cursor: pointer;
  display: flex;
  min-height: ${({ size }) => `${size*80}px`};
  border-radius: 5px;
  background-color: ${({ isUserParticipating }) => isUserParticipating ? '#D0FFDB' : '#F1F1F1'};;
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
      font-size: 12px;
      font-weight: 400;
      line-height: 11px;
      color: ${({ remainingVacancies, isUserParticipating }) => (remainingVacancies > 0 || isUserParticipating) ? '#078632' : '#CC6666'}
    }
  }
`;

const Door = styled(BiExit)`
  color: #078632;
  font-size: 25px;
`

const Check = styled(CiCircleCheck)`
  color: #078632;
  font-size: 25px;
`
const Full = styled(CiCircleRemove)`
  color: #CC6666;
  font-size: 25px;
`