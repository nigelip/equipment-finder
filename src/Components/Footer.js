import { Footer } from "antd/es/layout/layout";

const AppFooter = () => {
  return (
    <div className="appFooter">
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#574999",
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        This is a project made for AF members who enjoy exploring the many AF
        gyms islandwide.
      </Footer>
    </div>
  );
};

export default AppFooter;
