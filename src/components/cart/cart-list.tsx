import CartItem from './cart-item';
import { mockCartData } from './mockCart';

type CartItemType = {
  name: string;
  name_description?: string;
  price: number;
  discountedPrice: number;
  quantity: number;
};

const CartList = (): JSX.Element => {
  return (
    <>
      {mockCartData.map((item: CartItemType) => (
        <CartItem
          key={item.name}
          name={item.name}
          description={
            item.name_description ? `(${item.name_description})` : null
          }
          price={item.price}
          discountedPrice={item.discountedPrice}
          quantity={item.quantity}
        />
      ))}
    </>
  );
};

export default CartList;
