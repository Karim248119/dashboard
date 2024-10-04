import { Navigate } from "react-router-dom";
import { GlobalContext } from "../../store/GlobalPrvider/GlobalProvider";
import { useContext } from "react";

export function AuthProtectedRoute({ children }) {
  const { user } = useContext(GlobalContext);

  if (user) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
}

export function UserProtectedRoute({ children }) {
  const { user } = useContext(GlobalContext);
  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth" />;
  }
}

//
