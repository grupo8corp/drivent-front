import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { toast } from "react-toastify";
import EventInfoContext from '../../contexts/EventInfoContext';
import NavigationBar from '../../components/Dashboard/NavigationBar';
import DashboardLayout from '../../layouts/Dashboard';
import UserContext from '../../contexts/UserContext'
import { getHotels, hotels } from '../../services/hotelApi';
import HotelCard from '../../components/HotelCard';

export default function Hotel() {
  const { userData: { token } } = useContext(UserContext);
  const [hotels, setHotels] = useState(undefined)

  useEffect( () => {
    const hotels = getHotels(token)
    setHotels(hotels)
}, [])

  return (
    <>
        <DashboardLayout background={eventInfo.backgroundImageUrl}>
        <NavigationBar />
        <Container>
          {hotels.map(hotel => (<HotelCard key={hotel.id} hotel={hotel} />))}
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