/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Link from 'next/link';

interface IProps {
  dispatch: (title: string) => Function;
}
const PerformerMenu = ({ dispatch }: IProps) => (
  <>
    <li>
      <Link href="/account/performer/earning">
        <a onClick={() => dispatch('Earnings')}>Earnings</a>
      </Link>
    </li>
    <li>
      <Link href="/account/performer/schedules">
        <a onClick={() => dispatch('Schedules')}>Schedules</a>
      </Link>
    </li>
    <li>
      <Link href="/account/performer/products">
        <a onClick={() => dispatch('My Products')}>My Products</a>
      </Link>
    </li>
    <li>
      <Link href="/account/performer/videos">
        <a onClick={() => dispatch('My Videos')}>My Videos</a>
      </Link>
    </li>
    <li>
      <Link href="/account/performer/photos">
        <a onClick={() => dispatch('My Photos')}>My Photos</a>
      </Link>
    </li>
    <li>
      <Link href="/account/performer/galleries">
        <a onClick={() => dispatch('Galleries')}>Galleries</a>
      </Link>
    </li>
    <li>
      <Link href="/account/performer/geo-block">
        <a onClick={() => dispatch('Blocking')}>Blocking</a>
      </Link>
    </li>
    <li>
      <Link href="/account/performer/payout-requests">
        <a onClick={() => dispatch('Payout Request')}>Payout Request</a>
      </Link>
    </li>
    <li>
      <Link href="/account/performer/orders">
        <a onClick={() => dispatch('My Orders')}>My Orders</a>
      </Link>
    </li>
  </>
);

export default PerformerMenu;
