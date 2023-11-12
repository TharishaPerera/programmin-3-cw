import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="px-28 py-28 flex items-center justify-center ">
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
