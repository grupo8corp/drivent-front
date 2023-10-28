import styled from "styled-components"
import enter from "./enter-outline.svg"

export default function BigLogo() {
  return (
    <Container>
      <img src={enter}/>
    </Container>
  );
}

const Container = styled.div`
  font-size: 52px;
  font-family: 'Pacifico', cursive;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    
  }
`;