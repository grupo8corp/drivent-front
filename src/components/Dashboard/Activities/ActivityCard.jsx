import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { BiExit } from 'react-icons/bi';
import { CiCircleCheck } from 'react-icons/ci'
import { CiCircleRemove } from 'react-icons/ci'


export default function ActivityCard({ activity: { id, name, startsAt, endsAt, remainingVacancies, Participants }, setReloadActivities }){
  const { userData: { user }, userData: { token } } = useContext(UserContext);

  async function postParticipant(activityId, token) {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/activities/participant`, {activityId}, {headers: { Authorization: `Bearer ${token}` }});
      setReloadActivities(previous => previous + 1);
      toast('succesfully subscribed to this activity');
    } catch ({ response: { data: { message } } }) {
      if (message === 'No result for this search!') return console.log(message);
      toast(message);
    }
  };
  
  const isUserParticipating = Participants.some(({ userId }) => userId === user.id);
  const startHour = new Date(startsAt).getHours();
  const endHour = new Date(endsAt).getHours();
  return (
    <StyledActivityCard size={endHour - startHour} remainingVacancies={remainingVacancies} color={isUserParticipating ?'#D0FFDB':'#F1F1F1'}>
      <div>
        <p>{name}</p>
        <span>{startHour + ':' + new Date(startsAt).getMinutes() + ' - ' + endHour + ':' + new Date(endsAt).getMinutes()}</span>
      </div >
      <div onClick={remainingVacancies !== 0 ? () => postParticipant(id, token) : ''}>
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
  background-color: ${props => props.color};;
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
      color: ${({ remainingVacancies }) => remainingVacancies === 0 ? '#CC6666' : '#078632'}
    }
  }
`;

export const Door = styled(BiExit)`
  color: #078632;
  font-size: 25px;
`

export const Check = styled(CiCircleCheck)`
  color: #078632;
  font-size: 25px;
`
export const Full = styled(CiCircleRemove)`
  color: #CC6666;
  font-size: 25px;
`