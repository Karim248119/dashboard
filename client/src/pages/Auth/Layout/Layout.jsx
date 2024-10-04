import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <Outlet />
      <Toaster />
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
