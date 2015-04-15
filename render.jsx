import Page from './front/page.jsx'
import preprocess from 'preprocess'
import React from 'react'
import {readFileSync, writeFileSync} from 'fs'

const string = React.renderToString(<Page />)
const template = readFileSync('./front/index.html', 'utf-8')
const combined = template.replace('<!-- @include server -->', string)

writeFileSync('./public/index.html', combined)