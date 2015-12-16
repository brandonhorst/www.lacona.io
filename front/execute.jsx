import moment from 'moment'
require('moment-duration-format')
import React from 'react'

function intersperse (array, something) {
  if (array.length < 2) { return array }
  var result = [], i = 0, l = array.length
  if (typeof something == 'function') {
    for (; i < l; i ++) {
      if (i !== 0) { result.push(something()) }
      result.push(array[i])
    }
  }
  else {
    for (; i < l; i ++) {
      if (i !== 0) { result.push(something) }
      result.push(array[i])
    }
  }
  return result
}

function andify(array, separator = ',') {
  if (array.length === 1) {
    return array[0]
  } else if (array.length === 2) {
    return intersperse(array, ' and ')
  } else {
    return intersperse(array.slice(0, -1), `${separator} `).concat(`${separator} and `, _.last(array))
  }
}

const settingMap = {
  'shutdown': 'shutdown the computer',
  'restart': 'restart the computer',
  'log out': 'log out of the computer',
  'sleep': 'put the computer to sleep',
  'lock': 'lock the computer',
  'display-off': 'turn the display off',
  'screensaver': 'turn on the screensaver',
  'empty-trash': 'empty the trash'
}


export default function getExecute (showNotification) {
  if (global.location && global.location.hash === '#videodemo') return

  return function (result) {
    console.log(result)
    let message
    if (result.open) {
      if (result.open.verb === 'openin') {
        message = [<span className='category-action'>open </span>, outputifyOpen(result.open.items), ' in ', outputifyOpen(result.open.apps)]
      } else if (result.open) {
        if (result.open.verb === 'open') {
          message = outputifyDefaultOpen(result.open.items)
        } else if (result.open.verb === 'switch') {
          message = [<span className='category-action'>switch focus to </span>, outputifyOpen(result.open.items)]
        } else if (result.open.verb === 'close') {
          message = [<span className='category-action'>close the frontmost window of </span>, outputifyOpen(result.open.items)]
        } else if (result.open.verb === 'quit') {
          message = [<span className='category-action'>quit </span>, outputifyOpen(result.open.items)]
        } else if (result.open.verb === 'kill') {
          message = [<span className='category-action'>kill </span>, outputifyOpen(result.open.items)]
        }
      }
    } else if (result.date) {
      if (result.date.verb === 'remind') {
        let time

        if (result.date.date) {
          time = ['with an alert on ', formatDate(result.date.date)]
        } else {
          time = ['without an alert']
        }

        message = [<span className='category-action'>create a reminder</span>, ' called ', <span className='descriptor-reminder-title'>{result.date.title}</span>, ' ', time]
      } else if (result.date.verb === 'schedule') {
        let location
        if (result.date.location) location = [' with location ', <span className='descriptor-location'>{result.date.location}</span>, '']

        const time = formatDateRange(result.date.range)

        message = [<span className='category-action'>create an event</span>, ' called ', <span className='descriptor-calendar-event'>{result.date.title}</span>, ' ', location, ' on ', time]
      }
    } else if (result.settings) {
      let verb = result.settings.verb

      if (result.settings.direction === -1) {
        if (result.settings.verb === 'turn off') {
          verb = 'turn on'
        } else if (result.settings.verb === 'turn on') {
          verb = 'turn off'
        }
      }

      if (verb === 'turn on' || verb === 'turn off' || verb === 'toggle') {
        if (result.settings.duration) {
          message = [<span className='category-action'>{verb}</span>, ' ', <span className='descriptor-setting'>{result.settings.setting}</span>, ', wait ', formatDuration(result.settings.duration), ', and then change it back']
        } else {
          message = [<span className='category-action'>{verb}</span>, ' ', <span className='descriptor-setting'>{result.settings.setting}</span>]
        }
      } else {
        if (verb === 'eject') {
          const volumes = _.map(result.settings.volumes, volume => <span className='descriptor-volume'>{volume}</span>)
          message = [<span className='category-action'>{verb}</span>, ' ', andify(volumes)]
        } else {
          message = [<span className='category-action'>{settingMap[verb]}</span>]
        }
      }
    } else if (result.search) {
      if (result.search.engines.length === 1) {
        message = [<span className='category-action'>open</span>, ' a ', <span className='descriptor-search-engine'>{result.search.engines[0].name}</span>, ' search for ', <span className='descriptor-query'>{result.search.query}</span>, ' in ', <span className='descriptor-application'>the default browser</span>]
      } else {
        const enginePhrases = _.map(result.search.engines, ({name}) => <span className='descriptor-search-engine'>{name}</span>)
        const engines = andify(enginePhrases)
        message = [<span className='category-action'>open</span>, ' ', engines, ' searches for ', <span className='descriptor-query'>{result.search.query}</span>, ' in ', <span className='descriptor-application'>the default browser</span>]
      }
    } else if (result.play) {
      if (result.play.music) {
        const descriptions = _.map(result.play.music, ({song, album, artist, genre, playlist, composer}) => {
          if (song) {
            return [<span className='descriptor-song'>{song}</span>]
          } else if (album) {
            return ['all songs on ', <span className='descriptor-album'>{album}</span>]
          } else if (artist) {
            return ['all songs by ', <span className='descriptor-artist'>{artist}</span>]
          } else if (genre) {
            return ['all songs in the ', <span className='descriptor-genre'>{genre}</span>, ' genre']
          } else if (playlist) {
            return ['all songs in the ', <span className='descriptor-playlist'>{playlist}</span>, ' playlist']
          } else if (composer) {
            return ['all songs composed by ', <span className='descriptor-composer'>{composer}</span>]
          }
        })

        const allDescriptions = andify(descriptions)

        // if (result.play.shuffled) {
        //   message = [<span className='category-action'>play</span>, ' ', allDescriptions, ' ', <span className='descriptor-shuffled'>shuffled</span>, ' in ', <span className='descriptor-application'>iTunes</span>]
        // } else {
          message = [<span className='category-action'>play</span>, ' ', allDescriptions, ' in ', <span className='descriptor-application'>iTunes</span>]
        // }
      } else if (result.play.verb === 'play') {
        message = [<span className='category-action'>play</span>, ' ', <span className='category-argument5'>the current song</span>, ' in ', <span className='descriptor-application'>iTunes</span>]
      } else if (result.play.verb === 'next') {
        message = [<span className='category-action'>play</span>, ' ', <span className='category-argument5'>the next song</span>, ' in ', <span className='descriptor-application'>iTunes</span>]
      } else if (result.play.verb === 'previous') {
        message = [<span className='category-action'>play</span>, ' ', <span className='category-argument5'>the previous song</span>, ' in ', <span className='descriptor-application'>iTunes</span>]
      } else if (result.play.verb === 'stop') {
        message = [<span className='category-action'>stop</span>, ' the music in ', <span className='descriptor-application'>iTunes</span>]
      } else if (result.play.verb === 'pause') {
        message = [<span className='category-action'>pause</span>, ' the music in ', <span className='descriptor-application'>iTunes</span>]
      }

    } else if (result.contact) {
      if (result.contact.verb === 'email') {
        if (result.contact.subject) {
          message = [<span className='category-action'>start</span>, ' a new email to ', outputifyContacts(result.contact.to), ' with ', <span className='descriptor-subject'>{result.contact.subject}</span>, ' in the subject']
        } else {
          message = [<span className='category-action'>start</span>, ' a new email to ', outputifyContacts(result.contact.to)]
        }
      } else if (result.contact.verb === 'call') {
        message = [<span className='category-action'>call</span>, ' ', outputifyContacts(result.contact.to), ' through your iPhone']
      } else if (result.contact.verb === 'facetime') {
        message = [<span className='category-action'>call</span>, ' ', outputifyContacts(result.contact.to), ' using the ', <span className='descriptor-application'>FaceTime</span>, ' app']
      } else if (result.contact.verb === 'text') {
        // if (result.contact.text.message) {
        //   message = [<span className='category-action'>send</span>, ' ', <span className='descriptor-message'>{result.contact.text.message}</span>, ' to ', outputifyContacts(result.contact.text.to), ' using the ', <span className='descriptor-application'>Messages</span>, ' app']
        // } else {
          message = [<span className='category-action'>open</span>, ' ', <span className='descriptor-application'>Messages</span>, ' to a conversation with ', outputifyContacts(result.contact.to)]
        // }
      }
    } else if (result.translate) {
      console.log(result.translate)
      if (result.translate.to && result.translate.to.length > 1) {
        const languages = _.map(result.translate.to, lang => <span className='descriptor-language'>{lang.name}</span>)

        message = [<span className='category-action'>load </span>, 'translations of ', <span className='descriptor-phrase'>{result.translate.phrase}</span>, ' from ', <span className='descriptor-language'>{(result.translate.from && result.translate.from.name) || 'an auto-detected language'}</span>, ' to ', andify(languages), ' in ', <span className='descriptor-application'>the default browser</span>]
      } else {
        message = [<span className='category-action'>load </span>, 'a translation of ', <span className='descriptor-phrase'>{result.translate.phrase}</span>, ' from ', <span className='descriptor-language'>{(result.translate.from && result.translate.from.name) || 'an auto-detected language'}</span>, ' to ', <span className='descriptor-language'>{(result.translate.to && result.translate.to[0].name) || 'English'}</span>, ' in ', <span className='descriptor-application'>the default browser</span>]
      }
    }

    if (message == null) {
      message = 'something went wrong with: ' + JSON.stringify(result)
    }

    showNotification(message)
  }
}

