import * as Yup from "yup";
export const loginValidation = (user) =>
  Yup.object({
    email: Yup.string()
      .required("Please enter your email")
      .test(
        "email-checking-registed-or-not",
        "Your email is incorrect",
        function (value) {
          if (!value) return false;
          const { email } = this.parent;
          const matchedUser = user.find((obj) => obj.email === email);
          return matchedUser !== undefined;
        }
      ),
    password: Yup.string()
      .required("Please enter your password")
      .test(
        "password-checking-registed-or-not",
        "Your password is incorrect",
        function (value) {
          const { email } = this.parent;
          const matchedUser = user.find((obj) => obj.email === email);
          if (!matchedUser) return true;
          return matchedUser.password === value;
        }
      )
      .test("checking-blocked-or-not", function () {
        const { email, password } = this.parent;
        const matchedUser = user.find(
          (obj) => obj.email === email && obj.password === password
        );
        if (matchedUser && !matchedUser.isAllowed) {
          return this.createError({
            path: "blockError",
            message: "Authentication is Rejected",
          });
        }
        return true;
      }),
  });
