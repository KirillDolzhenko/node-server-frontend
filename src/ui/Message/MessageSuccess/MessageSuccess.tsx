import { IPropsChildren } from "../../../types/props.types";
import Message from "../Message";
import classes from "./MessageSuccess.module.scss";

function MessageSuccess({ children }: IPropsChildren) {
  return <Message className={classes.message}>{children}</Message>;
}

export default MessageSuccess;
