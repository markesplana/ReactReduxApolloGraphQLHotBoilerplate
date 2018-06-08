import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'components'
import { renderRoutes } from 'react-router-config'
import 'antd/dist/antd.css'

const App = ({ route }) => (
  <div>
    {renderRoutes(route.routes)}
  </div>
)

App.propTypes = {
  route: PropTypes.any, // eslint-disable-line
}

export default App
