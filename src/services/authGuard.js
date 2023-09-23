import { useSelector } from "react-redux";

const isAuth = id => {
  const user = useSelector(state => state.user.currentUser);
  return user._id === id;
};

export default isAuth;
