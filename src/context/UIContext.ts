import { createContext } from "react";

export interface UIContextProps {
  menuOpen: boolean;
  setMenuOpen: (state: boolean) => void;
}

const UIContext = createContext<UIContextProps>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export default UIContext;
