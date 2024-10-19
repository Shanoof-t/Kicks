import * as Yup from "yup";
export const loginValidation = (user) =>
  Yup.object({
    email: Yup.string()
      .required("Please enter your email")
      .test(
        "email-checking-registed-or-not",
        "Your email is incorrect",
        function () {
          const { email } = this.parent;
          const matchedUser = user.find((obj) => obj.email === email);
          if (matchedUser === undefined) return false;
          return true;
        }
      ),
    password: Yup.string().required("Please enter your password"),
  });
