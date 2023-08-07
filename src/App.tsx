import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Menu } from "antd";
import {
  DashboardFilled,
  DashOutlined,
  OrderedListOutlined,
  TabletFilled
} from "@ant-design/icons";
import Dashboard from "./pages/dashboard";
import Category from "./pages/categories";
import Order from "./pages/orders";
import Home from "./pages/home";
import ViewCategory from "./pages/categories/view_category";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            routerProvider={routerBindings}
            resources={[]}
          >
            <Routes>
              <Route element={<Home />} path="/"></Route>
              <Route
                path="/view-category/:catrgoryId"
                element={<ViewCategory />}
              />
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Header={() => <Header sticky />}
                      Sider={(props, logout) => (
                        <ThemedSiderV2
                          render={(logout) => {
                            return (
                              <>
                                <Menu.Item
                                  key="dashboard"
                                  icon={<DashboardFilled />}
                                >
                                  <Link to={"/"}>Dashboard</Link>
                                </Menu.Item>

                                <Menu.Item
                                  key="categories"
                                  icon={<TabletFilled />}
                                >
                                  <Link to={"/categories"}>Categories</Link>
                                </Menu.Item>

                                <Menu.Item
                                  key="orders"
                                  icon={<OrderedListOutlined />}
                                >
                                  <Link to={"/orders"}>Orders</Link>
                                </Menu.Item>
                                {logout.logout}
                              </>
                            );
                          }}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/categories" element={<Category />} />

                <Route path="/orders" element={<Order />} />

                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
