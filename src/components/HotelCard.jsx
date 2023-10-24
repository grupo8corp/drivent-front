import styled from 'styled-components';

export default function HotelCard({ hotel, hotelState, room }) {
  const { id, name, image, type, remainingVacancies } = hotel;

  return (
    <StyledHotelCard onClick={() => hotelState.setSelectedHotel(id)} IsSelected={hotelState.selectedHotel == id}>
      <img src={image} />
      <h1>{name}</h1>
      <div>
        <h3>tipos de acomodação:</h3>
        <p>{type}</p>
      </div>
      <div>
        <h3>vagas disponíveis:</h3>
        <p>{remainingVacancies || 0}</p>
      </div>
    </StyledHotelCard>
  );
}

const StyledHotelCard = styled.div`
  margin-right: 15px;
  cursor: pointer;
  background-color: ${({ IsSelected }) => (IsSelected ? '#FFEED2' : '#EBEBEB')};
  border: #cecece 1px solid;
  border-radius: 20px;
  width: 200px;
  height: 265px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-top: 10px;
    margin-bottom: unset;
    font-size: 20px;
    font-weight: 400;
    line-height: 19px;
    color: #454545;
  }
  h3 {
    margin-top: 7px;
    margin-bottom: unset;
    font-size: 12px;
    font-weight: 400;
    line-height: 19px;
    color: #454545;
  }
  p {
    text-align: center;
    margin-top: 3px;
    font-size: 12px;
    color: #898989;
  }
  img {
    height: 110px;
    width: 168px;
  }
`;
