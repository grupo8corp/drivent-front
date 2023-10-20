import { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
//import { toast } from "react-toastify";
import NavigationBar from '../../components/Dashboard/NavigationBar';
import DashboardLayout from '../../layouts/Dashboard';
import UserContext from '../../contexts/UserContext'
import { getHotels } from '../../services/hotelApi';
import HotelCard from '../../components/HotelCard';
import EventInfoContext from '../../contexts/EventInfoContext';

export default function Hotel() {
  const { userData: { token } } = useContext(UserContext);
  const [hotels, setHotels] = useState(undefined)
  const { eventInfo } = useContext(EventInfoContext);
  const [selectedHotel, setSelectedHotel] = useState( null );
  
  useEffect( () => {
    const gethotels = getHotels(token)
    setHotels(gethotels)
}, [token])

  return (
    <>
        <DashboardLayout background={eventInfo.backgroundImageUrl}>
        <NavigationBar />
        <Container>
          {hotels.map(hotel => (<HotelCard key={hotel.id} hotel={hotel} hotelState={ { selectedHotel, setSelectedHotel } } />))}
        </Container>
        </DashboardLayout>
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

export const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;