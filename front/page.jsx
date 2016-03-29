import _ from 'lodash'
import {all, open, date, settings, search, play, contact, translate} from './sentence.jsx'
import getExecute from './execute.jsx'
import Lacona from './lacona.jsx'
import React from 'react'
import { hashArgument } from 'react-lacona'

const MS_PER_INPUT = 10
const DOWNLOAD_LINK = 'http://lacona-download.firebaseapp.com/packages/0.5.0/LaconaBeta.zip'
const ISSUES_LINK = 'https://github.com/lacona/LaconaApp/issues'
const CHANGELOG_LINK = 'https://github.com/lacona/LaconaApp/blob/master/CHANGELOG.md'
const ABOUT_LINK = 'https://github.com/lacona/LaconaApp'

const CURRENT_VERSION = 'Beta 6'
const REQUIRED_VERSION = 'OSX 10.11 El Capitan'

const Lightbox = (props) => {
  return (
    <div className={`lightbox-total${props.visible ? ' visible' : ''}`}>
      <div className='lightbox-cover' onClick={props.hide} />
      <div className='lightbox'>
        <div tabIndex='0' className='closeButton' onClick={props.hide}>×</div>
        <h3>Cool, huh?</h3>
        <p className='description'>If this were a real copy of Lacona, it would {props.message}.</p>
        <Buttons check={!props.initialLoad} />
      </div>
    </div>
  )
}

function isOSX (userAgent) {
  return /Mac OS X 10/.test(userAgent);
}

function isOSX10_11Plus (userAgent) {
  return /Mac OS X 10_11/.test(userAgent);
}

const Buttons = ({check}) => {
  return (
    <div className='buttons'>
      <SubscribeButton />
      <FollowButton />
      <DownloadButton check={check} />
    </div>
  )
}

const SubscribeButton = () => {
  return (
    <div className='buttonContainer'>
      <a className='subscribeButton button' onClick={e => {window.open('http://eepurl.com/bjPRjD', '_blank', 'menubar=1,resizable=1,width=550,height=420'); e.preventDefault()}} href='http://eepurl.com/bjPRjD' target='_blank'>Subscribe</a>
      <ul>
        <li>~1 Email/Month</li>
      </ul>
    </div>
  )
}

const FollowButton = () => {
  return (
    <div className='buttonContainer'>
      <a className='followButton button' onClick={e => {window.open('https://twitter.com/intent/follow?screen_name=lacona&user_id=1963107458', '_blank', 'menubar=1,resizable=1,width=550,height=420'); e.preventDefault()}} href='https://twitter.com/intent/follow?screen_name=lacona&user_id=1963107458' target='_blank'>Follow</a>
      <ul>
        <li>@lacona on Twitter</li>
      </ul>
    </div>
  )
}

const DownloadButton = ({check = true} = {}) => {
  let button = <a className='downloadButton button' href={DOWNLOAD_LINK}>Download</a>
  if (check && global.navigator) {
    const userAgent = navigator.userAgent
    if (!isOSX10_11Plus(userAgent)) {
      if (!isOSX(userAgent)) {
        button = <a className='downloadButton warn button' href={DOWNLOAD_LINK}>OSX Only</a>
      } else {
        button = <a className='downloadButton warn button' href={DOWNLOAD_LINK}>OSX 10.11+</a>
      }
    }
  }

  return (
    <div className='buttonContainer'>
      {button}
      <ul>
        <li>{CURRENT_VERSION}</li>
        <li><a href={ISSUES_LINK} target='_blank'>Issues</a></li>
        <li><a href={CHANGELOG_LINK} target='_blank'>Changelog</a></li>
      </ul>
    </div>
  )
}

export default class Page extends React.Component {
  constructor () {
    super()

    this.state = {
      initialLoad: true,
      sticky: false
    }

    this.execute = getExecute(this.showLightbox.bind(this))
  }

  showLightbox (text) {
    this.setState({lightBoxVisible: true, lightBoxMessage: text})
  }

  hideLightBox () {
    this.setState({lightBoxVisible: false})
  }

  testSticky () {
    const contentPos = this.content.getBoundingClientRect()

    if (contentPos.top < 0 && !this.state.sticky) {
      this.setState({sticky: true})
    } else if (contentPos.top >= 0 && this.state.sticky) {
      this.setState({sticky: false})
    }
  }

  enableSticky () {
    window.addEventListener('scroll', this.testSticky.bind(this))
    this.testSticky()
  }

