import React, {ChangeEventHandler, FC, FormEvent, useEffect, useRef, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";
import io from 'socket.io-client';

import {getChatRoomRequest} from "./api";
import {chatRoomActions} from "./store";

import {IMessage, IRoom} from "../../shared/common/types";
import {LOCAL_STORAGE_USER_KEY} from "../../shared/common/config/localStorage";

import Button from "../../shared/UI/Button/Button";
import Message from "../../components/Message/Message";
import FormField from "../../shared/UI/FormField/FormField";

import File from "../../shared/assets/svg/file.svg";
import Close from "../../shared/assets/svg/close.svg";

import "./ChatRoom.scss";

const FILE_STRING = "Attach file";

export const ChatRoom: FC = () => {
    const dispatch = useTypedDispatch();

    const [fileName, setFileName] = useState(FILE_STRING);

    const user = useTypedSelector(state => state.user);
    const activeChatRoomId = useTypedSelector(state => state.chat.activeChatRoomId);

    const messages = useTypedSelector(state => state.chatRoom.messages) ?? [];
    const name = useTypedSelector(state => state.chatRoom.name);
    const description = useTypedSelector(state => state.chatRoom.description);

    const bodyRef = useRef();
    const textField = useRef();
    const fileField = useRef();

    const socket = io(process.env.REACT_APP_API_V1_URL, {
        extraHeaders: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_USER_KEY)}`,
        },
    });

    const joinRooms = async (rooms: string[]) => {
        await dispatch(getChatRoomRequest(dispatch, activeChatRoomId));
        await new Promise((resolve) => socket.emit('join-rooms', { rooms }, resolve));
    };

    const sendMessage = async ({author, message, room, filePath}: IMessage) => {
        await new Promise((resolve) =>
            socket.emit("send-message", { author, message: message || '', room, filePath }, resolve)
        );
    };

    const handleSendMessage = async (event: FormEvent) => {
        event.preventDefault();

        const room = activeChatRoomId;
        const author = {
            id: user._id,
            username: user.username
        };
        let message = "";

        if (textField && textField.current) {
            const currentTextField = textField.current as HTMLInputElement;
            message = currentTextField.value;
            currentTextField.value = '';
        }

        await sendMessage({author, message, room, filePath: ""});
    };

    useEffect(() => {
        joinRooms([activeChatRoomId]);
    }, [activeChatRoomId])

    useEffect(() => {
        socket.on('new-message', (message: any) => {
            dispatch(chatRoomActions.addNewMessage({...message, message: message.message.message, _id: new Date().getTime() }))
        });

        socket.on('user-joined', ({ message }) => {
            dispatch(chatRoomActions.addNewMessage({message, _id: new Date().getTime(), isAdmin: true }))
        });

        socket.on('user-left', ({ message }) => {
            dispatch(chatRoomActions.addNewMessage({message, _id: new Date().getTime(), isAdmin: true }))
        });
    }, [activeChatRoomId]);

    useEffect(() => {
        const block: HTMLDivElement = bodyRef.current;

        if (block) {
            block.scrollTop = block.scrollHeight;
        }
    }, [messages]);

    const setFile = (e: any) => {
        if (fileField && fileField.current) {
            const currentFileField = fileField.current as HTMLInputElement;

            setFileName(currentFileField.files[0] ? currentFileField.files[0].name : 'Attach file')
        }
    }

    const resetFile = (e: any) => {
        if (e) {
            e.stopPropagation();
        }

        setFileName(FILE_STRING);

        if (fileField && fileField.current) {
            const currentFileField = fileField.current as HTMLInputElement;

            currentFileField.value = '';
        }
    }

    return (
        <section className="chat-room">
            {activeChatRoomId === ""
                ? <h3 className="medium-heading chat-room__empty">Choose room to start messaging</h3>
                :
                <>
                    <div className="chat-room__top">
                        <h2 className="medium-heading">
                            {name}
                        </h2>

                        <p>
                            {description}
                        </p>
                    </div>

                    <div
                        ref={bodyRef}
                        className="chat-room__body"
                    >
                        {messages.map(message => (
                            <Message
                                key={message?._id}
                                isAdmin={message?.isAdmin}
                                message={message?.message}
                                filePath={message?.filePath}
                                isSelf={message?.author?.id === user._id}
                                author={message?.author}
                                createdAt={message?.createdAt}
                            />
                        ))}
                    </div>

                    <form
                        className="chat-room__tools"
                        onSubmit={handleSendMessage}
                    >
                        <div className="field">
                            <input className="field__input" ref={textField} type="text" placeholder="Type your message"/>
                        </div>

                        <div className="chat-room__file">
                            <p
                                className="chat-room__attach"
                                onClick={() => {
                                    if (fileField && fileField.current) {
                                        const currentFileField = fileField.current as HTMLInputElement;

                                        currentFileField.click()
                                    }
                                }}
                            >
                                {fileName === FILE_STRING
                                    ? <File />
                                    : <button onClick={resetFile}> <Close/> </button>
                                }

                                <span className="small-text gray100-text">{fileName}</span>
                            </p>

                            <input ref={fileField} onChange={setFile} type="file" id="file-input" />
                        </div>

                        <div className="chat-room__controls">
                            <Button
                                className="chat-room__button"
                                type="submit"
                            >
                                Send
                            </Button>
                        </div>
                    </form>
                </>
            }
        </section>
    );
};
