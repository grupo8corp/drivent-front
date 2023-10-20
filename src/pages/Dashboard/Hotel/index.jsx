import { StyledTypography } from "..";
import { useContext, useEffect, useState } from 'react';
//import Typography from '@mui/material/Typography';
import styled from 'styled-components';
//import { toast } from "react-toastify";
import NavigationBar from '../../../components/Dashboard/NavigationBar';
import DashboardLayout from '../../../layouts/Dashboard';
import UserContext from '../../../contexts/UserContext'
import { getHotels } from '../../../services/hotelApi';
import HotelCard from '../../../components/HotelCard';
//import EventInfoContext from '../../../contexts/EventInfoContext';
import { toast } from "react-toastify";
import axios from "axios";


export default function Hotel() {
  const { userData: { token } } = useContext(UserContext);
  const [hotels, setHotels] = useState([  ])
  //const { eventInfo } = useContext(EventInfoContext);
  const [selectedHotel, setSelectedHotel] = useState( null );
  
  useEffect( () => {
//    const findHotels = async() => {
      const fetchData = async() => {
    try{
      console.log(token)
    const gethotels = await axios.get(`${import.meta.env.VITE_API_URL}/hotels`, { headers: { Authorization: `Bearer ${token}`, }, });
    setHotels(gethotels.data)
    console.log(getHotels.data)
  }catch({ response: { data: { message } } }){
    if (message === 'No result for this search!') return console.log(message);
    toast(message);
  }
}
  fetchData();
}, [token])

  return (
    <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <Container>
          {hotels.map(hotel => (<HotelCard key={hotel.id} hotel={hotel} hotelState={ { selectedHotel, setSelectedHotel } } />))}
        </Container>
    </>
  )
}

const Container = styled.div`
  padding: 30px;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
    padding: 20px;
  }
`;

