export const content = [
  {
    type: "input",
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    type: "input",
    name: "role",
    label: "Role",
    placeholder: "Enter your role",
    dtsrc: [
      {
        label: "ADMIN",
        name: "ADMIN",
      },
      {
        label: "EMPLOYEE",
        name: "EMPLOYEE",
      },
    ],
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
  {
    type: "input",
    name: "phone",
    label: "Phone",
    placeholder: "Enter your phone",
  },
  {
    type: "input",
    name: "gender",
    label: "Gender",
    placeholder: "Enter your gender",
    dtsrc: [
      {
        label: "MALE",
        name: "MALE",
      },
      {
        label: "FEMALE",
        name: "FEMALE",
      },
    ],
  },
  {
    type: "textarea",
    name: "address",
    label: "Address",
    placeholder: "Enter your address",
  },
];