function formatDate (datetime) {
  if (_.isDate(datetime)) {
    return [<span className='descriptor-date'>{moment(datetime).format('dddd, MMMM Do, YYYY')}</span>, ' at ', <span className='descriptor-time'>{moment(datetime).format('h:mma')}</span>]
  } else if (_.isArray(datetime)) {
      return [<span className='descriptor-offset'>{datetime[0]}</span>, ' ', <span className='descriptor-date'>{datetime[1]}</span>]
  }
}

function formatDateAsRange (obj) {
  return formatDate(obj).concat(' that is ', <span className='descriptor-duration'>1 hour</span>, ' long')
}

function formatDateRange (obj) {
  const start = moment(obj.start)
  const end = moment(obj.end)
  if (obj.allday) {
    return ['all day ', <span className='descriptor-date'>{start.format('dddd, MMMM Do, YYYY')}</span>, ' to all day ', <span className='descriptor-date'>{end.format('dddd, MMMM Do, YYYY')}</span>]
  } else if (end.diff(start, 'days') === 0) {
    return [<span className='descriptor-date'>{start.format('dddd, MMMM Do, YYYY')}</span>, ' at ', <span className='descriptor-time'>{start.format('h:mma')}</span>, ' to  ', <span className='descriptor-time'>{end.format('h:mma')}</span>]
  } else {
    return [<span className='descriptor-date'>{start.format('dddd, MMMM Do, YYYY')}</span>, ' at ', <span className='descriptor-time'>{start.format('h:mma')}</span>, ' to  ', <span className='descriptor-date'>{end.format('dddd, MMMM Do, YYYY')}</span>, ' at ', <span className='descriptor-time'>{end.format('h:mma')}</span>]
  }
}

