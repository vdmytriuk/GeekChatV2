export interface IUser {
    _id: string;
    username: string;
    email: string;
}

export interface IMessage {
    _id: string;
    author: {
        id: string;
        username: string;
    },
    room: string;
    message: string;
    filePath?: string;
    createdAt: string;
    updatedAt: string;
}

export interface IRoom {
    _id: string;
    name: string;
    description?: string;
    owner: string;
    messages: IMessage[] | [];
    participants: [];
}