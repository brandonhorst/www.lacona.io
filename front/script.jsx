import React from 'react'
import Page from './page.jsx'
import isMobile from './detect'
import {render} from 'react-dom'

render(<Page isMobile={isMobile} />, document.getElementById('page'))
