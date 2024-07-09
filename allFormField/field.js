export const SITEFIELD = [
  {
    name: "siteName",
    labelText: "Site Name",
    type: "text",
    helperText: "*This Name will appear be on Site Project.",
    placeholder: "Enter your Site Name",
    validationOptions: {
      required: "This Site Name is required",
    },
  },
  // If we add  more fields, they will be added here in the same manner as above. if we chnage a field's name, make sure to change
  {
    name: "siteAddress",
    labelText: "Site Address",
    type: "text",
    placeholder: "Enter Site address",
    validationOptions: {
      required: "Site Address is required",
    },
  },
  {
    name: "status",
    labelText: "Site Status",
    type: "select",
    options: ["Active", "On Hold", "Completed", "No Status"],
    validationOptions: { required: "Site Status is required" },
  },
  {
    name: "siteType",
    labelText: "Site Type",
    type: "select",
    options: ["Residential", "Commercial"],
    validationOptions: { required: "Site Type is required" },
  },
  {
    name: "siteDescription",
    labelText: "Site Description",
    size: true,
    type: "textarea",
    helperText: "*Describe Our Site Project",
    placeholder: "On this site we will be doing like loft conversion...",
  },
];

export const ROLEFIELD = [
  {
    name: "roleName",
    labelText: "Role Name",
    type: "text",
    helperText: "*This Name will appear be on Site Project.",
    placeholder: "Enter Role Name",
    validationOptions: {
      required: "Role Name is required",
    },
  },
  {
    name: "roleEmail",
    labelText: "Role Email",
    type: "email",
    helperText: "*Please enter a valid email address for this role.",
    placeholder: "Enter Role Email",
    inputMode: "email",
    validationOptions: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email format. Please check and try again.",
      },
    },
  },
  {
    name: "rolePhone",
    labelText: "Role Phone Number",
    type: "number",
    inputMode: "numeric",
    placeholder: "Enter Role Phone Number",
    validationOptions: {
      required: "Phone No. is required",
      pattern: {
        value: /^\d{10}$/,
        message: "Invalid phone number. Must be exactly 10 digits.",
      },
    },
  },
  {
    name: "roleType",
    labelText: "Role Type",
    type: "text",
    placeholder: "Enter Role Type",
    validationOptions: {
      required: "Role Type is required",
    },
  },
  {
    name: "projectSiteID",
    labelText: "Site Name",
    options: [],
    isSearch: true,
    size: true,
    selectLable: "Search site",
    validationOptions: { required: "Site Name is required" },
  },
];

export const ASSIGNSITEFIELD = [
  {
    name: "roleId",
    labelText: "Employe Name",
    options: [],
    isSearch: true,
    size: true,
    selectLable: "Search Name",
    validationOptions: { required: "Employee Name is required" },
  },
  {
    name: "projectSiteID",
    labelText: "Site Name",
    options: [],
    isSearch: true,
    size: true,
    selectLable: "Search site",
    validationOptions: { required: "Site Name is required" },
  },
  {
    name: "startDate",
    labelText: "Start Date",
    type: "date",
    placeholder: "Start Date",
    validationOptions: {
      required: "Start Date is required",
    },
  },
];

export const CONSTANTROLETABLE = [
  {
    id: 1,
    title: "id",
  },
  {
    id: 2,
    title: "Role Name",
  },
  {
    id: 3,
    title: "role type",
  },
  {
    id: 4,
    title: "site status",
  },
  {
    id: 5,
    title: "site name",
  },
  {
    id: 6,
    title: "status",
  },
  {
    id: 7,
    title: "Actions",
  },
];

export const CONSTANTROLTYPETABLE = [
  {
    id: 1,
    title: "id",
  },
  {
    id: 2,
    title: "Role Type",
  },
  {
    id: 3,
    title: "Role status",
  },
  {
    id: 6,
    title: "status",
  },
  {
    id: 7,
    title: "Actions",
  },
];
export const CONSTANTSITETABLE = [
  {
    id: 1,
    title: "id",
  },
  {
    id: 2,
    title: "site Name",
  },
  {
    id: 3,
    title: "site status",
  },
  {
    id: 4,
    title: "site type",
  },
  {
    id: 5,
    title: "date",
  },
  {
    id: 6,
    title: "address",
  },
  {
    id: 7,
    title: "status",
  },
  {
    id: 8,
    title: "Actions",
  },
];

