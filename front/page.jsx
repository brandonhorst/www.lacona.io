import _ from 'lodash'
import {all, open, date, settings, search, play, contact, translate} from './sentence.jsx'
import eachSeries from 'async-each-series'
import ga, {Initializer} from 'react-google-analytics'
import getExecute from './execute.jsx'
import Lacona from './lacona.jsx'
import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

const MS_PER_INPUT = 10

const examples = [
  'open Calendar',
  'open Facebook',
  'open kickstarter.com',
  'open ~/Downloads/Lacona.dmg',
  'open todo.txt',
  'open my-document.docx with Pages',
  'open lacona.io in Safari',
  "schedule Dinner with Vicky at Sacco's Flatbread for 7pm tomorrow",
  'schedule Vacation 10a Monday to 6:30p Thursday',
  'remind me to Pick up the car September 12 at 11:30am',
  'remind me to Buy a gift 7 days before 12/1',
  'search Google for pictures of cats',
  'search Wikipedia for Pluto',
  'Google stormtroopers',
  'Amazon Avengers',
  'play Robot Love',
  'play Walk the Moon',
  'play Jason Derulo, Flyte, and Elle King',
  'play next song',
  'pause',
  'call Mom',
  'email Tony Stark',
  'email Dinner Plans to Peter Parker',
  'facetime Bruce Banner',
  'email app@lacona.io',
  'call +1 617 867 5309'
]

class Lightbox extends React.Component {
  render () {
    return (
      <div className='lightbox-total'>
        <div className='lightbox-cover' onClick={this.props.hide} />
        <div className='lightbox'>
          <div tabIndex='0' className='closeButton' onClick={this.props.hide}>×</div>
          <h3>Thanks for trying the Lacona demo!</h3>
          {this.props.detail ? <p className='well'>{this.props.detail}</p> : null}
          <p className='description'>If this were a real copy of Lacona, it would {this.props.message}.</p>
          <ShareSheet showBTCLightbox={this.props.showBTCLightbox} />
        </div>
      </div>
    )
  }
}

class BitcoinLightbox extends React.Component {
  render () {
    return (
      <div className='lightbox-total'>
        <div className='lightbox-cover' onClick={this.props.hide} />
        <div className='lightbox btc'>
          <div tabIndex='0' className='closeButton' onClick={this.props.hide}>×</div>
          <h3>Donate to development with Bitcoin</h3>
          <img className='qr-code' src='btc-qr.png' />
          <a className='btc-address' href='bitcoin:1PDi8uvM4ADkes28aJ98pUrVhnxDPWrWnx'>1PDi8uvM4ADkes28aJ98pUrVhnxDPWrWnx</a>
        </div>
      </div>
    )
  }
}

