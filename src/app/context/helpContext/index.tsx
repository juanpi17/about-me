'use client';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface ShowHelpContextProps {
  showHelp: boolean;
  setShowHelp: Dispatch<SetStateAction<boolean>>;
}

const ShowHelp = createContext<ShowHelpContextProps>({ showHelp: true, setShowHelp: () => {} });

export function ShowHelpProvider({ children } : { children: React.ReactNode }) {
  const [showHelp, setShowHelp] = useState<boolean>(true);

  return (
    <ShowHelp value={{ showHelp, setShowHelp }}>
      {children}
    </ShowHelp>
  );
}

export const useShowHelpContext = () => useContext(ShowHelp);
