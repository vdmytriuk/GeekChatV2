import React, {FC, useEffect, useRef, useState} from 'react';
import { useSelector } from "react-redux";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";
import io from 'socket.io-client';

import {IMessage} from "../../shared/common/types";

import "./Chat.scss";

export const Chat: FC = () => {
   return (
      <section className="chat">

      </section>
   );
}