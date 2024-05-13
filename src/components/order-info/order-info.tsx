import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { getIngredients } from '../../services/slices/ingredients';
import { getOrder, getOrderData } from '../../services/slices/order';
import { useSelector, useDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number: orderIdx } = useParams<{ number: string }>();
  const order = useSelector(getOrder);
  const ingredients = useSelector(getIngredients);

  useEffect(() => {
    dispatch(getOrderData(parseInt(orderIdx!)));
  }, [dispatch, order, orderIdx]);

  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) return null;

    const date = new Date(order.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [order, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
