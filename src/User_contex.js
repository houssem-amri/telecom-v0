import React from "react";
const user=JSON.parse(localStorage.getItem("connected_user")||'{}')
const UserContext = React.createContext({
  CurrentUser:user ,
  setCurrentUser: () => {},
});
export default UserContext;