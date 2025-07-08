import { Outlet } from "react-router-dom";
import style from "./layout.module.css";
import { Layout } from "antd";
import Header from "@components/header/header";

const { Content } = Layout;

function MainLayout() {
  return (
    <div className={style.layout}>
      <Layout className="layout">
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}

export default MainLayout;