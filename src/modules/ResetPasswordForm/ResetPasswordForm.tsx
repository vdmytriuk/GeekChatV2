import {FC, FormEvent} from "react";
import {useNavigate} from "react-router";
import {yupResolver} from "@hookform/resolvers/yup";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";
import {SubmitHandler, useForm} from "react-hook-form";

import {resetPasswordRequest} from "./api";

import {ROUTER} from "../../shared/common/config/router";
import {resetPasswordFormSchema} from "./schema/schema";

import {IResetPasswordData} from "./types";

import Button from "../../shared/UI/Button/Button";
import FormField from "../../shared/UI/FormField/FormField";
import LogoWrapper from "../../components/LogoWrapper/LogoWrapper";

import "./ResetPasswordForm.scss";


const ResetPasswordForm: FC = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            dirtyFields
        }
    } = useForm<IResetPasswordData>(
        {
            mode: 'onChange',
            resolver: yupResolver(resetPasswordFormSchema)
        }
    );

    const onSubmit: SubmitHandler<IResetPasswordData> = async (data, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await dispatch(resetPasswordRequest(dispatch, data));

        navigate(ROUTER.AUTH);
    }

    return (
        <LogoWrapper className="reset-password-form">
            <form
                className="reset-password-form__form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <legend className="reset-password-form__legend">
                    <h2 className="medium-heading">
                        Reset password
                    </h2>

                    <p className="medium-text">
                        Enter the email associated with your account and we`ll send an email with your password
                    </p>
                </legend>

                <div className="reset-password-form__fields">
                    <FormField
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Type your email..."
                        register={{...register("email")}}
                        errorMessage={errors.email?.message}
                        success={dirtyFields.email && !errors.email ? 1 : 0}
                    />
                </div>

                <Button type="submit">
                    Reset password
                </Button>
            </form>
        </LogoWrapper>
    );
};

export default ResetPasswordForm;