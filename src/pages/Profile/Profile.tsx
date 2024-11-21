import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { EnumUsersRole } from "../../types/entities.types";
import classes from "./Profile.module.scss";
import { useForm } from "react-hook-form";
import { usePutUserMutation } from "../../redux/query/users.query";
import MessageError from "../../ui/Message/MessageError/MessageError";
import {
  schemaPutUser,
  TSchemaPutUser,
} from "../../validations/user.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { IDataPutUser } from "../../types/redux.types";
import { changeUsersInfo, removeUser } from "../../redux/slices/userSlice";
import MessageSuccess from "../../ui/Message/MessageSuccess/MessageSuccess";
import MessageLoading from "../../ui/Message/MessageLoading/MessageLoading";
import Message from "../../ui/Message/Message";
import { getRTKError } from "../../utils/getRTKError";

function Profile() {
  const user = useAppSelector((state) => state.userSlice.user);
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<TSchemaPutUser>({
    resolver: zodResolver(schemaPutUser),
    defaultValues: {
      email: user ? user.email : undefined,
      description: user ? (user.description ? user.description : "") : null,
    },
  });
  const [putUser, { isLoading, isError, isSuccess, error, data }] =
    usePutUserMutation();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<boolean>();
  const [activeSuccess, setActiveSuccess] = useState<boolean>(false);
  const [activeUnsaved, setActiveUnsaved] = useState<boolean>(false);
  const fields = watch();

  const onSubmit = useCallback(
    (data: IDataPutUser) => {
      putUser({
        data,
        token: user?.token || "",
      });
    },
    [user]
  );
  const onEdit = useCallback(() => {
    setActiveSuccess(false);
    reset({
      email: user?.email,
      description: user?.description,
    });
    setEdit((value) => !value);
  }, [edit, reset]);
  const onExit = useCallback(() => dispatch(removeUser()), [user]);

  useEffect(() => {
    if (
      user?.email !== fields.email ||
      user?.description !== fields.description
    ) {
      setActiveUnsaved(true);
      if (activeSuccess) {
        setActiveSuccess(false);
      }
    } else {
      setActiveUnsaved(false);
    }
  }, [fields]);

  useEffect(() => {
    setActiveSuccess(isSuccess);
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      dispatch(changeUsersInfo(data));
    }
  }, [data]);

  return (
    <div className={classes.main}>
      <h1>Profile{user?.role === EnumUsersRole.ADMIN ? "🌟" : "😎"}</h1>
      {edit ? (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email")} type="email" placeholder="Email" />
          {errors.email && <MessageError>{errors.email.message}</MessageError>}
          <input
            {...register("description")}
            type="description"
            placeholder="Description"
          />
          {errors.description && (
            <MessageError>{errors.description.message}</MessageError>
          )}
          {isLoading ? (
            <MessageLoading />
          ) : isError ? (
            <MessageError>{getRTKError(error)}</MessageError>
          ) : activeSuccess ? (
            <MessageSuccess>Success!</MessageSuccess>
          ) : activeUnsaved ? (
            <Message>Unsaved data!</Message>
          ) : (
            <></>
          )}
          <div className={classes.buttons}>
            <button type="submit">Change</button>
          </div>
        </form>
      ) : (
        <div className={classes.table}>
          <div className={classes.row}>
            <span>Email:</span>
            <span>{user?.email ? user.email : <i>"no email"</i>}</span>
          </div>
          <div className={classes.row}>
            <span>Description:</span>
            <span>
              {user?.description ? user.description : <i>"no description"</i>}
            </span>
          </div>
          <div className={classes.row}>
            <span>Role:</span>
            <span
              className={
                user?.role === EnumUsersRole.ADMIN
                  ? classes.admin
                  : classes.user
              }
            >
              {user?.role === EnumUsersRole.ADMIN ? (
                "Admin"
              ) : user?.role === EnumUsersRole.USER ? (
                "User"
              ) : (
                <i>"no role"</i>
              )}
            </span>
          </div>
        </div>
      )}
      <div className={classes.buttons}>
        <button onClick={onEdit}>{edit ? "Close edit" : "Edit"}</button>
        <button onClick={onExit}>Exit</button>
      </div>
    </div>
  );
}

export default Profile;
