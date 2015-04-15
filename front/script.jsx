import React from 'react'
import Page from './page.jsx'
import isMobile from './detect'

React.render(<Page isMobile={isMobile} />, document.getElementById('page'))
