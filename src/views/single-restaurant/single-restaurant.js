import { Button, Divider, Rate, Table } from 'antd';
import { orderList } from 'atoms/order-list.atom';
import axios from 'axios';
import { ViewWrapper } from 'components/common';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import {
  RestaurantData,
  RestaurantHead,
  RestaurantImage,
} from './single-restaurant.styled';

const APP_URL = process.env.APP_URL || "localhost";
const APP_PORT = process.env.PORT || 3000;

const getRestaurant = async (id) => {
  const { data } = await axios.get(
    `http://relicrestaurants.uempfel.de/api/restaurant/${id}`
  );
  return data;
};

const SingleRestaurant = () => {
  const { id } = useParams();

  const [orderListItems, setOrderList] = useRecoilState(orderList);

  const { data } = useQuery('restaurant', () => getRestaurant(id));

  const handleAddToCart = (clickedRow) => {
    const isItemInCart = orderListItems.find(
      (item) => item.name === clickedRow.name
    );

    if (isItemInCart) {
      const newData = orderListItems.map((item) =>
        item.name === clickedRow.name
          ? { ...item, count: item.count + 1, restaurant: data?.name }
          : item
      );
      setOrderList(newData);
    } else {
      setOrderList([
        ...orderListItems,
        { name: clickedRow.name, price: clickedRow.price, count: 1, restaurant: data?.name },

      ]);
    }
  };

  const columns = [
    {title: 'Restaurant', dataIndex: 'restaurant', key: 'restaurant'},
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Add to cart',
      render: (clickedRow) => (
        <Button id="menuItem" onClick={() => handleAddToCart(clickedRow)}>
          Add
        </Button>
      ),
    },
  ];

  return (
    <ViewWrapper>
      <RestaurantHead>
        <RestaurantImage
          alt={data?.name}
          src={require(`./../../assets/images/restaurants/${id}.jpg`)}
        />
        <RestaurantData>
          <h1>{data?.name}</h1>
          <Rate value={data?.rating} disabled />
          <p>{data?.description}</p>
          <p>You can find us at {data?.location}</p>
        </RestaurantData>
      </RestaurantHead>
      <Divider />
      <h4>Menu</h4>
      <Table
        dataSource={data?.menuItems}
        columns={columns}
        style={{ width: '100%' }}
      />
    </ViewWrapper>
  );
};

export default SingleRestaurant;
