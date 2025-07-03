import { Outlet } from "react-router-dom";
import style from "./layout.module.css";
import { Layout } from "antd";

const { Content } = Layout;

function MainLayout() {
  return (
    <div className={style.layout}>
      <Layout className="layout">
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}

export default MainLayout;