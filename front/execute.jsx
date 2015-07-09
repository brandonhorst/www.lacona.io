import moment from 'moment'
require('moment-duration-format')
import React from 'react/addons'

function intersperse(array, something) {
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

export default function getExecute (showNotification) {
  if (global.location && global.location.hash === '#videodemo') return

  return function (result) {
    let message
    if (result.open) {
      if (result.open.app && result.open.url) {
        message = [<span className='category-action'>load </span>, <span className='descriptor-url'>{result.open.url}</span>, ' in ', <span className='descriptor-application'>{result.open.app}</span>]
      } else if (result.open.app && result.open.file) {
        message = [<span className='category-action'>open </span>, <span className='descriptor-file'>{result.open.file}</span>, ' in ', <span className='descriptor-application'>{result.open.app}</span>]
      } else if (result.open.app) {
        if (result.open.verb === 'open') {
          message = [<span className='category-action'>launch </span>, <span className='descriptor-application'>{result.open.app}</span>]
        } else if (result.open.verb === 'switch') {
          message = [<span className='category-action'>switch focus to </span>, <span className='descriptor-application'>{result.open.app}</span>]
        } else if (result.open.verb === 'close') {
          message = [<span className='category-action'>close the frontmost window of </span>, <span className='descriptor-application'>{result.open.app}</span>]
        } else if (result.open.verb === 'quit') {
          message = [<span className='category-action'>quit </span>, <span className='descriptor-application'>{result.open.app}</span>]
        }
      } else if (result.open.file) {
        message = [<span className='category-action'>open </span>, <span className='descriptor-file'>{result.open.file}</span>, ' in ', <span className='descriptor-application'>the default application</span>]
      } else if (result.open.url) {
        message = [<span className='category-action'>load </span>, <span className='descriptor-url'>{result.open.url}</span>, ' in ', <span className='descriptor-application'>the default browser</span>]
      } else if (result.open.pref) {
        message = [<span className='category-action'>open </span>, ' the ', <span className='descriptor-preference-pane'>{result.open.pref}</span>, 'system preference pane']
      }
    } else if (result.date) {
      if (result.date.reminder) {
        let time

        if (result.date.reminder.datetime) {
          time = ['due ', <span className='descriptor-date-and-time'>{moment(result.date.reminder.datetime).format('dddd, MMMM Do, YYYY [at] h:mm a')}</span>]
        } else if (result.date.reminder.date) {
          time = ['due ', <span className='descriptor-date-and-time'>{moment(result.date.reminder.date).format('dddd, MMMM Do, YYYY')} at 9:00 am</span>]
        } else if (result.date.reminder.time) {
          time = ['due ', <span className='descriptor-date-and-time'>today at {moment(result.date.reminder.time).format('h:mm a')}</span>]
        } else {
          time = ['without a due date']
        }

        message = [<span className='category-action'>create a reminder</span>, ' called ', <span className='descriptor-reminder-title'>{result.date.reminder.title}</span>, ' ', time]
      } else if (result.date.event) {
        let location
        if (result.date.event.location) location = [' with location ', <span className='descriptor-location'>{result.date.event.location}</span>, '']

        let time
        if (result.date.event.datetime) {
          time = [<span className='descriptor-date'>{moment(result.date.event.datetime).format('dddd, MMMM Do, YYYY')}</span>, ' at ', <span className='descriptor-time'>{moment(result.date.event.datetime).format('h:mma')}</span>, ' that is ', <span className='descriptor-duration'>an hour</span>, ' long']
        } else if (result.date.event.period) {
          time = [<span className='descriptor-date'>{moment(result.date.event.period.start).format('dddd, MMMM Do, YYYY')}</span>, ' at ', <span className='descriptor-time'>{moment(result.date.event.period.start).format('h:mma')}</span>, ' that is ', <span className='descriptor-duration'>{moment.duration(result.date.event.period.duration).format('Y [years], M [months], D [days], H [hours] [and] m [minutes]')}</span>, ' long']
        }

        message = [<span className='category-action'>create an event</span>, ' called ', <span className='descriptor-calendar-event'>{result.date.event.title}</span>, ' ', location, ' on ', time]
      }
    } else if (result.search) {
      if (result.search.engines.length === 1) {
        message = [<span className='category-action'>open</span>, ' a ', <span className='descriptor-search-engine'>{result.search.engines[0]}</span>, ' search for ', <span className='descriptor-query'>{result.search.query}</span>, ' in ', <span className='descriptor-application'>the default browser</span>]
      } else {
        const enginePhrases = _.map(result.search.engines, engine => <span className='descriptor-search-engine'>{engine}</span>)
        const engines = result.search.engines.length === 2 ?
          intersperse(enginePhrases, ' and ') :
          [intersperse(enginePhrases.slice(0, -1), ', '), ', and ', _.last(enginePhrases)]
        message = [<span className='category-action'>open</span>, ' ', engines, ' searches for ', <span className='descriptor-query'>{result.search.query}</span>, ' in ', <span className='descriptor-application'>the default browser</span>]

      }
    } else if (result.play) {
      if (result.play.something) {
        const descriptions = _.map(result.play.something, thing => {
          if (thing.song) {
            return [<span className='descriptor-song'>{thing.song}</span>]
          } else if (thing.album) {
            return ['all songs on ', <span className='descriptor-album'>{thing.album}</span>]
          } else if (thing.artist) {
            return ['all songs by ', <span className='descriptor-artist'>{thing.artist}</span>]
          } else if (thing.genre) {
            return ['all songs in the ', <span className='descriptor-genre'>{thing.genre}</span>, ' genre']
          } else if (thing.playlist) {
            return ['all songs in the ', <span className='descriptor-playlist'>{thing.playlist}</span>, ' playlist']
          } else if (thing.composer) {
            return ['all songs composed by ', <span className='descriptor-composer'>{thing.composer}</span>]
          }
        })

        let allDescriptions
        if (descriptions.length === 1) {
          allDescriptions = descriptions[0]
        } else if (descriptions.length === 2) {
          allDescriptions = intersperse(descriptions, ' and ')
        } else {
          allDescriptions = [intersperse(descriptions.slice(0, -1), ', '), ', and ', _.last(descriptions)]
        }
        if (result.play.shuffled) {
          message = [<span className='category-action'>play</span>, ' ', allDescriptions, ' ', <span className='descriptor-shuffled'>shuffled</span>, ' in ', <span className='descriptor-application'>iTunes</span>]
        } else {
          message = [<span className='category-action'>play</span>, ' ', allDescriptions, ' in ', <span className='descriptor-application'>iTunes</span>]
        }
      } else if (result.play.next) {
        message = [<span className='category-action'>play</span>, ' ', <span className='category-argument5'>the next song</span>, ' in ', <span className='descriptor-application'>iTunes</span>]
      } else if (result.play.previous) {
        message = [<span className='category-action'>play</span>, ' ', <span className='category-argument5'>the previous song</span>, ' in ', <span className='descriptor-application'>iTunes</span>]
      } else if (result.play.stop) {
        message = [<span className='category-action'>stop</span>, ' the music in ', <span className='descriptor-application'>iTunes</span>]
      } else if (result.play.pause) {
        message = [<span className='category-action'>pause</span>, ' the music in ', <span className='descriptor-application'>iTunes</span>]
      }

    } else if (result.contact) {
      if (result.contact.email) {
        if (result.contact.email.message) {
          message = [<span className='category-action'>start</span>, ' a new email to ', <span className='descriptor-relationship'>{result.contact.email.relationship}</span>, <span className='descriptor-contact'>{result.contact.email.contact}</span>, <span className='descriptor-email-address'>{result.contact.email.address}</span>, ' with ', <span className='descriptor-message'>{result.contact.email.message}</span>, ' in the subject']
        } else {
          message = [<span className='category-action'>start</span>, ' a new email to ', <span className='descriptor-relationship'>{result.contact.email.relationship}</span>, <span className='descriptor-contact'>{result.contact.email.contact}</span>, <span className='descriptor-email-address'>{result.contact.email.address}</span>]
        }
      } else if (result.contact.call) {
        message = [<span className='category-action'>call</span>, ' ', <span className='descriptor-phone-number'>{result.contact.call.number}</span>, <span className='descriptor-relationship'>{result.contact.call.relationship}</span>, <span className='descriptor-contact'>{result.contact.call.contact}</span>, ' through your iPhone']
      } else if (result.contact.facetime) {
        message = [<span className='category-action'>call</span>, ' ', <span className='descriptor-phone-number'>{result.contact.facetime.number}</span>, <span className='descriptor-relationship'>{result.contact.facetime.relationship}</span>, <span className='descriptor-email-address'>{result.contact.facetime.address}</span>, <span className='descriptor-contact'>{result.contact.facetime.contact}</span>, ' using the ', <span className='descriptor-application'>FaceTime</span>, ' app']
      } else if (result.contact.text) {
        if (result.contact.text.message) {
          message = [<span className='category-action'>send</span>, ' ', <span className='descriptor-message'>{result.contact.text.message}</span>, ' to ', <span className='descriptor-phone-number'>{result.contact.text.number}</span>, <span className='descriptor-relationship'>{result.contact.text.relationship}</span>, <span className='descriptor-contact'>{result.contact.text.contact}</span>, <span className='descriptor-email-address'>{result.contact.text.address}</span>, ' using the ', <span className='descriptor-application'>Messages</span>, ' app']
        } else {
          message = [<span className='category-action'>open</span>, ' ', <span className='descriptor-application'>Messages</span>, 'to a conversation with ', <span className='descriptor-phone-number'>{result.contact.text.number}</span>, <span className='descriptor-relationship'>{result.contact.text.relationship}</span>, <span className='descriptor-contact'>{result.contact.text.contact}</span>, <span className='descriptor-email-address'>{result.contact.text.address}</span>]
        }
      }
    }

    if (message == null) {
      message = 'something went wrong with: ' + JSON.stringify(result)
    }

    showNotification(message)

    // showNotification(`Now, Lacona would ${message}. `)
  }
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
