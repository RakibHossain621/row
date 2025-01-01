/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Link from 'next/link';

interface IProps {
  dispatch: Function;
}
const UserMenu = ({ dispatch }:IProps) => (
  <>
    <li>
      <Link href="/account/user/favorites">
        <a onClick={() => dispatch('My favorites')}>My favorites</a>
      </Link>
    </li>
    <li>
      <Link href="/account/user/funds-tokens">
        <a onClick={() => dispatch('Funds / Tokens')}>Funds / Tokens</a>
      </Link>
    </li>
    <li>
      <Link href="/account/user/transaction-history">
        <a onClick={() => dispatch('Transaction History')}>
          Transaction History
        </a>
      </Link>
    </li>
    <li>
      <Link href="/account/user/payment-token-history">
        <a onClick={() => dispatch('Payment Tokens History')}>
          Payment Tokens History
        </a>
      </Link>
    </li>
    <li>
      <Link href="/account/user/orders">
        <a onClick={() => dispatch('My orders')}>My orders</a>
      </Link>
    </li>
    <li>
      <Link href="/account/user/purchased-gallery">
        <a onClick={() => dispatch('Purchased Galleries')}>
          Purchased Galleries
        </a>
      </Link>
    </li>
    <li>
      <Link href="/account/user/purchased-video">
        <a onClick={() => dispatch('Purchased Videos')}>Purchased Videos</a>
      </Link>
    </li>
    <li>
      <Link href="/account/user/purchased-product">
        <a onClick={() => dispatch('Purchased Products')}>Purchased Products</a>
      </Link>
    </li>
  </>
);

export default UserMenu;
