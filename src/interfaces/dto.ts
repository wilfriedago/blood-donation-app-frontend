interface LoginUserDto {
  email: string;
  password: string;
}

interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

type ForgotPasswordDto = {
  email: string;
};

type ResetPasswordDto = {
  password: string;
  passwordConfirmation: string;
};

export type {
  ForgotPasswordDto,
  LoginUserDto,
  RegisterUserDto,
  ResetPasswordDto,
};
