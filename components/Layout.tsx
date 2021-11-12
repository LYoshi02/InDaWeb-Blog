import { ReactNode } from "react";
import { Header } from ".";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
