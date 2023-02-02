import * as Yup from "yup";

// Yup Personal Info Schema
export const personalInfoSchema = Yup.object().shape(
  {
    name: Yup.string().when("name", {
      is: (val) => val?.length,
      then: (rule) =>
        rule
          .min(2, "Name should have atleast 2 characters")
          .matches(
            /^[A-Za-z ]*$/,
            "Please enter valid name(it can only contain alphabets and spaces)"
          )
          .max(100),
    }),
    email: Yup.string().email("Invalid Email").notRequired(),
    title: Yup.string().notRequired(),
    contact: Yup.string().when("contact", {
      is: (val) => val?.length,
      then: (rule) =>
        rule
          .min(10, "Number should be of atleast 10 digits")
          .matches(/^[0-9 +-]*$/, "Please enter valid number")
          .max(13, "Number shouldn't be more than 13 digits"),
    }),
    address: Yup.string().notRequired(),
    summary: Yup.string().notRequired(),
  },
  [
    ["name", "name"],
    ["contact", "contact"],
  ]
);

// Education Schema
export const educationSchema = Yup.object().shape({
  isPresent: Yup.boolean().notRequired(),
  institution: Yup.string().required("This field is required."),
  degree: Yup.string().required("This field is required."),
});

// Employment Schema
export const employmentSchema = Yup.object().shape({
  company: Yup.string().required("This field is required."),
  designation: Yup.string().required("This field is required."),
});

// Project Schema
export const projectsSchema = Yup.object().shape(
  {
    projectName: Yup.string().required("This field is required."),
    projectUrl: Yup.string().when("projectUrl", {
      is: (val) => val?.length,
      then: (rule) =>
        rule.matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Invalid URL!"
        ),
      otherwise: Yup.string().notRequired(),
    }),
  },
  [["projectUrl", "projectUrl"]]
);

// Certification Schema
export const certificationSchema = Yup.object().shape({
  type: Yup.string().required("This field is required."),
  title: Yup.string().required("This field is required."),
  authority: Yup.string().required("This field is required."),
});

// Skills Schema
export const skillsSchema = Yup.object().shape({
  skillTitle: Yup.string().required("This field is required."),
  skills: Yup.array(
    Yup.object({
      name: Yup.string().required("This field is required."),
      rating: Yup.number()
        .typeError("This field should be a number")
        .positive()
        .integer()
        .lessThan(6, "Rating cannot exceed above 5.")
        .moreThan(1, "Rating should be more than 1.")
        .required("This field is required."),
    })
  ),
});

// Miscellaneous Schema
export const miscSchema = Yup.object().shape(
  {
    linkedin: Yup.string().when("linkedin", {
      is: (val) => val?.length,
      then: (rule) =>
        rule.matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Invalid URL!"
        ),
      otherwise: Yup.string().notRequired(),
    }),
    github: Yup.string().when("github", {
      is: (val) => val?.length,
      then: (rule) =>
        rule.matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Invalid URL!"
        ),
      otherwise: Yup.string().notRequired(),
    }),
    portfolio: Yup.string().when("portfolio", {
      is: (val) => val?.length,
      then: (rule) =>
        rule.matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Invalid URL!"
        ),
      otherwise: Yup.string().notRequired(),
    }),
  },
  [
    ["linkedin", "linkedin"],
    ["github", "github"],
    ["portfolio", "portfolio"],
  ]
);
