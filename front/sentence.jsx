/** @jsx createElement */

process.env.LACONA_ENV = 'demo'

import { demoData } from './demo-config'
global.demoData = demoData

import { createElement } from 'elliptical'

import { extensions as communicate } from 'lacona-communicate'
import { extensions as events } from 'lacona-events'
import { extensions as itunes } from 'lacona-itunes'
import { extensions as searchInternet } from 'lacona-search-internet'
import { extensions as finder } from 'lacona-finder'
import { extensions as osx } from 'lacona-osx'
import { extensions as settings } from 'lacona-settings'
import { extensions as translate } from 'lacona-translate'
import { extensions as command, Command } from 'lacona-command'

export const grammar = <Command />

export const extensions = [].concat(communicate, events, itunes, searchInternet, finder, osx, settings, translate, command)
