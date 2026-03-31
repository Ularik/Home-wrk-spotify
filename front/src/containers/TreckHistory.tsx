import List from '@mui/material/List';
import TreckHistoryItem from '../components/treckHistory/TreckHistoryItem';
import { fetchTrecksHistory } from '../components/treckHistory/store/historyThunks';
import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectTrecksHistory } from "../components/treckHistory/store/historySelectors";
import { selectUser } from '../components/users/store/usersSelectors';


const TreckHistory = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectTrecksHistory);
  const user = useAppSelector(selectUser);

  const fetchData = useCallback(async () => {
    if (user) await dispatch(fetchTrecksHistory(user.token));
  }, [dispatch, fetchTrecksHistory])

  useEffect(() => {
    fetchData();
  }, [dispatch, fetchTrecksHistory])

    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {history.map((history) => (
          <TreckHistoryItem key={history._id} history={history} />
        ))}
      </List>
    );
};

export default TreckHistory;