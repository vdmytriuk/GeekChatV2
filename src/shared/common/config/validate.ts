export const EMAIL_REG_EXP = /^[A-Z]+[A-Z \d.]+@[A-Z\d-]+.[A-Z]{2,}$/i;
export const PASS_REG_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const EDIT_PASS_REG_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/;
export const NAME_REG_EXP = /[a-zA-Z]+$/

export const EMAIL_ERROR_TEXT = "Please type correct email";
export const PASS_ERROR_TEXT = "Invalid password. Your password must contain: 1 numb, 1 upper and lower letter and 1 special character";
export const NAME_ERROR_TEXT = "Invalid username. Usernames can only contain Latin letters (uppercase and lowercase). Special characters and spaces are not allowed."

