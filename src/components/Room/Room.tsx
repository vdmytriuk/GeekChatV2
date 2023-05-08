import {FC, useState} from "react";

import Edit from "../../shared/assets/svg/edit.svg";
import Light from "../../shared/assets/svg/todo.svg"
import Close from "../../shared/assets/svg/close.svg";
import Delete from "../../shared/assets/svg/delete.svg";

import {IRoom} from "../../shared/common/types";

import "./Room.scss";
import FormField from "../../shared/UI/FormField/FormField";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";
import {chatActions} from "../../store/chat";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";

interface IRoomProps extends IRoom {
    setPopupId?: any;
    popupId?: string;
    handleSubmit?: any;
    onSubmit?: any;
    register?: any;
    errors?: any;
    dirtyFields?: any;
    ownRoom?: boolean
}

const Room: FC<IRoomProps> =
    ({
      name,
      _id,
      setPopupId,
      popupId,
      handleSubmit,
      dirtyFields,
      errors,
      onSubmit,
      register,
      ownRoom = false
    }) => {
    const dispatch = useTypedDispatch();
    const activeRoomChatId = useTypedSelector(state => state.chat.activeChatRoomId);

    const [isEditing, setIsEditing] = useState(false);

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
                     onClick={() => setPopupId(_id)}
                 >
                     <Edit/>

                     <div className={`room__popup  ${isEditing ? 'editing' : ''}`}>
                         <div
                             className="room__item"
                             onClick={(e) => {
                                 e.stopPropagation()
                                 setIsEditing(true)
                             }}
                         >
                             <Light/>

                             <p className="caption-text light-text">
                                 Edit
                             </p>
                         </div>

                         <div className="room__item">
                             <Delete/>

                             <p className="caption-text">
                                 Delete
                             </p>
                         </div>

                         <form
                             className="room__edit"
                             noValidate
                             onSubmit={handleSubmit(() => onSubmit(_id))}
                         >
                             <button
                                 className="room__close"
                                 onClick={() => setIsEditing(false)}
                             >
                                 <Close/>
                             </button>

                             <FormField
                                 label="Room name"
                                 type="text"
                                 name="name"
                                 placeholder={name}
                                 register={{...register("name")}}
                                 errorMessage={errors.name?.message}
                                 success={dirtyFields.name && !errors.name ? 1 : 0}
                             />
                         </form>
                     </div>
                 </div>

                 <div
                     className={`room__overlay ${popupId === _id  ? 'active' : ''}`}
                     onClick={() => setPopupId(null)}
                 />
             </>
            }
        </div>
    );
};

export default Room;