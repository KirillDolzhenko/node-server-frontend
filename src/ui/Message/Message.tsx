import { IPropsChildren } from "../../types/props.types";
import classes from "./Message.module.scss";
import clsx from "clsx";

function Message({ children, className }: IPropsChildren) {
  return <div className={clsx(classes.message, className)}>{children}</div>;
}

export default Message;
