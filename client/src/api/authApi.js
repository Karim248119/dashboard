import axios from "axios";
import { base_url } from "./config";
import { handelRemoteErros } from "../utilities/errorsHelpers";

export const apiAuthUser = async (endpoint, userDate, navigate, setErrors) => {
  try {
    const res = await axios.post(`${base_url}/${endpoint}`, userDate);
    return res.data;
  } catch (err) {
    handelRemoteErros(err, navigate, setErrors);
  }
};

// const handleApiRequest = (success, error, pend) {
//   success()
//   err
// }
