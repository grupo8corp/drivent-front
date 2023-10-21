import { BsPerson, BsFillPersonFill } from 'react-icons/bs';
import styled from 'styled-components';

export function Room({ name, capacity, bookingCount }) {
  const ocuppied = Array.from({ length: capacity }, (_, i) => capacity - i <= bookingCount);
  return (
    <RoomContainer disabled={bookingCount === capacity}>
      <h3>{name}</h3>
      <div>{ocuppied.map((i) => (i ? <BsFillPersonFill /> : <BsPerson />))}</div>
    </RoomContainer>
  );
}

const RoomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #cecece;
  padding: 0px 16px 0px 10px;
  background-color: ${({ disabled }) => (disabled ? '#e9e9e9' : '#ffffff')};
  h3 {
    color: #454545;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  div {
    margin-left: auto;
  }
  svg {
    flex-shrink: 0;
    height: 27px;
    width: 27px;
  }
`;
