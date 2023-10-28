import styled from "styled-components"
import close from "./close-circle-outline.svg"

export default function BigLogo() {
  return (
    <Container>
      <img src={close}/>
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