import * as Yup from "yup";

export const addRoomSchema = Yup.object({
  name: Yup
    .string()
    .required('Room name is required'),
  description: Yup
    .string()
});
