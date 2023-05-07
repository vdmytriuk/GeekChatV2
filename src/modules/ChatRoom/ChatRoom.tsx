import React, {FC, useEffect, useRef, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";
import io from 'socket.io-client';

import {getChatRoomRequest} from "./api";

import {IMessage} from "../../shared/common/types";
import {LOCAL_STORAGE_USER_KEY} from "../../shared/common/config/localStorage";

import Button from "../../shared/UI/Button/Button";
import Message from "../../components/Message/Message";
import FormField from "../../shared/UI/FormField/FormField";

import "./ChatRoom.scss";

export const ChatRoom: FC = () => {
    const dispatch = useTypedDispatch();

    const user = useTypedSelector(state => state.user);
    const activeChatRoomId = useTypedSelector(state => state.chat.activeChatRoomId);

    const messages = useTypedSelector(state => state.chatRoom.messages) ?? [];
    const name = useTypedSelector(state => state.chatRoom.name);
    const description = useTypedSelector(state => state.chatRoom.description);

    const bodyRef = useRef();
    const textField = useRef();

    const socket = io(process.env.REACT_APP_API_V1_URL, {
        extraHeaders: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_USER_KEY)}`,
        },
    });

    useEffect(() => {
        dispatch(getChatRoomRequest(dispatch, activeChatRoomId))
    }, [activeChatRoomId])

    useEffect(() => {
        const block: HTMLDivElement = bodyRef.current;

        if (block) {
            block.scrollTop = block.scrollHeight;
        }
    }, [messages])

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
                                key={message._id}
                                isAdmin={message?.isAdmin}
                                message={message?.message}
                                filePath={message?.filePath}
                                isSelf={message?.author.id === user._id}
                                author={message?.author}
                                createdAt={message?.createdAt}
                            />
                        ))}
                    </div>

                    <form
                        className="chat-room__tools"
                        // onSubmit={handleSendMessage}
                    >
                        <FormField
                            placeholder="Type your message"
                        />

                        <div className="chat-room__file">

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
