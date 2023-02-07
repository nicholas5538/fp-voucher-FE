import React from 'react';
import ServiceButtons from './ServiceButtons';
import { services } from './services';

const FoodDelivery = () => {
  return (
    <div><ServiceButtons services={services}/></div>
  )
}

export default FoodDelivery;