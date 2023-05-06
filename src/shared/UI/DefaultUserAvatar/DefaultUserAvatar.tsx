import {FC} from "react";

import './DefaultUserAvatar.scss';

interface IDefaultAvatar {
    username?: string
    width?: string,
    height?: string,
    fontSize?: string,
    backgroundColor?: string,
    color?: string,
}


const DefaultUserAvatar: FC<IDefaultAvatar> = (
    {
        username,
        width,
        height,
        fontSize,
        backgroundColor,
        color
    }) => {
    const initials = username ? username.charAt(0) : "";

    const style = {
        width: width || '5rem',
        height: height || '5rem',
        fontSize: fontSize || '2.4rem',
        backgroundColor: backgroundColor || 'var(--primary-default)',
        color: color || 'var(--gray-050)'
    };

    return (
        <div className="user-avatar" style={style}>
            <span>
                {initials.toUpperCase()}
            </span>
        </div>
    );
};

export default DefaultUserAvatar;