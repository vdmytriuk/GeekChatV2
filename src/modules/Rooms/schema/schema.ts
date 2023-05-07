import * as Yup from "yup";

export const editRoomSchema = Yup.object({
  name: Yup
    .string()
    .required('Room name is required'),
  password: Yup
    .string()
    .required('Password is required field')
    .min(2, 'Password must be at least 2 characters')
});
