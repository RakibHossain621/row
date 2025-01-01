import { createContext, useState } from 'react';

export const ConfirmContext = createContext(null);

export const ConfirmProvider = ({ children }: any) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <ConfirmContext.Provider value={{ confirm, setConfirm }}>
      {children}
    </ConfirmContext.Provider>
  );
};
