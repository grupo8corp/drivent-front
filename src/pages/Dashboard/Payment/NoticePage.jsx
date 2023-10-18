import styled from 'styled-components';

export default function NoticePage() {
    return (
        <Container>
            <h2>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</h2>
        </Container>
    );
}

const Container = styled.div`
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  > h2 {
    width: 388px;
    height: 46px;
    text-align: center;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 20px;
    color: #8e8e8e;
  }
`;