import { IPropsChildren } from "../../../types/props.types";
import Message from "../Message";
import classes from "./MessageError.module.scss";

function MessageError({ children }: IPropsChildren) {
  return <Message className={classes.message}>{children}</Message>;
}

export default MessageError;
