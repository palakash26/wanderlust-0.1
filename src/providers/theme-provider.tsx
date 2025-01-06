import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#008080",
            borderRadius: 10,
          },
          components: {
            Button: {
              controlHeight: 42,
              defaultBorderColor: "#008080",
            },
            Input: {
              controlHeight: 42,
              activeShadow: "none",
              boxShadow: "none",
              colorBorder: "#ccc",
            },
            Select: {
              controlHeight: 42,
              boxShadow: "none",
              colorBorder: "#ccc",
              controlOutline: "none",
            },
          },
        }}
      >
        {" "}
        {children}
      </ConfigProvider>
    </div>
  );
}

export default ThemeProvider;
