import React from 'react'

import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  return React.useContext(AuthContext)
}
