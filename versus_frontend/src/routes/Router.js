import { Switch, Route } from 'react-router-dom'
import Routes from './routes'
const Router = () => {

  return (
    <Switch>
      {Routes.map((route) => {
        return (
          <Route
            exact={!!route.exact}
            key={route.key}
            path={route.path}
            component={route.component}
          />
        )
      })}
    </Switch>
  )
}

export default Router
