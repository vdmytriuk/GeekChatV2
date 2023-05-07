import React, {FC, useEffect, useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";
import io from 'socket.io-client';

import {IMessage} from "../../shared/common/types";

import "./Chat.scss";

export const Chat: FC = () => {
   const location = useLocation();
   const [roomId, setRoomId] = useState<string | null>(null);

   useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const roomIdParam = searchParams.get('roomId');
      setRoomId(roomIdParam);
   }, [location]);

   useEffect(() => {
      console.log(roomId);
   }, [roomId]);

   return (
       <section className="chat">

       </section>
   );
};
