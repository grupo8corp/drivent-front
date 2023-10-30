import { useContext, useEffect, useState } from "react";
import { StyledP, StyledTypography } from "..";
import TicketContext from "../../../contexts/TicketContext";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../../contexts/UserContext";
import styled from "styled-components";
import DayCard from "../../../components/Dashboard/Activities/DayCard";
import ActivityCard from "../../../components/Dashboard/Activities/ActivityCard";

export default function Activities() {
  const { ticket, ticketProp } = useContext(TicketContext);
  const { userData: { token } } = useContext(UserContext);
  const [activities, setActivities] = useState(null);
  const [renderDays, setRenderDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState({ id: null });
  const [reloadActivities, setReloadActivities] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/activities`, { headers: { Authorization: `Bearer ${token}` } });
        const datesArray = [];
        data.forEach(({ startsAt, id }) => {
          const weekDay = new Date(startsAt).toLocaleDateString('pt-BR', { weekday: 'long' }).replace('-feira', '');
          const monthDay = new Date(startsAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
          const fullDay = `${weekDay}, ${monthDay}`;
          if (!datesArray.some(({ fullDay: existingFullDay }) => existingFullDay === fullDay)) {
            datesArray.push({ monthDay, fullDay, id, sortDate: new Date(startsAt) });
          }
        });
        setActivities(data);
        setRenderDays([...datesArray.sort((a, b) => a.sortDate - b.sortDate)]);
      } catch ({ response: { data: { message } } }){
        toast(message);
      }
    };
    fetchData();
  }, [token, reloadActivities]);

  if (!ticket) return(
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <StyledP variant="h6">Você ainda não possui um ticket.</StyledP>
    </>
  );
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

      {(ticketProp.ticketStatus !== 'PAID') 
      ?
        <StyledP>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</StyledP>
      : (ticketProp.isRemote) 
        ?
          <StyledP>Como você escolheu a modalidade online, não precisa escolher atividades.</StyledP>
        :
          <ActivitiesContainer>
            {selectedDay.id === null && <h5>Primeiro, filtre pelo dia do evento:</h5>}
            <DaysWrapper>
              {renderDays.map((day) => <DayCard 
                key={day.id} 
                day={day} 
                dayState={{ selectedDay, setSelectedDay }} 
                activities={activities.filter(({ startsAt }) => day.monthDay === new Date(startsAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }))}
              />)}
            </DaysWrapper>
            {selectedDay.id !== null
            &&
              <ActivitiesWrapper>
                <div>
                  <h6>Auditório Principal</h6>
                  <ActivitiesUl>
                    {selectedDay.activities
                      .filter(({ auditory }) => auditory === 'MAIN')
                      .map(activity => <ActivityCard key={activity.id} activity={activity} setReloadActivities={setReloadActivities}/>)
                    }
                  </ActivitiesUl>
                </div>
                <div>
                  <h6>Auditório Lateral</h6>
                  <ActivitiesUl>
                    {selectedDay.activities
                      .filter(({ auditory }) => auditory === 'LATERAL')
                      .map(activity => <ActivityCard key={activity.id} activity={activity} setReloadActivities={setReloadActivities}/>)
                    }
                  </ActivitiesUl>
                </div>
                <div>
                  <h6>Sala de Workshop</h6>
                  <ActivitiesUl>
                    {selectedDay.activities
                      .filter(({ auditory }) => auditory === 'WORKSHOP')
                      .map(activity => <ActivityCard key={activity.id} activity={activity} setReloadActivities={setReloadActivities}/>)
                    }
                  </ActivitiesUl>
                </div>
              </ActivitiesWrapper>
            }
          </ActivitiesContainer>
      }
    </>
  )
};



const ActivitiesContainer = styled.div`
  padding-top: 13px;
  h5{
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    color: #8E8E8E;
    margin-bottom: 20px;
  }
`;

const DaysWrapper = styled.div`
  display: flex;
  gap: 17px;
`;

const ActivitiesWrapper = styled.div`
  padding-top: 62px;
  display: flex;
  justify-content: center;
  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    h6{
      text-align: center;
      width: 150px;
      font-family: Roboto;
      font-size: 17px;
      font-weight: 400;
      color: #7B7B7B;
      margin-bottom: 12px;
    }
  }
`;

const ActivitiesUl = styled.ul`
  padding: 10px;
  border: 1px solid #D7D7D7;
  overflow-y: auto;
  max-height: 300px;
  min-height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;