import { useState, type ReactNode } from "react";
import UIContext from "../context/UIContext";

function UIContextProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <UIContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </UIContext.Provider>
  );
}

export default UIContextProvider;
