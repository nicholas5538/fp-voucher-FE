import CartItem from './cart-item';
import { mockCartData } from './mockCart';

type CartItemType = {
  name: string;
  name_description?: string;
  price: number;
  discountedPrice: number;
  quantity: number;
};

const CartList = () => {
  return (
    <>
      {mockCartData.map(
        ({
          name,
          name_description,
          price,
          discountedPrice,
          quantity,
        }: CartItemType) => (
          <CartItem
            key={name}
            name={name}
            description={name_description ?? null}
            price={price}
            discountedPrice={discountedPrice}
            quantity={quantity}
          />
        ),
      )}
    </>
  );
};

export default CartList;