class ShareSheet extends React.Component {
  render () {
    return (
      <div className='share-sheet'>
        {this.props.includeTry ?
          <div className='share-item extend' onClick={this.props.focusTry}>
            <div className='share-desc'>
              Try
            </div>
            <div className='share-icons'>
              <img src='try.png' />
            </div>
          </div>
          : null
        }
        <div className='share-item'>
          <div className='share-desc'>
            Donate
          </div>
          <div className='share-icons'>
            <a href='https://www.paypal.me/lacona' target='_blank'><img src='paypal.png' /></a>
            <a onClick={this.props.showBTCLightbox}><img src='bitcoin.png' /></a>
          </div>
        </div>
        <a className='share-item' onClick={e => {window.open('https://twitter.com/intent/follow?screen_name=lacona&user_id=1963107458', '_blank', 'menubar=1,resizable=1,width=550,height=420'); e.preventDefault()}} href='https://twitter.com/intent/follow?screen_name=lacona&user_id=1963107458' target='_blank'>
          <div className='share-desc'>
            Follow
          </div>
          <div className='share-icons'>
            <img src='twitter.png' />
          </div>
        </a>
        <a className='share-item' onClick={e => {window.open('http://eepurl.com/bjPRjD', '_blank', 'menubar=1,resizable=1,width=550,height=420'); e.preventDefault()}} href='http://eepurl.com/bjPRjD' target='_blank'>
          <div className='share-desc'>
            Subscribe
          </div>
          <div className='share-icons'>
            <img src='email.png' />
          </div>
        </a>
        <div className='share-item'>
          <div className='share-desc'>
            Share
          </div>
          <div className='share-icons'>
            <a onClick={e => {window.open('https://www.facebook.com/sharer/sharer.php?u=http://lacona.io', '_blank', 'width=550,height=231'); e.preventDefault()}} href='https://www.facebook.com/sharer/sharer.php?u=http://lacona.io'><img src='facebook.png' /></a>
            <a onClick={e => {window.open('https://twitter.com/intent/tweet?text=Check%20out%20Lacona%20-%20Natural%20Language%20Commands%20for%20your%20Mac&url=http%3A%2F%2Flacona.io', '_blank', 'menubar=1,resizable=1,width=550,height=420'); e.preventDefault()}} href='https://twitter.com/intent/tweet?text=Check%20out%20Lacona%20-%20Natural%20Language%20Commands%20for%20your%20Mac&url=https%3A%2F%2Flacona.io'><img src='twitter.png' /></a>
            <a onClick={e => {window.open('https://plus.google.com/share?url=http://lacona.io', '_blank', 'width=550,height=231'); e.preventDefault()}} href='https://plus.google.com/share?url=http://lacona.io'><img src='googleplus.png' /></a>
          </div>
        </div>
      </div>
    )
  }
}
ShareSheet.defaultProps = {
  includeTry: false,
  focusTry: () => {},
  showBTCLightbox: () => {}
}

export default class Page extends React.Component {
  constructor () {
    super()

    this.state = {
      theme: 'theme-eighties-dark',
      initialLoad: true,
      demoRunning: true
    }

    this.execute = getExecute(this.showLightbox.bind(this))
  }

  showLightbox (text) {
    this.setState({lightBoxMessage: text})
  }

  hideLightBox () {
    this.setState({lightBoxMessage: null, lightBoxDetail: null})
  }

  showBTCLightbox() {
    this.setState({btcLightboxVisible: true})
  }

  hideBTCLightbox() {
    this.setState({btcLightboxVisible: false})
  }

