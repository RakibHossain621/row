import { IPaymentCard } from '@interfaces/payment';
import { paymentService } from '@services/payment.service';
import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';

interface P {
  onSelect: Function;
  defaultValue?: string;
}

function icon(brand: string) {
  switch (brand.toLowerCase()) {
    case 'visa':
      return <img src="/static/visa-ico.png" alt="visa" height="25px" />;
    case 'mastercard':
      return (
        <img src="/static/mastercard-ico.png" alt="mastercard" height="25px" />
      );
    case 'discover':
      return (
        <img src="/static/discover-ico.png" alt="discover" height="25px" />
      );
    case 'amex':
      return (
        <img
          src="/static/american-express-ico.png"
          alt="american-express"
          height="25px"
        />
      );
    case 'hipercard':
      return (
        <img src="/static/hipercard-ico.png" alt="hipercard" height="25px" />
      );
    case 'elo':
      return <img src="/static/elo-ico.png" alt="elo" height="25px" />;
    default:
      return <span>{brand}</span>;
  }
}

export function CardSelector({ onSelect, defaultValue }: P) {
  const [cards, setCards] = useState<IPaymentCard[]>([]);
  const paymentGateway = useSelector((state: any) => state.settings.paymentGateway);

  const getCards = async () => {
    const resp = await paymentService.getCards({
      paymentGateway,
      limit: 10
    });
    setCards(resp?.data?.data || []);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <Select defaultValue={defaultValue} placeholder="Select a payment card" onChange={(val) => onSelect(val)} style={{ width: '100%', marginBottom: 10 }}>
      {cards.map((c) => (
        <Select.Option key={c._id} value={c.token}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <span>{icon(c.brand)}</span>
            <span>{`**** ${c.last4Digits}`}</span>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
}

CardSelector.defaultProps = {
  defaultValue: ''
};