  componentDidMount () {
    window.addEventListener('keydown', this.checkEscape.bind(this))
    this.enableSticky()

    this.setState({initialLoad: false})
  }

  erase (done) {
    const input = this.lacona.getInput()

    for (let i = 0; i <= input.length; i++) {
      _.delay(() => {
        this.lacona.update(input.substr(0, (input.length - i)))
        this.lacona.focusEnd()
      }, i * MS_PER_INPUT / 2)
    }

    _.delay(() => {
      done()
    }, input.length * MS_PER_INPUT / 2)
  }

  type (content) {
    this.erase(() => {
      for (let i = 0; i < content.length; i++) {
        _.delay(() => {
          this.lacona.update(content.substr(0, i + 1), i === content.length - 1)
          this.lacona.focusEnd()
        }, i * MS_PER_INPUT)
      }
    })
  }

  checkEscape (event) {
    if (this.state.lightBoxMessage && (event.keyCode === 27 || event.keyCode === 13)) {
      this.hideLightBox()
      event.preventDefault()
      event.stopPropagation()
    }
  }

  render () {
    const isMobile = this.props.isMobile && !this.state.initialLoad
    const isDesktop = !this.props.isMobile && !this.state.initialLoad

    return (
      <div className={`page`}>
        <header>
          <h1>Lacona</h1>
          <p>Call up Lacona with a keyboard shortcut and type whatever you want to do. It gives intelligent suggestions as you type and then follows your orders.</p>
          <Buttons check={!this.state.initialLoad} />
        </header>

        {isMobile ? (
          <div className='disclaimer'>
            <p>Lacona is designed for use with a keyboard on a full desktop operating system. For the full experience, visit this page on your computer!</p>
          </div>
        ) : undefined}
        {isDesktop ? (
          <div className={`lacona-demo${this.state.sticky ? ' sticky' : ''}`}>
            <Lacona
              onFocus={() => {}}
              onBlur={() => {}}
              execute={this.execute}
              ref={c => this.lacona = c}
              tryMe={true}
              tabIndex={1} />
          </div>
        ) : undefined}

        <content ref={c => this.content = c}>
          <section>
            <div className='text'>
              <a name='open' className='anchor'><h3>Ditch the Dock</h3></a>
              <p>With Lacona, your Apps, Bookmarks, Files, System Preferences, and more are only a few keystrokes away. You can also manage your open apps right from your keyboard.</p>
              <ul className='examples'>
                <li onClick={!isMobile ? this.type.bind(this, 'open Calendar') : undefined}>
                  <span className='category-action'>open</span> <span className={`category-argument${hashArgument('application')}`}>Calendar</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'open Parental Controls') : undefined}>
                  <span className='category-action'>open</span> <span className={`category-argument${hashArgument('preference pane')}`}>Parental Controls</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'open Facebook and Twitter') : undefined}>
                  <span className='category-action'>open</span> <span className={`category-argument${hashArgument('bookmark')}`}>Facebook</span> <span className='category-conjunction'>and</span> <span className={`category-argument${hashArgument('bookmark')}`}>Twitter</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'iTunes') : undefined}>
                  <span className={`category-argument${hashArgument('application')}`}>iTunes</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'quit Safari') : undefined}>
                  <span className='category-action'>quit</span> <span className={`category-argument${hashArgument('application')}`}>Safari</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'open lacona.io in Safari and Firefox') : undefined}>
                  <span className='category-action'>open</span> <span className={`category-argument${hashArgument('URL')}`}>lacona.io</span> <span className='category-conjunction'>in</span> <span className={`category-argument${hashArgument('application')}`}>Safari</span> <span className='category-conjunction'>and</span> <span className={`category-argument${hashArgument('application')}`}>Firefox</span>

                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'switch to Messages') : undefined}>
                  <span className='category-action'>switch to</span> <span className={`category-argument${hashArgument('application')}`}>Messages</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'open kickstarter.com') : undefined}>
                  <span className='category-action'>open</span> <span className={`category-argument${hashArgument('URL')}`}>kickstarter.com</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'open ~/Downloads/Lacona.dmg') : undefined}>
                  <span className='category-action'>open</span> <span className={`category-argument${hashArgument('path')}`}>~/Downloads/Lacona.dmg</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'open Gmail and Reminders and calendar.google.com') : undefined}>
                  <span className='category-action'>open</span> <span className={`category-argument${hashArgument('bookmark')}`}>Gmail</span><span className='category-conjunction'> and </span><span className={`category-argument${hashArgument('application')}`}>Reminders</span><span className='category-conjunction'> and </span><span className={`category-argument${hashArgument('URL')}`}>calendar.google.com</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'lifehacker.com') : undefined}>
                  <span className={`category-argument${hashArgument('URL')}`}>lifehacker.com</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'close Reminders') : undefined}>
                  <span className='category-action'>close</span> <span className={`category-argument${hashArgument('application')}`}>Reminders</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'open todo.txt') : undefined}>
                  <span className='category-action'>open</span> <span className={`category-argument${hashArgument('file')}`}>todo.txt</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'open my-document.docx with Pages') : undefined}>
                  <span className='category-action'>open</span> <span className={`category-argument${hashArgument('file')}`}>my-document.docx</span> <span className='category-conjunction'>with</span> <span className={`category-argument${hashArgument('application')}`}>Pages</span>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <div className='text'>
              <a name='date' className='anchor'><h3>Organize your Life, not your Calendar</h3></a>
              <p>Create reminders and schedule events as though you were talking to a person. Lacona understands. You can even use birthdays and anniversarys in your commands. It's natural!</p>
              <ul className='examples'>
                <li onClick={!isMobile ? this.type.bind(this, 'schedule Party at 7pm Friday') : undefined}>
                  schedule <span className={`category-argument${hashArgument('calendar event')}`}>Party</span> at <span className={`category-argument${hashArgument('time')}`}>7pm</span> <span className={`category-argument${hashArgument('date')}`}>Friday</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'remind me to Pick up the car September 12 at 11:30am') : undefined}>
                  <span className='category-action'>remind me to</span> <span className={`category-argument${hashArgument('reminder title')}`}>Pick up the car</span> <span className={`category-argument${hashArgument('date')}`}>September 12</span> <span className='category-conjunction'>at</span> <span className={`category-argument${hashArgument('time')}`}>11:30am</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, "remind me to Buy a gift 2 weeks before my wife's birthday") : undefined}>
                  <span className='category-action'>remind me to</span> <span className={`category-argument${hashArgument('reminder title')}`}>Buy a gift</span> <span className={`category-argument${hashArgument('date')}`}>2 weeks before my wife's birthday</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'schedule Vacation 10a Monday to 6:30p Thursday') : undefined}>
                  <span className='category-action'>schedule</span> <span className={`category-argument${hashArgument('calendar event')}`}>Vacation</span> <span className={`category-argument${hashArgument('time')}`}>10a</span> <span className={`category-argument${hashArgument('date')}`}>Monday</span> <span className='category-conjunction'>to</span> <span className={`category-argument${hashArgument('time')}`}>6:30p</span> <span className={`category-argument${hashArgument('date')}`}>Thursday</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'remind me to Buy a gift 7 days before 12/1') : undefined}>
                  <span className='category-action'>remind me to</span> <span className={`category-argument${hashArgument('reminder title')}`}>Buy a gift</span> <span className={`category-argument${hashArgument('date')}`}>7 days before 12/1</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'remind me to Call Jenny') : undefined}>
                  <span className='category-action'>remind me to</span> <span className={`category-argument${hashArgument('reminder title')}`}>Call Jenny</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'schedule Ski Trip next Friday to Sunday') : undefined}>
                  <span className='category-action'>schedule</span> <span className={`category-argument${hashArgument('calendar event')}`}>Ski Trip</span> <span className={`category-argument${hashArgument('date')}`}>Next Friday</span> to <span className={`category-argument${hashArgument('date')}`}>Sunday</span>
                </li>
                <li onClick={!isMobile ? this.type.bind(this, 'remind me to Charge my phone at 9pm') : undefined}>
                  <span className='category-action'>remind me to</span> <span className={`category-argument${hashArgument('reminder title')}`}>Charge my phone</span> <span className='category-conjunction'>at</span> <span className={`category-argument${hashArgument('time')}`}>9pm</span>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <a name='settings' className='anchor'><h3>Setting Settings, Settled</h3></a>
            <p>With Lacona, there is no need to fiddle with menus and forms to change your basic settings. Turn off your Wifi, turn on Do Not Disturb, eject drives, or even restart your computer with just a few keystrokes. You can set time limits on settings, so you won't forget to change them back.</p>
            <ul className='examples'>
              <li onClick={!isMobile ? this.type.bind(this, 'turn on wifi') : undefined}>
                <span className='category-action'>turn on</span> <span className={`category-argument${hashArgument('setting')}`}>wifi</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'toggle Do Not Disturb') : undefined}>
                <span className='category-action'>toggle</span> <span className={`category-argument${hashArgument('setting')}`}>bluetooth</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'shutdown') : undefined}>
                <span className='category-action'>shutdown</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'eject Lacona.dmg') : undefined}>
                <span className='category-action'>eject</span> <span className={`category-argument${hashArgument('volume')}`}>Lacona.dmg</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'turn off display') : undefined}>
                <span className='category-action'>turn off display</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'empty Trash') : undefined}>
                <span className='category-action'>empty Trash</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'enable bluetooth') : undefined}>
                <span className='category-action'>enable</span> <span className={`category-argument${hashArgument('setting')}`}>bluetooth</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'turn on do not disturb for 25 minutes') : undefined}>
                <span className='category-action'>turn on</span> <span className={`category-argument${hashArgument('setting')}`}>do not disturb</span> <span className='category-conjunction'>for</span> <span className={`category-argument${hashArgument('time duration')}`}>25 minutes</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'turn on the screensaver') : undefined}>
                <span className='category-action'>turn on the screensaver</span>
              </li>
            </ul>
          </section>
          <section>
            <a name='search' className='anchor'><h3>Seek and Ye Shall Find</h3></a>
            <p>Search the web like a boss. Use powerful fallthrough functionality to save even more keystrokes. You can even search multiple sites with a single command.</p>
            <ul className='examples'>
              <li onClick={!isMobile ? this.type.bind(this, 'search Google for pictures of cats') : undefined}>
                <span className='category-action'>search</span> <span className={`category-argument${hashArgument('search engine')}`}>Google</span> <span className='category-conjunction'>for</span> <span className={`category-argument${hashArgument('query')}`}>pictures of cats</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'Google stormtroopers') : undefined}>
                <span className={`category-argument${hashArgument('search engine')}`}>Google</span> <span className={`category-argument${hashArgument('query')}`}>stormtroopers</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'Amazon Avengers') : undefined}>
                <span className={`category-argument${hashArgument('search engine')}`}>Amazon</span> <span className={`category-argument${hashArgument('query')}`}>Avengers</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'search Wikipedia for Pluto') : undefined}>
                <span className='category-action'>search</span> <span className={`category-argument${hashArgument('search engine')}`}>Wikipedia</span> <span className='category-conjunction'>for</span> <span className={`category-argument${hashArgument('query')}`}>Pluto</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'search eBay and Amazon for iPhone 6') : undefined}>
                <span className='category-action'>search</span> <span className={`category-argument${hashArgument('search engine')}`}>eBay</span> <span className='category-conjunction'>and</span> <span className={`category-argument${hashArgument('search engine')}`}>Amazon</span> <span className='category-conjunction'>for</span> <span className={`category-argument${hashArgument('query')}`}>iPhone 6</span>
              </li>
            </ul>
          </section>
          <section>
            <a name='play' className='anchor'><h3>Your Personal DJ</h3></a>
            <p>Instantly play anything in your iTunes library, without ever touching the mouse. Choose a bunch of songs or artists together to build an impromptu playlist. You can also control playback effortlessly.</p>
            <ul className='examples'>
              <li onClick={!isMobile ? this.type.bind(this, 'play Couch Potato') : undefined}>
                <span className='category-action'>play</span> <span className={`category-argument${hashArgument('song')}`}>Couch Potato</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'play Wild Life') : undefined}>
                <span className='category-action'>play</span> <span className={`category-argument${hashArgument('album')}`}>Wild Life</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'play next song') : undefined}>
                <span className='category-action'>play next song</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'play Walk the Moon') : undefined}>
                <span className='category-action'>play</span> <span className={`category-argument${hashArgument('artist')}`}>Walk the Moon</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'play Forever and I Bet My Life and Nicki Minaj') : undefined}>
                <span className='category-action'>play</span> <span className={`category-argument${hashArgument('album')}`}>Forever</span> and <span className={`category-argument${hashArgument('song')}`}>I Bet My Life</span> and <span className={`category-argument${hashArgument('artist')}`}>Nicki Minaj</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'play next song') : undefined}>
                <span className='category-action'>play next song</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'play Pop and Jazz') : undefined}>
                <span className='category-action'>play</span> <span className={`category-argument${hashArgument('genre')}`}>Pop</span> and <span className={`category-argument${hashArgument('genre')}`}>Jazz</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'pause') : undefined}>
                <span className='category-action'>pause</span>
              </li>
            </ul>
          </section>
          <section>
            <a name='contact' className='anchor'><h3>Keep in Touch</h3></a>
            <p>Easily communicate with all of your contacts over Email, FaceTime, and iMessage. Make calls and send texts through your iPhone. Smoke signals not yet supported.</p>
            <ul className='examples'>
              <li onClick={!isMobile ? this.type.bind(this, 'call Mom') : undefined}>
                <span className='category-action'>call</span> <span className={`category-argument${hashArgument('relationship')}`}>Mom</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'email Tony Stark') : undefined}>
                <span className='category-action'>email</span> <span className={`category-argument${hashArgument('contact')}`}>Tony Stark</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'email Dinner Plans to Clinton and Natalia') : undefined}>
                <span className='category-action'>email</span> <span className={`category-argument${hashArgument('subject')}`}>Dinner Plans</span> <span className='category-conjunction'>to</span> <span className={`category-argument${hashArgument('contact')}`}>Clinton</span> <span className='category-conjunction'>and</span> <span className={`category-argument${hashArgument('contact')}`}>Natalia</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'facetime my boss') : undefined}>
                <span className='category-action'>facetime</span> <span className={`category-argument${hashArgument('relationship')}`}>my boss</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'facetime Bruce Banner') : undefined}>
                <span className='category-action'>facetime</span> <span className={`category-argument${hashArgument('contact')}`}>Bruce Banner</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'call my Husband') : undefined}>
                <span className='category-action'>call</span> <span className={`category-argument${hashArgument('relationship')}`}>my Husband</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'email app@lacona.io') : undefined}>
                <span className='category-action'>email</span> <span className={`category-argument${hashArgument('email address')}`}>app@lacona.io</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'call +1 617 867 5309') : undefined}>
                <span className='category-action'>call</span> <span className={`category-argument${hashArgument('phone number')}`}>+1 617 867 5309</span>
              </li>
            </ul>
          </section>
          <section>
            <a name='translate' className='anchor'><h3>Become a Global Citizen</h3></a>
            <p>Quickly translate words, phrases, and websites between languages. It's the quickest, most natural interface for Google Translate.</p>
            <ul className='examples'>
              <li onClick={!isMobile ? this.type.bind(this, 'translate мороженное') : undefined}>
                <span className='category-action'>translate</span> <span className={`category-argument${hashArgument('phrase')}`}>мороженное</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'translate univision.com/') : undefined}>
                <span className='category-action'>translate</span> <span className={`category-argument${hashArgument('URL')}`}>univision.com</span>
                </li>
              <li onClick={!isMobile ? this.type.bind(this, 'translate 我爱你 to Korean') : undefined}>
                <span className='category-action'>translate</span> <span className={`category-argument${hashArgument('phrase')}`}>我爱你</span> <span className='category-conjunction'>to</span> <span className={`category-argument${hashArgument('language')}`}>Korean</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'translate ¿cómo estás? from Spanish to Japanese') : undefined}>
                <span className='category-action'>translate</span> <span className={`category-argument${hashArgument('phrase')}`}>como estas?</span> <span className='category-conjunction'>from</span> <span className={`category-argument${hashArgument('language')}`}>Spanish</span> <span className='category-conjunction'>to</span> <span className={`category-argument${hashArgument('language')}`}>Japanese</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, 'translate hujambo from Swahili') : undefined}>
                <span className='category-action'>translate</span> <span className={`category-argument${hashArgument('phrase')}`}>hujambo</span> <span className='category-conjunction'>from</span> <span className={`category-argument${hashArgument('language')}`}>Swahili</span>
              </li>
              <li onClick={!isMobile ? this.type.bind(this, "translate I don't know to Arabic, Chinese, French, Russian, and Spanish") : undefined}>
                <span className='category-action'>translate</span> <span className={`category-argument${hashArgument('phrase')}`}>I don't know</span> <span className='category-conjunction'>to</span> <span className={`category-argument${hashArgument('language')}`}>Arabic</span><span className='category-conjunction'>,</span> <span className={`category-argument${hashArgument('language')}`}>Chinese</span><span className='category-conjunction'>,</span> <span className={`category-argument${hashArgument('language')}`}>French</span><span className='category-conjunction'>,</span> <span className={`category-argument${hashArgument('language')}`}>Russian</span><span className='category-conjunction'>, and</span> <span className={`category-argument${hashArgument('language')}`}>Spanish</span>
              </li>
            </ul>
          </section>
          <section className='full'>
            <h3><a name='extensibility'>The Sky's the Limit</a></h3>
            <p>Lacona is built to be extended. An open Developer API gives it the power it do anything you need it to do, quickly and easily. Here are some ideas. <strong>Coming in March.</strong></p>
            <ul className='examples inactive'>
              <li><span className='category-action'>tweet</span> <span className='category-argument2'>just setting up my twttr #blessed</span></li>
              <li><span className='category-action'>skype</span> <span className={`category-argument${hashArgument('contact')}`}>Aaron</span></li>
              <li><span className='category-action'>email</span> <span className='category-argument0'>my last instagram picture</span> <span className='category-conjunction'>to</span> <span className={`category-argument${hashArgument('relationship')}`}>Mom</span></li>
              <li><span className='category-action'>calculate</span> <span className='category-argument3'>sqrt(5)</span></li>
              <li><span className='category-action'>turn off</span> <span className='category-argument5'>the kitchen lights</span></li>
              <li><span className='category-action'>pronounce</span> <span className='category-argument4'>indefatigable</span></li>
              <li><span className='category-action'>check</span> <span className='category-argument6'>APPL</span></li>
              <li><span className='category-action'>set</span> <span className='category-argument0'>default browser</span> <span className='category-conjunction'>to</span> <span className={`category-argument${hashArgument('application')}`}>Firefox</span></li>
              <li><span className='category-action'>set a timer</span> <span className='category-conjunction'>for</span> <span className='category-argument2'>25 minutes</span></li>
              <li><span className='category-action'>execute</span> <span className='category-argument5'>ps -ef | grep -i lacona</span></li>
              <li><span className='category-action'>email walking directions</span> <span className='category-conjunction'>from</span> <span className='category-argument6'>Penn Station NY</span> <span className='category-conjunction'>to</span> <span className='category-argument6'>my house</span> <span className='category-conjunction'>to</span> <span className={`category-argument${hashArgument('contact')}`}>Pepper Potts</span></li>
              <li><span className='category-action'>block</span> <span className={`category-argument${hashArgument('URL')}`}>reddit.com</span></li>
              <li><span className='category-action'>subscribe</span> <span className='category-conjunction'>to</span> <span className='category-argument0'>lifehacker</span></li>
              <li><span className='category-action'>paste</span> <span className='category-argument2'>my last tweet</span></li>
              <li><span className='category-action'>fork</span> <span className='category-argument1'>lacona/lacona</span></li>
              <li><span className='category-action'>define</span> <span className='category-argument4'>antediluvian</span></li>
              <li><span className='category-action'>roll</span> <span className='category-argument0'>d12</span></li>
              <li><span className='category-action'>find flights</span> <span className='category-conjunction'>from</span> <span className='category-argument6'>SFO</span> <span className='category-conjunction'>to</span> <span className='category-argument6'>BOS</span> <span className='category-conjunction'>on</span> <span className={`category-argument${hashArgument('date')}`}>8/6/2015</span></li>
              <li><span className='category-action'>yo</span> <span className={`category-argument${hashArgument('contact')}`}>THEDUDE</span></li>
              <li><span className='category-action'>set an alarm</span> <span className='category-conjunction'>for</span> <span className={`category-argument${hashArgument('time')}`}>6am</span> <span className='category-conjunction'>on</span> <span className={`category-argument${hashArgument('date')}`}>Christmas</span></li>
              <li><span className='category-action'>check the weather</span> <span className='category-conjunction'>in</span> <span className='category-argument2'>Boston</span></li>
            </ul>
          </section>
        </content>
        <footer>
          {isDesktop ? (
            <p>This page is only a demonstration of Lacona's interface. It cannot access your files, apps, calendar, or anything else on your computer.</p>
            )
          : null}
          <p>
            ©2016 Lacona Labs &mdash; <a href='mailto:app@lacona.io'>Email</a> // <a href='http://twitter.com/lacona' target='_blank'>Twitter</a> // <a href='http://github.com/laconalabs' target='_blank'>Github</a>
          </p>
        </footer>

        <Lightbox
          visible={this.state.lightBoxVisible}
          initialLoad={this.state.initialLoad}
          message={this.state.lightBoxMessage}
          hide={this.hideLightBox.bind(this)} />
      </div>
    )
  }
}
