import Navbar from "./navbar";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <div>
        <Navbar />
        <div className="layoutChild">{children}</div>
      </div>
    </>
  );
};
export default Layout;
