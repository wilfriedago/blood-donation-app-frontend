type Role = {
  id: string;
  name: string;
};

type Status = {
  id: string;
  name: string;
};

type File = {
  id: string;
};

type City = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};

type BloodGroup = {
  id: string;
  name: string;
  description?: string | null;
  compatibleWith?: BloodGroup[] | null;
};

type User = {
  id: string;
  email: string;
  phone: string;
  provider?: string;
  socialId?: string;
  photo?: File;
  role: Role;
  status: Status;
};

type Donor = {
  id: string;
  firstName: string;
  lastName: string;
  address?: string | null;
  birthDate?: Date | null;
  gender?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  user: User | null;
  bloodGroup?: BloodGroup;
}

type Hospital = {
  id: string;
  name: string;
  description?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  user: User | null;
  city?: City | null;
}

type BloodBank = {
  id: string;
  name: string;
  description?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  user: User | null;
  city?: City | null;
}

type BloodRequest = {
  id: string;
  description?: string | null;
  status: Status;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  donor?: Donor | null;
  hospital?: Hospital | null;
  bloodBank?: BloodBank | null;
  bloodGroup?: BloodGroup | null;
}

type BloodDonation = {
  id: string;
  description?: string | null;
  status: Status;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  donor?: Donor | null;
  hospital?: Hospital | null;
  bloodBank?: BloodBank | null;
  bloodGroup?: BloodGroup | null;
}

export type { File, Role, Status, Donor, Hospital, BloodBank, BloodDonation, BloodGroup, BloodRequest, City, User };