  componentDidMount () {
    ga('create', 'UA-61643321-1', 'auto')
    ga('send', 'pageview')

    window.addEventListener('keydown', this.checkEscape.bind(this))

    this.setState({initialLoad: false})

    setTimeout(this.startDemo.bind(this), 2000)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.checkEscape.bind(this))
  }

  startDemo () {
    const shuffledExamples = _.shuffle(examples)
    this.demoRunning = true

    const shouldStop = () => !this.demoRunning

    eachSeries(shuffledExamples, (item, done) => {
      this.type('big', shouldStop, item, false)
      if (!shouldStop()) setTimeout(done, 7000)
    }, this.startDemo.bind(this))
  }

  stopDemo () {
    this.demoRunning = false
    // this.setState({demoRunning: false})
  }

  executeDate (date) {
    this.setState({lightBoxDetail: ["For the purpose of this demo, everyone's birthday is ", <a href='https://www.youtube.com/watch?v=SIQ2MrJImpI' target='_blank' className='nodifferent'>October 11</a>, '.']})
    this.execute({date})
  }

  erase (elem, shouldStop, focus = true, done = () => {}) {
    const input = elem.getInput()

    for (let i = 0; i <= input.length; i++) {
      _.delay(() => {
        if (shouldStop()) return
        elem.update(input.substr(0, (input.length - i)))
        if (focus) elem.focusEnd()
      }, i * MS_PER_INPUT / 2)
    }

    _.delay(() => {
      done()
    }, input.length * MS_PER_INPUT / 2)
  }

  type (ref, shouldStop, content, focus = true) {
    const elem = this.refs[ref]
    this.erase(elem, shouldStop, focus, () => {
      for (let i = 0; i < content.length; i++) {
        if (shouldStop()) return
        _.delay(() => {
          elem.update(content.substr(0, i + 1))
          if (focus) elem.focusEnd()
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

  focusTry () {
    this.stopDemo()
    this.erase(this.refs.big, () => false)
  }

  render () {
    return (
      <div className={`page ${this.props.isMobile ? 'mobile' : 'desktop'} theme-eighties-dark${this.state.initialLoad ? ' initial-load' : ''}`}>

        <header>
          <h1><a href='#' tabIndex='-1'>Lacona</a></h1>
          <h2 className='category-action highlighted'>Natural Language Commands for your Mac</h2>
          <p>Call up Lacona with a keypress, and type whatever you want to do. It gives intelligent suggestions as you type and then follows your orders.</p>
          <p>This page is just a demo of Lacona's power. The App is scheduled to launch in January, 2016.</p>
          <p>This demo still has some bugs. If you find one, report it on <a href='https://github.com/lacona/www.lacona.io' target='_blank'>GitHub</a> or <a href='https://twitter.com/lacona' target='_blank'>Twitter</a>. It will be fixed before Lacona launches.</p>
        </header>

        <content>
          <section className='full green'>
            <div className='text'>
              <p className='well mobileOnly'>
                Lacona is designed for use with a keyboard on a full desktop operating system, not for mobile devices. For the full experience, visit this page on your computer!
              </p>
              <ShareSheet includeTry={true} focusTry={this.focusTry.bind(this)} showBTCLightbox={this.showBTCLightbox.bind(this)} />
            </div>
          </section>
          <section className='full'>
            <Lacona
              userInteracted={this.stopDemo.bind(this)}
              grammar={all.grammar}
              extensions={all.extensions}
              execute={this.execute}
              ref='big'
              tryMe={true}
              tabIndex={1} />

          </section>
          <section className='textLeft'>
            <div className='text'>
              <a name='open' className='anchor'><h3>Ditch the Dock</h3></a>
              <p>With Lacona, your Apps, Bookmarks, Files, System Preferences, and more are only a few keystrokes away. You can also manage your open Mission Control Desktops, apps, windows, and browser tabs.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '0', () => false, 'open Calendar')}>
                  <span className='category-action'>open</span> <span className='descriptor-application'>Calendar</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open Parental Controls')}>
                  <span className='category-action'>open</span> <span className='descriptor-preference-pane'>Parental Controls</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open Facebook and Twitter')}>
                  <span className='category-action'>open</span> <span className='descriptor-bookmark'>Facebook</span> <span className='category-conjunction'>and</span> <span className='descriptor-bookmark'>Twitter</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'iTunes')}>
                  <span className='descriptor-application'>iTunes</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'quit Safari')}>
                  <span className='category-action'>quit</span> <span className='descriptor-application'>Safari</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open lacona.io in Safari and Firefox')}>
                  <span className='category-action'>open</span> <span className='descriptor-url'>lacona.io</span> <span className='category-conjunction'>in</span> <span className='descriptor-application'>Safari</span> <span className='category-conjunction'>and</span> <span className='descriptor-application'>Firefox</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'switch to Messages')}>
                  <span className='category-action'>switch to</span> <span className='descriptor-application'>Messages</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open kickstarter.com')}>
                  <span className='category-action'>open</span> <span className='descriptor-url'>kickstarter.com</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open ~/Downloads/Lacona.dmg')}>
                  <span className='category-action'>open</span> <span className='descriptor-path'>~/Downloads/Lacona.dmg</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open Gmail and Reminders and calendar.google.com')}>
                  <span className='category-action'>open</span> <span className='descriptor-bookmark'>Gmail</span><span className='category-conjunction'> and </span><span className='descriptor-application'>Reminders</span><span className='category-conjunction'> and </span><span className='descriptor-url'>calendar.google.com</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'lifehacker.com')}>
                  <span className='descriptor-url'>lifehacker.com</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'close Reminders')}>
                  <span className='category-action'>close</span> <span className='descriptor-application'>Reminders</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open todo.txt')}>
                  <span className='category-action'>open</span> <span className='descriptor-file'>todo.txt</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open my-document.docx with Pages')}>
                  <span className='category-action'>open</span> <span className='descriptor-file'>my-document.docx</span> <span className='category-conjunction'>with</span> <span className='descriptor-application'>Pages</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='0' grammar={open.grammar} extensions={open.extensions} execute={open => this.execute({open})} />
          </section>
          <section className='textRight'>
            <div className='text'>
              <a name='date' className='anchor'><h3>Organize your Life, not your Calendar</h3></a>
              <p>Create events and reminders as though you were talking to a person. Lacona understands.</p>
              <ul className='well'>
                <li>Due to browser limitations, this may sometimes be choppy.</li>
                <li>This demo US assumes date formats.</li>
              </ul>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '1', () => false, "schedule Dinner with Vicky at Sacco's Flatbread for 7pm tomorrow")}>
                  <span className='category-action'>schedule</span> <span className='descriptor-calendar-event'>Dinner with Vicky</span> <span className='category-conjunction'>at</span> <span className='descriptor-location'>Sacco's Flatbread</span> <span className='category-conjunction'>for</span> <span className='descriptor-time'>7pm</span> <span className='descriptor-date'>tomorrow</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'remind me to Pick up the car September 12 at 11:30am')}>
                  <span className='category-action'>remind me to</span> <span className='descriptor-reminder-title'>Pick up the car</span> <span className='descriptor-date'>September 12</span> <span className='category-conjunction'>at</span> <span className='descriptor-time'>11:30am</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, "remind me to Buy a gift 2 weeks before my wife's birthday")}>
                  <span className='category-action'>remind me to</span> <span className='descriptor-reminder-title'>Buy a gift</span> <span className='descriptor-offset'>2 weeks before</span> <span className='descriptor-birthday'>my Wife's birthday</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'schedule Vacation 10a Monday to 6:30p Thursday')}>
                  <span className='category-action'>schedule</span> <span className='descriptor-calendar-event'>Vacation</span> <span className='descriptor-time'>10a</span> <span className='descriptor-date'>Monday</span> <span className='category-conjunction'>to</span> <span className='descriptor-time'>6:30p</span> <span className='descriptor-date'>Thursday</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'schedule China trip from Native American Day to Veterans Day')}>
                  <span className='category-action'>schedule</span> <span className='descriptor-calendar-event'>China trip</span> <span className='category-conjunction'>from</span> <span className='descriptor-holiday'>Native American Day</span> <span className='category-conjunction'>to</span> <span className='descriptor-holiday'>Veterans Day</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'remind me to Buy a gift 7 days before 12/1')}>
                  <span className='category-action'>remind me to</span> <span className='descriptor-reminder-title'>Buy a gift</span> <span className='descriptor-offset'>7 days before</span> <span className='descriptor-date'>12/1</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'remind me to Call Jenny')}>
                  <span className='category-action'>remind me to</span> <span className='descriptor-reminder-title'>Call Jenny</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'remind me to Charge my phone at 9pm')}>
                  <span className='category-action'>remind me to</span> <span className='descriptor-reminder-title'>Charge my phone</span> <span className='category-conjunction'>at</span> <span className='descriptor-time'>9pm</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='1' grammar={date.grammar} extensions={date.extensions} execute={this.executeDate.bind(this)} />
          </section>
          <section className='textLeft'>
            <div className='text'>
              <a name='settings' className='anchor'><h3>Setting settings, settled</h3></a>
              <p>With Lacona, there is no need to fiddle with menus and forms to change your basic settings. Turn off your Wifi, turn on Do Not Disturb, or eject drives with just a few keystrokes. Set time limits on settings, so you don't forget to change them back.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '2', () => false, 'turn on wifi')}>
                  <span className='category-action'>turn on</span> <span className='descriptor-setting'>wifi</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'toggle Do Not Disturb')}>
                  <span className='category-action'>toggle</span> <span className='descriptor-setting'>Do Not Disturb</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'shutdown')}>
                  <span className='category-action'>shutdown</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'eject Lacona.dmg')}>
                  <span className='category-action'>eject</span> <span className='descriptor-volume'>Lacona.dmg</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'turn off display')}>
                  <span className='category-action'>turn off display</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'empty Trash')}>
                  <span className='category-action'>empty Trash</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'enable bluetooth')}>
                  <span className='category-action'>enable</span> <span className='descriptor-setting'>bluetooth</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'do not disturb for 25 minutes')}>
                  <span className='category-action'>do not disturb</span> <span className='category-conjunction'>for</span> <span className='descriptor-amount-of-time'>25 minutes</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'turn on the screensaver')}>
                  <span className='category-action'>turn on the screensaver</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='2' grammar={settings.grammar} extensions={settings.extensions} execute={settings => this.execute({settings})} />
          </section>
          <section className='textRight'>
            <div className='text'>
              <a name='search' className='anchor'><h3>Seek and Ye Shall Find</h3></a>
              <p>Search the web like a boss. Utilize powerful fallthrough functionality to save even more keystrokes.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '3', () => false, 'search Google for pictures of cats')}>
                  <span className='category-action'>search</span> <span className='descriptor-search-engine'>Google</span> <span className='category-conjunction'>for</span> <span className='descriptor-query'>pictures of cats</span>
                </li>
                <li onClick={this.type.bind(this, '3', () => false, 'Google stormtroopers')}>
                  <span className='descriptor-search-engine'>Google</span> <span className='descriptor-query'>stormtroopers</span>
                </li>
                <li onClick={this.type.bind(this, '3', () => false, 'Amazon Avengers')}>
                  <span className='descriptor-search-engine'>Amazon</span> <span className='descriptor-query'>Avengers</span>
                </li>
                <li onClick={this.type.bind(this, '3', () => false, 'search Wikipedia for Pluto')}>
                  <span className='category-action'>search</span> <span className='descriptor-search-engine'>Wikipedia</span> <span className='category-conjunction'>for</span> <span className='descriptor-query'>Pluto</span>
                </li>
                <li onClick={this.type.bind(this, '3', () => false, 'search eBay and Amazon for iPhone 6')}>
                  <span className='category-action'>search</span> <span className='descriptor-search-engine'>eBay</span> <span className='category-conjunction'>and</span> <span className='descriptor-search-engine'>Amazon</span> <span className='category-conjunction'>for</span> <span className='descriptor-query'>iPhone 6</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='3' grammar={search.grammar} execute={search => this.execute({search})} />
          </section>
          <section className='textLeft'>
            <div className='text'>
              <a name='play' className='anchor'><h3>Your Work Needs a DJ</h3></a>
              <p>Instantly play anything in your iTunes library, without ever touching the mouse.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '4', () => false, 'play Robot Love')}>
                  <span className='category-action'>play</span> <span className='descriptor-song'>Robot Love</span>
                </li>
                <li onClick={this.type.bind(this, '4', () => false, 'play Walk the Moon')}>
                  <span className='category-action'>play</span> <span className='descriptor-artist'>Walk the Moon</span>
                </li>
                <li onClick={this.type.bind(this, '4', () => false, 'play Jason Derulo, Flyte, and Elle King')}>
                  <span className='category-action'>play</span> <span className='descriptor-artist'>Jason Derulo</span><span className='category-conjunction'>, </span><span className='descriptor-artist'>Flyte</span><span className='category-conjunction'>, and </span><span className='descriptor-artist'>Elle King</span>
                </li>

                <li onClick={this.type.bind(this, '4', () => false, 'play next song')}>
                  <span className='category-action'>play</span> <span className='descriptor-next-song'>next song</span>
                </li>
                <li onClick={this.type.bind(this, '4', () => false, 'pause')}>
                  <span className='category-action'>pause</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='4' grammar={play.grammar} execute={play => this.execute({play})} />
          </section>
          <section className='textRight'>
            <div className='text'>
              <a name='contact' className='anchor'><h3>Keep in Touch</h3></a>
              <p>Easily communicate with all of your contacts over Email, FaceTime, iMessage. Make calls and send texts through your iPhone. Smoke signals not yet supported.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '5', () => false, 'call Mom')}>
                  <span className='category-action'>call</span> <span className='descriptor-relationship'>Mom</span>
                </li>
                <li onClick={this.type.bind(this, '5', () => false, 'email Tony Stark')}>
                  <span className='category-action'>email</span> <span className='descriptor-contact'>Tony Stark</span>
                </li>
                <li onClick={this.type.bind(this, '5', () => false, 'email Dinner Plans to Clinton and Natalia')}>
                  <span className='category-action'>email</span> <span className='descriptor-subject'>Dinner Plans</span> <span className='category-conjunction'>to</span> <span className='descriptor-contact'>Clinton</span> <span className='category-conjunction'>and</span> <span className='descriptor-contact'>Natalia</span>
                </li>
                <li onClick={this.type.bind(this, '5', () => false, 'facetime my boss')}>
                  <span className='category-action'>facetime</span> <span className='descriptor-relationship'>my boss</span>
                </li>
                <li onClick={this.type.bind(this, '5', () => false, 'facetime Bruce Banner')}>
                  <span className='category-action'>facetime</span> <span className='descriptor-contact'>Bruce Banner</span>
                </li>
                <li onClick={this.type.bind(this, '5', () => false, 'call my Husband')}>
                  <span className='category-action'>call</span> <span className='descriptor-relationship'>my Husband</span>
                </li>
                <li onClick={this.type.bind(this, '5', () => false, 'email app@lacona.io')}>
                  <span className='category-action'>email</span> <span className='descriptor-email-address'>app@lacona.io</span>
                </li>
                <li onClick={this.type.bind(this, '5', () => false, 'call +1 617 867 5309')}>
                  <span className='category-action'>call</span> <span className='descriptor-phone-number'>+1 617 867 5309</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='5' grammar={contact.grammar} extensions={contact.extensions} execute={contact => this.execute({contact})} />
          </section>
          <section className='textLeft'>
            <div className='text'>
              <a name='translate' className='anchor'><h3>Become a Global Citizen</h3></a>
              <p>Quickly translate words and phrases between languages. A more natural interface for Google Translate.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '6', () => false, 'translate мороженное')}>
                  <span className='category-action'>translate</span> <span className='descriptor-phrase'>мороженное</span>
                </li>
                <li onClick={this.type.bind(this, '6', () => false, 'translate 我爱你 to Korean')}>
                  <span className='category-action'>translate</span> <span className='descriptor-phrase'>我爱你</span> <span className='category-conjunction'>to</span> <span className='descriptor-language'>Korean</span>
                </li>
                <li onClick={this.type.bind(this, '6', () => false, 'translate ¿cómo estás? from Spanish to Japanese')}>
                  <span className='category-action'>translate</span> <span className='descriptor-phrase'>como estas?</span> <span className='category-conjunction'>from</span> <span className='descriptor-language'>Spanish</span> <span className='category-conjunction'>to</span> <span className='descriptor-language'>Japanese</span>
                </li>
                <li onClick={this.type.bind(this, '6', () => false, 'translate hujambo from Swahili')}>
                  <span className='category-action'>translate</span> <span className='descriptor-phrase'>hujambo</span> <span className='category-conjunction'>from</span> <span className='descriptor-language'>Swahili</span>
                </li>
                <li onClick={this.type.bind(this, '6', () => false, "translate I don't know to Arabic, Chinese, French, Russian, and Spanish")}>
                  <span className='category-action'>translate</span> <span className='descriptor-phrase'>I don't know</span> <span className='category-conjunction'>to</span> <span className='descriptor-language'>Arabic</span> <span className='category-conjunction'>,</span> <span className='descriptor-language'>Chinese</span> <span className='category-conjunction'>,</span> <span className='descriptor-language'>French</span> <span className='category-conjunction'>,</span> <span className='descriptor-language'>Russian</span> <span className='category-conjunction'>, and</span> <span className='descriptor-language'>Spanish</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='6' grammar={translate.grammar} execute={translate => this.execute({translate})} />
          </section>
          <section className='full'>
            <div className='text'>
              <h3><a name='extensibility'>The Sky's the Limit</a></h3>
              <p>Lacona is built to be extended. An open Developer API gives it the power it do anything you need it to do, quickly and easily.</p>
              <ul className='examples inactive'>
                <li><span className='category-action'>tweet</span> <span className='category-argument2'>just setting up my twttr #blessed</span></li>
                <li><span className='category-action'>skype</span> <span className='descriptor-contact'>Aaron</span></li>
                <li><span className='category-action'>email</span> <span className='category-argument0'>my last instagram picture</span> <span className='category-conjunction'>to</span> <span className='descriptor-relationship'>Mom</span></li>
                <li><span className='category-action'>calculate</span> <span className='category-argument3'>sqrt(5)</span></li>
                <li><span className='category-action'>turn off</span> <span className='category-argument5'>the kitchen lights</span></li>
                <li><span className='category-action'>pronounce</span> <span className='category-argument4'>indefatigable</span></li>
                <li><span className='category-action'>check</span> <span className='category-argument6'>APPL</span></li>
                <li><span className='category-action'>set</span> <span className='category-argument0'>default browser</span> <span className='category-conjunction'>to</span> <span className='category-application'>Firefox</span></li>
                <li><span className='category-action'>set a timer</span> <span className='category-conjunction'>for</span> <span className='category-argument2'>25 minutes</span></li>
                <li><span className='category-action'>execute</span> <span className='category-argument5'>ps -ef | grep -i lacona</span></li>
                <li><span className='category-action'>email walking directions</span> <span className='category-conjunction'>from</span> <span className='category-argument6'>Penn Station NY</span> <span className='category-conjunction'>to</span> <span className='category-argument6'>my house</span> <span className='category-conjunction'>to</span> <span className='descriptor-contact'>Pepper Potts</span></li>
                <li><span className='category-action'>block</span> <span className='descriptor-url'>reddit.com</span></li>
                <li><span className='category-action'>subscribe</span> <span className='category-conjunction'>to</span> <span className='category-argument0'>lifehacker</span></li>
                <li><span className='category-action'>paste</span> <span className='category-argument2'>my last tweet</span></li>
                <li><span className='category-action'>fork</span> <span className='category-argument1'>lacona/lacona</span></li>
                <li><span className='category-action'>define</span> <span className='category-argument4'>antediluvian</span></li>
                <li><span className='category-action'>roll</span> <span className='category-argument0'>d12</span></li>
                <li><span className='category-action'>find flights</span> <span className='category-conjunction'>from</span> <span className='category-argument6'>SFO</span> <span className='category-conjunction'>to</span> <span className='category-argument6'>BOS</span> <span className='category-conjunction'>on</span> <span className='descriptor-date'>8/6/2015</span></li>
                <li><span className='category-action'>yo</span> <span className='descriptor-contact'>THEDUDE</span></li>
                <li><span className='category-action'>set an alarm</span> <span className='category-conjunction'>for</span> <span className='descriptor-time'>6am</span> <span className='category-conjunction'>on</span> <span className='descriptor-date'>Christmas</span></li>
                <li><span className='category-action'>check the weather</span> <span className='category-conjunction'>in</span> <span className='category-argument2'>Boston</span></li>
              </ul>
            </div>
          </section>
        </content>
        <footer>
          <div className='text'>
            <p className='well'>
              This page is only a demonstration of Lacona's interface. It cannot access your files, apps, calendar, or anything else on your computer.
            </p>
            ©2015 Lacona Labs
          </div>
        </footer>
        <CSSTransitionGroup transitionName='lightbox' element='div' style={{position: 'absolute', zIndex: 2000}} transitionEnterTimeout={0} transitionLeaveTimeout={500}>
          {this.state.lightBoxMessage ? <Lightbox
            key='1'
            message={this.state.lightBoxMessage}
            hide={this.hideLightBox.bind(this)}
            showBTCLightbox={this.showBTCLightbox.bind(this)}
            detail={this.state.lightBoxDetail} /> : null}
        </CSSTransitionGroup>
        <CSSTransitionGroup transitionName='lightbox' element='div' style={{position: 'absolute', zIndex: 2000}} transitionEnterTimeout={0} transitionLeaveTimeout={500}>
          {this.state.btcLightboxVisible ? <BitcoinLightbox
            key='1'
            hide={this.hideBTCLightbox.bind(this)} /> : null}
        </CSSTransitionGroup>
        <Initializer />
      </div>
    )
  }
}