function formatDuration (obj) {
  if (obj.seconds) return <span className='descriptor-amount-of-time'>{obj.seconds} seconds</span>
  if (obj.minutes) return <span className='descriptor-amount-of-time'>{obj.minutes} minutes</span>
  if (obj.hours) return <span className='descriptor-amount-of-time'>{obj.hours} hours</span>
}

function outputifyContacts (objs) {
  const outputs = _.map(objs, colorizeContact)
  return andify(outputs)
}

function colorizeContact (obj) {
  if (obj.label === 'number' && _.isString(obj.value)) {
    return <span className='descriptor-phone-number'>{obj.value}</span>
  } else if (obj.label === 'email' && _.isString(obj.value)) {
    return <span className='descriptor-email-address'>{obj.value}</span>
  } else if (obj.value.label === 'relationship') {
    return <span className='descriptor-relationship'>{obj.value.value}</span>
  } else if (obj.value.label === 'contact') {
    return <span className='descriptor-contact'>{obj.value.value}</span>
  }
}

function colorizeOpen (obj) {
  if (obj.pref) {
    return <span className='descriptor-preference-pane'>{obj.pref}</span>
  } else if (obj.type === 'app') {
    return <span className='descriptor-application'>{obj.name}</span>
  } else if (obj.url) {
    return <span className='descriptor-url'>{obj.url}</span>
  } else if (obj.path) {
    return <span className='descriptor-file'>{obj.path}</span>
  }
}