export const CONSTANTEMPLOYETABLE = [
  {
    id: 2,
    title: "Name",
  },
  {
    id: 3,
    title: "Phone",
  },
  {
    id: 4,
    title: "E.Type",
  },
  {
    id: 5,
    title: "Pay.type",
  },
  {
    id: 6,
    title: "payrate",
  },
  {
    id: 7,
    title: "country",
  },
  {
    id: 8,
    title: "status",
  },
  {
    id: 10,
    title: "Date",
  },
  {
    id: 9,
    title: "Actions",
  },
];

export const CONSTANTATTENDANCETABLE = [
  {
    id: 1,
    title: "Name",
  },
  {
    id: 2,
    title: "Pay rate",
  },
  {
    id: 3,
    title: "hours",
  },
  {
    id: 4,
    title: "Break Hours",
  },
  {
    id: 5,
    title: "Extra Hours",
  },
  {
    id: 6,
    title: "Total Hour",
  },
  {
    id: 7,
    title: "total pay",
  },
  {
    id: 8,
    title: "Date",
  },
  {
    id: 9,
    title: "Actions",
  },
];

export const CONSTANTOFFICEEMPLOYEE = [
  {
    id: 10,
    title: "ID",
  },
  {
    id: 1,
    title: "Name",
  },
  {
    id: 2,
    title: "Position",
  },
  {
    id: 3,
    title: "Department",
  },
  {
    id: 4,
    title: "email",
  },
  {
    id: 5,
    title: "phone",
  },
  {
    id: 7,
    title: "StartDate",
  },
  {
    id: 8,
    title: "Status",
  },
  {
    id: 9,
    title: "Actions",
  },
];

export const LOGINFIELD = [
  {
    name: "email",
    labelText: "Email Address",
    type: "email",
    helperText: "*Please enter a valid email address for this role.",
    placeholder: "Enter your email",
    inputMode: "email",
    size: true,
    validationOptions: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email format. Please check and try again.",
      },
    },
  },
  {
    name: "password",
    labelText: "Password",
    type: "password",
    placeholder: "******",
    size: true,
    validationOptions: {
      required: "password is required",
      minLength: {
        value: 6,
        message: "Minimum length should be 6 characters",
      },
    },
  },
];

export const OFFICEFIELD = [
  {
    name: "name",
    labelText: "Role Name",
    type: "text",
    helperText: "*This Name will appear be on Site Project.",
    size: true,
    placeholder: "Enter Role Name",
    validationOptions: {
      required: "Role Name is required",
    },
  },
  {
    name: "phoneNumber",
    labelText: "Role Phone Number",
    type: "number",
    inputMode: "numeric",
    placeholder: "Enter Role Phone Number",
    validationOptions: {
      required: "Phone No. is required",
      pattern: {
        value: /^\d{10}$/,
        message: "Invalid phone number. Must be exactly 10 digits.",
      },
    },
  },
  {
    name: "email",
    labelText: "Email Address",
    type: "email",
    helperText: "*Please enter a valid email address.",
    placeholder: "Enter your email",
    inputMode: "email",

    validationOptions: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email format. Please check and try again.",
      },
    },
  },
  {
    name: "department",
    labelText: "Role Department",
    type: "text",
    placeholder: "operation, office,business...",
    validationOptions: {
      required: "Role Department is required",
    },
  },
  {
    name: "roleType",
    labelText: "Role Type",
    options: [],
    isSearch: true,

    selectLable: "Search Type",
    validationOptions: { required: "Role Type is required" },
  },
  {
    name: "password",
    labelText: "Password",
    type: "password",
    placeholder: "******",
    validationOptions: {
      required: "password is required",
      minLength: {
        value: 6,
        message: "Minimum length should be 6 characters",
      },
    },
  },
  {
    name: "startDate",
    labelText: "Start Date",
    type: "date",
    placeholder: "Start Date",
    validationOptions: {
      required: "Start Date is required",
    },
  },
];
export const ROLETYPEFIELD = [
  {
    name: "roleTitle",
    labelText: "Role Name",
    type: "text",
    helperText: "*This Name will appear be on Site Project.",
    placeholder: "Enter Role Type",
    size: true,
    validationOptions: {
      required: "Role Type is required",
    },
  },
  {
    name: "roleDescription",
    labelText: "Role Description",
    size: true,
    type: "textarea",
    helperText: "*Describe Our Role Types",
    placeholder: "On this site we will be doing like loft conversion...",
  },
];
