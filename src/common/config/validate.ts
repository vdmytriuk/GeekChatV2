export const EMAIL_REG_EXP = /^[A-Z]+[A-Z \d.]+@[A-Z\d-]+.[A-Z]{2,}$/i;
export const PASS_REG_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=[^\W_])[A-Za-z\d]{8,}$/;
export const NAME_REG_EXP = /^[A-Z][a-z]+$/;

export const EMAIL_ERROR_TEXT = "Please type correct email";
export const PASS_ERROR_TEXT = "Invalid password. Your password must contain: 1 numb, 1 upper and lower letter.";
export const NAME_ERROR_TEXT = "The name must be written only in Latin letters. " +
    "The first letter must be capitalized. " +
    "The length must be two or more letters."
