import React from 'react'
import Page from './page'
import isMobile from './detect'
import {render} from 'react-dom'

render(<Page isMobile={isMobile} />, document.getElementById('page'))
