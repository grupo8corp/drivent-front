import styled from "styled-components"
import checkmarksvg from "./checkmark-circle-outline.svg"

export default function Checkmark() {
  return (
    <Container>
      <img src={checkmarksvg}/>
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