import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { Layout, } from 'antd';
import 'antd/dist/antd.css';
import PageEditor from './pages/pageEditor';
import ProjectEditor from './pages/projectEditor'
import './App.css';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const { Header, Content, Footer, Sider } = Layout;





interface router {
  path: string,
  component?: React.ComponentType<any>
  routes?: Array<router>
}
const routers: Array<router> = [{
  path: '/pageEditor',
  component: PageEditor
}, {
  path: "/projectEditor",
  component: ProjectEditor
}]


const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header></Header>
      <DndProvider backend={Backend}>
        <Router>
            <Switch>
              {
                routers.map((route, i) => (
                  <Route
                    key={i}
                    path={route.path}
                    component={route.component}
                  />
                ))
              }
            </Switch>
          </Router>
			</DndProvider>
        
    </Layout>
    
  );
}


function RouteWithSubRoutes(route: router) {
  console.log(route)
  return (
    <Route
      path={route.path}
      component={route.component}
    />
  );
}

export default App;
