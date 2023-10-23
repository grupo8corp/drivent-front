import styled from 'styled-components';

export default function DetailsCard({ userTicket: { isRemote, includesHotel, price } }) {
  return (
    <Container>
      <div>
        <p>{isRemote ? 'Online' : 'Presencial'} + {includesHotel ? 'Com Hotel' : 'Sem Hotel'}</p>
        <span>{`R$ ${price}`}</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 290px;
  height: 108px;
  background: #ffeed2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 20px;

  > div {
    text-align: center;

  > p {
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 16px;
    line-height: 19px;
    color: #454545;
    margin-bottom: 8px;
  }

  > span {
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 14px;
    line-height: 16px;
    color: #898989;
  }
}
`;