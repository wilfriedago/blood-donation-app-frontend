interface Role {
  id: string;
  name: string;
}

interface Status {
  id: string;
  name: string;
}

interface File {
  id: string;
}

interface User {
  id?: string;
  email: string;
  provider?: string;
  socialId?: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  photo?: File;
  role: Role;
  status: Status;
}

export type { File, Role, Status, User };
