import {FC, FormEvent, useEffect} from "react";
import {Link} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";

import {ROUTER} from "../../shared/common/config/router";

import Button from "../../shared/UI/Button/Button";
import FormField from "../../shared/UI/FormField/FormField";
import LogoWrapper from "../../components/LogoWrapper/LogoWrapper";

import {registerUserSchema} from "./schema/schema";
import {registerUserRequest} from "./api";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";

import {IUserRegisterData} from "./types";

import "./RegisterForm.scss";


const RegisterForm: FC = () => {
    const dispatch = useTypedDispatch();

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        clearErrors,
        formState: {
            errors,
            dirtyFields,
        }
    } = useForm<IUserRegisterData>(
        {
            mode: 'onChange',
            resolver: yupResolver(registerUserSchema)
        }
    );

    const password = watch('password');

    useEffect(() => {
        if (password && dirtyFields.confirmPassword) {
            trigger('confirmPassword');
            clearErrors('confirmPassword');
        }
    }, [password, clearErrors, trigger]);

    const onSubmit: SubmitHandler<IUserRegisterData> = (data, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(registerUserRequest(dispatch, data));
    }

    return (
        <LogoWrapper className="register-form">
            <form
                className="register-form__form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <legend className="register-form__legend">
                    <h2 className="medium-heading">
                        Sign up
                    </h2>
                </legend>

                <div className="register-form__fields">
                    <FormField
                        label="Username"
                        type="text"
                        name="username"
                        register={{...register("username")}}
                        errorMessage={errors.username?.message}
                        success={dirtyFields.username && !errors.username ? 1 : 0}
                    />

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

                    <FormField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        register={{...register("confirmPassword")}}
                        errorMessage={errors.confirmPassword?.message}
                        success={dirtyFields.confirmPassword && !errors.confirmPassword ? 1 : 0}
                    />
                </div>

                <Button type="submit">
                    Sign up
                </Button>

                <p className="register-form__bottom medium-text">
                    Have an account? <Link to={ROUTER.AUTH}>Log in</Link>
                </p>
            </form>
        </LogoWrapper>
    );
};

export default RegisterForm;