import {FC} from "react";
import {useFormattedDate} from "../../shared/hooks/useFormattedDate";

import {IMessage} from "../../shared/common/types";

import "./Message.scss";

const Message: FC<IMessage> = ({ isAdmin = false, message, author, createdAt, filePath, isSelf = false }) => {
    const date = useFormattedDate(createdAt);
    const token = localStorage.getItem('token');

    const downloadFile = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_V1_URL}/download?fileName=${filePath}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filePath.split('-')[1];
            link.click();
            URL.revokeObjectURL(url);
        } catch (e) {
            throw e
        }

    }



    if (isAdmin) {
        return (
            <div className="message message_admin">
                <div className="message__body">
                    <p>{message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`message ${isSelf ? 'message_self' : ''}`}>
            <div className="message__top">
                <p className="message__author">
                    <strong>{author.username}</strong>, {date}
                </p>
            </div>

            <div className="message__body">
                <p>{message}</p>

                {filePath && <span>File: <a href={`${process.env.REACT_APP_API_V1_URL}${filePath}`} onClick={downloadFile}>{filePath.split('-')[1]}</a></span>}
            </div>
        </div>
    );
};

export default Message;