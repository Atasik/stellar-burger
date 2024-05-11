import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import {
  getOrders,
  getIsOrdersLoading,
  fetchFeeds
} from '../../services/slices/feed';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const isLoading = useSelector(getIsOrdersLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const getFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
