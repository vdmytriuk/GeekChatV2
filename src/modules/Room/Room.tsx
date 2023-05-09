import React, {FC, FormEvent, useState} from "react";
import {useForm} from "react-hook-form";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";

import {chatActions} from "../../store/chat";

import {getChatRoomRequest} from "../ChatRoom/api";
import {deleteRoomRequest, editRoomRequest} from "./api";

import Edit from "../../shared/assets/svg/edit.svg";
import Light from "../../shared/assets/svg/todo.svg"
import Close from "../../shared/assets/svg/close.svg";
import Delete from "../../shared/assets/svg/delete.svg";

import {IRoom} from "../../shared/common/types";
import {IRoomEditData} from "./types";

import Button from "../../shared/UI/Button/Button";
import FormField from "../../shared/UI/FormField/FormField";

import "./Room.scss";


interface IRoomProps extends IRoom {
    setPopupId?: any;
    popupId?: string;
    ownRoom?: boolean
}

const Room: FC<IRoomProps> =
    ({
      _id,
      name,
      description,
      setPopupId,
      popupId,
      ownRoom = false
    }) => {
    const dispatch = useTypedDispatch();
    const activeRoomChatId = useTypedSelector(state => state.chat.activeChatRoomId);

    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            dirtyFields
        }
    } = useForm<IRoomEditData>(
        {
            mode: 'onChange',
            // resolver: yupResolver(editRoomSchema)
        }
    );

    const onSubmit: (data: IRoomEditData, e: FormEvent<HTMLFormElement>) => void = async (data, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await dispatch(editRoomRequest(dispatch, popupId, data));

        setIsEditing(false);
        setPopupId("");

        if (activeRoomChatId === popupId) {
            dispatch(getChatRoomRequest(dispatch, activeRoomChatId));
        }
    }

    return (
        <div
            className={`room ${activeRoomChatId === _id ? 'active' : ''}`}
            onClick={() => dispatch(chatActions.setActiveChatRoomId(_id))}
        >
            <p className="medium-text">
                {name}
            </p>

            {ownRoom &&
             <>
                 <div
                     className={`room__control ${popupId === _id ? 'active' : ''}`}
                     onClick={(e) => {
                         e.stopPropagation();
                         setPopupId(_id);
                     }}
                 >
                     <Edit/>

                     <div className={`room__popup  ${isEditing ? 'editing' : ''}`}>
                         <div
                             className="room__item"
                             onClick={() => setIsEditing(true)}
                         >
                             <Light/>

                             <p className="caption-text light-text">
                                 Edit
                             </p>
                         </div>

                         <div onClick={() => dispatch(deleteRoomRequest(dispatch, _id))} className="room__item">
                             <Delete/>

                             <p className="caption-text">
                                 Delete
                             </p>
                         </div>

                         <form
                             className="room__edit"
                             noValidate
                             onSubmit={handleSubmit(onSubmit)}
                         >
                             <span
                                 className="room__close"
                                 onClick={() => setIsEditing(false)}
                             >
                                 <Close/>
                             </span>

                             <FormField
                                 label="Room name"
                                 type="text"
                                 name="name"
                                 defaultValue={name}
                                 register={{...register("name")}}
                                 errorMessage={errors.name?.message}
                                 success={dirtyFields.name && !errors.name ? 1 : 0}
                             />

                             <FormField
                                 label="Room description"
                                 type="text"
                                 name="description"
                                 defaultValue={description}
                                 register={{...register("description")}}
                                 errorMessage={errors.description?.message}
                                 success={dirtyFields.description && !errors.description ? 1 : 0}
                             />

                             <Button type="submit">
                                 Save
                             </Button>
                         </form>
                     </div>
                 </div>

                 <div
                     className={`room__overlay ${popupId === _id  ? 'active' : ''}`}
                     onClick={(e) => {
                         e.stopPropagation()
                         setIsEditing(false)
                         setPopupId("")
                     }}
                 />
             </>
            }
        </div>
    );
};

export default Room;