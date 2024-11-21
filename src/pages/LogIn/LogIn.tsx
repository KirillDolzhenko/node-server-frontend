import classes from "./LogIn.module.scss";
import { useForm } from "react-hook-form";
import { schemaAuth, TSchemaAuth } from "../../validations/auth.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useLoginMutation } from "../../redux/query/auth.query";
import { IMutationAuth } from "../../types/redux.types";
import MessageError from "../../ui/Message/MessageError/MessageError";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import MessageLoading from "../../ui/Message/MessageLoading/MessageLoading";
import { getRTKError } from "../../utils/getRTKError";

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSchemaAuth>({
    resolver: zodResolver(schemaAuth),
  });
  const [login, { data, isError, isLoading, isSuccess, error }] =
    useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback((data: IMutationAuth) => {
    login(data);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  return (
    <div>
      <h1>Log In</h1>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="text" placeholder="Email" />
        {errors.email ? (
          <MessageError>{errors.email.message}</MessageError>
        ) : (
          <></>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password ? (
          <MessageError>{errors.password.message}</MessageError>
        ) : (
          <></>
        )}
        <div className={classes.buttons}>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate("/auth/signup")}>
            Sign Up
          </button>
        </div>

        {isError && <MessageError>{getRTKError(error)}</MessageError>}
        {isSuccess && <MessageError>You logged in!</MessageError>}
        {isLoading && <MessageLoading />}
      </form>
    </div>
  );
}

export default LogIn;
