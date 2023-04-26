import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../router/paths";
function Login() {
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup.string().required("email is required"),
    password: yup
      .string()
      .min(4, "minimum characters should be 4")
      .required("password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        data
      );
      const userData = {
        email: response.data.user.email,
        token: response.data.token,
      };
      console.log("LOGIN FORM DATA: ", userData);
      localStorage.setItem("auth", userData.token);
      dispatch(login(userData));
      navigate(PATHS.createTasks);
    } catch (err) {
      console.log(err);
    }
  };

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-base-50">
        <div className="w-1/3 h-auto bg-base-200 rounded-lg p-4 shadow-md">
          <h1 className="text-4xl text-center py-4 text-info font-semibold">
            TASKS LOGIN
          </h1>
          <div className="w-full flex flex-col gap-4 p-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                defaultValue={"test1@abc.com"}
                {...register("email")}
                type="email"
                className="input-info input w-full"
              />
              <p className="text-rose-600 font-semibold">
                {errors.email?.message}
              </p>
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className="input-info input w-full"
              />
              <p className="text-rose-600 font-semibold">
                {errors.password?.message}
              </p>
              <button className="btn btn-info">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
