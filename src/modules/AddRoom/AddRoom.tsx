import React, {FormEvent, useState} from "react";

import Button from "../../shared/UI/Button/Button";

import "./AddRoom.scss";
import FormField from "../../shared/UI/FormField/FormField";
import {useForm} from "react-hook-form";
import {IRoomEditData} from "../Room/types";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";
import {addRoomRequest} from "./api";
import {IRoomAddData} from "./types";

const AddRoom = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const dispatch = useTypedDispatch();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            dirtyFields
        }
    } = useForm<IRoomAddData>(
        {
            mode: 'onChange',
            // resolver: yupResolver(editRoomSchema)
        }
    );

    const onSubmit: (data: IRoomAddData, e: FormEvent<HTMLFormElement>) => void = (data, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(addRoomRequest(dispatch, data));

        setPopupOpen(false);
    }

    return (
        <div className="add-room">
            <Button onClick={() => setPopupOpen(true)} className="add-room__btn">
                + Add room
            </Button>

            <div className={`add-room__control ${popupOpen ? 'active' : ''}`}>
                <div className="add-room__popup">
                    <form
                        className="add-room__form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormField
                            label="Room name"
                            type="text"
                            name="name"
                            placeholder="Type room name..."
                            register={{...register("name")}}
                            errorMessage={errors.name?.message}
                            success={dirtyFields.name && !errors.name ? 1 : 0}
                        />

                        <FormField
                            label="Room description"
                            type="text"
                            name="description"
                            placeholder="Type room description..."
                            register={{...register("description")}}
                            errorMessage={errors.description?.message}
                            success={dirtyFields.description && !errors.description ? 1 : 0}
                        />

                        <Button type="submit">
                            Add room
                        </Button>
                    </form>
                </div>
            </div>

            <div
                className={`add-room__overlay ${popupOpen  ? 'active' : ''}`}
                onClick={() => setPopupOpen(false)}
            />
        </div>
    );
};

export default AddRoom;