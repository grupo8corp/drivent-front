import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import EventInfoContext from '../../contexts/EventInfoContext';

import NavigationBar from '../../components/Dashboard/NavigationBar';

import DashboardLayout from '../../layouts/Dashboard';

export default function Dashboard() {
  const { eventInfo } = useContext(EventInfoContext);

  return (
    <DashboardLayout background={eventInfo.backgroundImageUrl}>
      <NavigationBar />

      <Container>
        <Outlet />
      </Container>
    </DashboardLayout>
  );
}

const Container = styled.div`
  padding: 35px;
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

export const StyledP = styled.p`
  @media (max-width: 600px) {
    width: 75%;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
`;
