import { createContext, useState } from "react";

export let SideBarContext = createContext();

export default function SideBarContextProvider({children}){

const [SideBarToggle, setSideBarToggle] = useState(false)

  return <>
    <SideBarContext.Provider value={{SideBarToggle, setSideBarToggle}}>
      {children}
    </SideBarContext.Provider>
  </>
}