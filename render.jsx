import Page from './front/page.jsx'
import {renderToString} from 'react-dom/server'
import React from 'react'
import {readFileSync, writeFileSync} from 'fs'

const string = renderToString(<Page isMobile={false} />)
const template = readFileSync('./front/index.html', 'utf-8')
const combined = template.replace('<!-- @include server -->', string)

writeFileSync('./public/index.html', combined)
