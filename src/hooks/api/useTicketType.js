import * as ticketApi from '../../services/ticketApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useTicketTypes() {
    const token = useToken();

    const { data: types } = useAsync(() => ticketApi.getTicketsTypes(token));
    return { types };
}