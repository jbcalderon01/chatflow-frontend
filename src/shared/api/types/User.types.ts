export type UserRole = "ADMIN" | "AGENT";

export type GetMySelfResponse = {
  id: string;
  cognitoSub: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
};
