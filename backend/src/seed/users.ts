type UserType = {
  name: string;
  email: string;
  password: string;
  citizenshipNumber: string;
  admin: boolean;
  verified: boolean;
};

const users: UserType[] = [
  {
    name: "John",
    citizenshipNumber: "9860777906",
    email: "john@gmail.com",
    password: "$2b$10$6sdkothEwAguhA0FytsGF.gcWPmTDB5hosif6rGX5FFJK8PdBgRHu",
    admin: true,
    verified: true,
  },
  {
    name: "Liza",
    citizenshipNumber: "9860777907",
    email: "liza@gmail.com",
    password: "$2b$10$70yLw0dPhAD0py/iiGUInO7kklGUmbMfa5BmXKGCXEID1ufTsqSQ6",
    admin: false,
    verified: true,
  },
  {
    name: "Ben",
    citizenshipNumber: "9860777908",
    email: "ben@gmail.com",
    password: "$2b$10$1DsQFSqUs3ufyDDRBd9wYuU5i9ihbnYR4GCYJsI3IzGXamwFWnr4S",
    admin: false,
    verified: true,
  },
];

export default users;
