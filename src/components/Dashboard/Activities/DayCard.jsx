import styled from "styled-components";

export default function DayCard({ activities, dayState: { selectedDay, setSelectedDay }, day: { fullDay, id } }) {
  return (
    <StyledDayCard
      changeColor={{ selectedDay, id }}
      onClick={() => setSelectedDay({ activities: [...activities], id })
    }
    >
      <p>{fullDay}</p>
    </StyledDayCard>
  );
}

const StyledDayCard = styled.div`
  cursor: pointer;
  width: 131px;
  height: 37px;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ changeColor: { selectedDay, id } }) =>
    selectedDay.id === id ? "#FFD37D" : "#E0E0E0"};
  p {
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: black;
    text-transform: capitalize;
  }
`;