function outputifyOpen (objs) {
  const outputs = _.map(objs, colorizeOpen)
  return andify(outputs)
}

function outputifyDefaultOpen (objs) {
  const groups = _.groupBy(objs, obj => obj.type || Object.keys(obj)[0])
  let message = []
  console.log(groups)
  if (groups.app) {
    message.push([<span className='category-action'>launch </span>, outputifyOpen(groups.app)])
  }
  if (groups.url) {
    message.push([<span className='category-action'>load </span>, outputifyOpen(groups.url), ' in ', <span className='descriptor-application'>the default browser</span>])
  }
  if (groups.path) {
    message.push([<span className='category-action'>open </span>, outputifyOpen(groups.path), ' in ', <span className='descriptor-application'>the default application</span>])
  }
  if (groups.pref) {
    message.push([<span className='category-action'>open </span>, ' the ', <span className='descriptor-preference-pane'>{groups.pref[0].pref} </span>, 'system preference pane'])
  }

  return andify(message, ';')
}


// export function execute(result) {
//   switch(result.action) {
//     case 'learn':
//         $('html, body').animate({scrollTop: $('content').offset().top - 90}, 400, 'swing')
//       break;
//     case 'subscribe':
//       $.ajax({
//         type: 'POST',
//         url: `${window.__env.APIROOT}subscribe`,
//         data: JSON.stringify({email: result.email}),
//         contentType: 'application/json'
//       }).then(() => {
//         this.setState({
//           noteMessage: `${result.email} was added to Newsletter. Check your email for confirmation.`,
//           noteVisible: true,
//           noteType: 'success'
//         })
//       }, error => {
//         const email = encodeURIComponent(result.email)
//         window.location.href = `http://lacona.us10.list-manage.com/subscribe?u=f923be23d36f00f457ea3b2c6&id=1db875d5ed&MERGE0=${email}`
//       })
//       break;
//     case 'tweet':
//       const message = encodeURIComponent(result.message)
//       window.open(`https://twitter.com/intent/tweet?text=${message}&via=lacona`, '_blank', 'menubar=1,resizable=1,width=550,height=420')
//     case 'share':
//       switch(result.platform) {
//         case 'facebook':
//             window.open('https://www.facebook.com/sharer/sharer.php?u=https://lacona.io', '_blank', 'width=550,height=231')
//           break;
//         case 'twitter':
//             window.open('https://twitter.com/intent/tweet?text=I%20tweeted%20this%20with%20Lacona&url=https%3A%2F%2Flacona.io', '_blank', 'menubar=1,resizable=1,width=550,height=420')
//           break;
//         case 'google-plus':
//             window.open('https://plus.google.com/share?url=https://lacona.io', '_blank', 'menubar=1,resizable=1,width=534,height=446')
//           break;
//         case 'email':
//             window.location.href = 'mailto:?&subject=Check out Lacona&body=The%20upcoming%20natural%20language%20command%20system%20for%20Mac.%0A%0Ahttps://lacona.io'
//           break;
//       }
//       break;
//     case 'follow':
//       window.open('https://twitter.com/intent/follow?screen_name=lacona&user_id=1963107458', '_blank', 'menubar=1,resizable=1,width=534,height=446')
//       break;
//     case 'fork':
//       window.open('https://github.com/lacona', '_blank')
//       break;
//     case 'contact':
//       switch (result.platform) {
//         case 'twitter':
//             window.open('https://twitter.com/intent/tweet?text=Hey%20%40lacona%2C%20', '_blank', 'menubar=1,resizable=1,width=550,height=420')
//           break;
//         case 'email':
//             window.location.href = 'mailto:app@lacona.io?Subject=Lacona%20Questions'
//           break;
//       }
//       break;
//     case 'change':
//       this.setState({theme: result.theme})
//       break;
//   }
// }
//
//
// export function select(result) {
//   if (result.action === 'change' && result.theme) {
//     this.setState({theme: result.theme})
//   }
// }
