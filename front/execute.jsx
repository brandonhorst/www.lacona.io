import React from 'react'
import { hashArgument } from 'react-lacona'

export default function getExecute (showNotification) {
  if (global.location && global.location.hash === '#videodemo') return

  return function (words) {
    const message = _.map(words, ({text, category, argument}, index) => {
      if (argument) {
        category = `argument${hashArgument(argument)}`
      }
      return <span className={`category-${category}`} key={index}>{text}</span>
    })

    showNotification(message)
  }
}
