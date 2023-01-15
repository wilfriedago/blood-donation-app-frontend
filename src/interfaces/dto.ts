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

export type { LoginUserDto, RegisterUserDto };
