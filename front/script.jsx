import React from 'react/addons'
import Page from './page.jsx'
import isMobile from './detect'

React.render(<Page isMobile={isMobile} />, document.getElementById('page'))
