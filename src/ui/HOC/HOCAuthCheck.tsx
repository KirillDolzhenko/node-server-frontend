import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { IPropsChildren } from "../../types/props.types";
import { useNavigate } from "react-router-dom";

function HOCAuthCheck({ children }: IPropsChildren) {
  const user = useAppSelector((state) => state.userSlice.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user]);

  return <>{Boolean(user) && children}</>;
}

export default HOCAuthCheck;
