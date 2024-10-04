import toast from "react-hot-toast";

export const handelRemoteErros = (err, navigate, setErrors, isNavigating) => {
  switch (err.status) {
    case 404:
      if (!isNavigating) {
        toast.error(err.response.data.message);
      } else {
        navigate("/notfound");
      }
      break;
    case 422:
      setErrors(err.response.data.errors);
      break;
    case 401:
      navigate("/auth");
      break;
    case 400:
      toast.error(err.response.data.message);
      break;
    case 500:
      toast.error("something went wrong!");
      break;
    default:
      toast.error("something went wrong!");
  }
};
