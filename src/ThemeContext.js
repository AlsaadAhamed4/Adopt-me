import { createContext } from "react";

const ThemeContext = createContext(["blue", () => {}]); //creating a context by passing a hook , we can pass anything

export default ThemeContext;
