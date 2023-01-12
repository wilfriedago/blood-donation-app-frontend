interface LoginUserDto {
  email: string;
  password: string;
}

interface RegisterUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type { LoginUserDto, RegisterUserDto };
