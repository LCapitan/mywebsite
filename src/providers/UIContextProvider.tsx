import React, { useState } from 'react';
import UIContext from '../context/UIContext';

function UIContextProvider({ children }: any) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export default UIContextProvider