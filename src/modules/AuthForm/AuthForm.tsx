import {FC, FormEvent} from "react";
import {Link} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";

import {ROUTER} from "../../shared/common/config/router";

import Button from "../../shared/UI/Button/Button";
import FormField from "../../shared/UI/FormField/FormField";
import LogoWrapper from "../../components/LogoWrapper/LogoWrapper";

import {authFormSchema} from "./schema/schema";
import {authUserRequest} from "./api";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";

import {IUserLoginData} from "./types";

import "./AuthForm.scss";


const AuthForm: FC = () => {
    const dispatch = useTypedDispatch();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            dirtyFields
        }
    } = useForm<IUserLoginData>(
        {
            mode: 'onChange',
            resolver: yupResolver(authFormSchema)
        }
    );

    const onSubmit: SubmitHandler<IUserLoginData> = (data, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(authUserRequest(dispatch, data));
    }

    return (
        <LogoWrapper className="auth-form">
            <form
                className="auth-form__form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <legend className="auth-form__legend">
                    <h2 className="medium-heading">
                        Log in
                    </h2>
                </legend>

                <div className="auth-form__fields">
                    <FormField
                        label="Email"
                        type="email"
                        name="email"
                        register={{...register("email")}}
                        errorMessage={errors.email?.message}
                        success={dirtyFields.email && !errors.email ? 1 : 0}
                    />

                    <FormField
                        label="Password"
                        type="password"
                        name="password"
                        register={{...register("password")}}
                        errorMessage={errors.password?.message}
                        success={dirtyFields.password && !errors.password ? 1 : 0}
                    />

                </div>

                <Link className="medium-text" to={ROUTER.FORGOT_PASSWORD}>
                    Forgot password?
                </Link>

                <Button type="submit">
                    Sign in
                </Button>

                <p className="auth-form__bottom medium-text">
                    Don’t have an account? <Link to={ROUTER.REGISTRATION}>Sign up here</Link>
                </p>
            </form>
        </LogoWrapper>
    );
};

export default AuthForm;