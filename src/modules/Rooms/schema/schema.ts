import * as Yup from "yup";

export const editRoomSchema = Yup.object({
  name: Yup
    .string()
    .required('Room name is required'),
  description: Yup
    .string()
});
