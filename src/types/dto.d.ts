type LoginUserDto = {
  email: string;
  password: string;
};

type UserDto = {
  email: string;
  password: string;
  passwordConfirmation: string;
  role: number;
};

type RegisterDonorDto = UserDto & {
  firstName: string;
  lastName: string;
};

type RegisterOrganisationDto = UserDto & {
  name: string;
  description?: string;
};

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
  RegisterDonorDto,
  RegisterOrganisationDto,
  ResetPasswordDto,
};
