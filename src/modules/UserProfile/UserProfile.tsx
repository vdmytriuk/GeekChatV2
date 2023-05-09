import {FC, FormEvent, useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";

import {editUserSchema} from "./schema/schema";
import {editUserRequest} from "./api";

import {IUserEditData} from "./types";

import Button from "../../shared/UI/Button/Button";
import FormField from "../../shared/UI/FormField/FormField";

import "./UserProfile.scss";
import {deleteUserRequest} from "./api/deleteUserRequest";


const UserProfile: FC = () => {
    const dispatch = useTypedDispatch();

    const user = useTypedSelector(state => state.user);

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
    } = useForm<IUserEditData>(
        {
            mode: 'onChange',
            resolver: yupResolver(editUserSchema)
        }
    );

    const password = watch('password');

    useEffect(() => {
        if (password && dirtyFields.confirmPassword) {
            trigger('confirmPassword');
            clearErrors('confirmPassword');
        }
    }, [password, clearErrors, trigger]);

    const onSubmit: SubmitHandler<IUserEditData> = (data, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(editUserRequest(dispatch, user._id, data));
    }

    return (
        <div className="user-profile">
            <form
                className="user-profile__form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <legend className="user-profile__legend">
                    <h3 className="medium-heading light-text">
                        Edit user profile
                    </h3>
                </legend>

                <div className="user-profile__fields">
                    <div className="user-profile__email">
                        <p className="small-heading light-text">
                            Email
                        </p>

                        <p className="smallest-heading secondary-default-color">
                            {user.email}
                        </p>
                    </div>

                    <FormField
                        label="Username"
                        type="text"
                        name="username"
                        defaultValue={user.username}
                        register={{...register("username")}}
                        errorMessage={errors.username?.message}
                        success={dirtyFields.username && !errors.username ? 1 : 0}
                    />

                    <FormField
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Type new password..."
                        register={{...register("password")}}
                        errorMessage={errors.password?.message}
                        success={dirtyFields.password && !errors.password ? 1 : 0}
                    />

                    <FormField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password..."
                        register={{...register("confirmPassword")}}
                        errorMessage={errors.confirmPassword?.message}
                        success={dirtyFields.confirmPassword && !errors.confirmPassword ? 1 : 0}
                    />
                </div>

                <div className="user-profile__buttons">
                    <Button type="submit">
                        Edit user
                    </Button>

                    <Button
                        className="user-profile__delete"
                        onClick={() => dispatch(deleteUserRequest(dispatch, user._id))}
                    >
                        Delete user
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;