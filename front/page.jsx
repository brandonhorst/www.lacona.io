import _ from 'lodash'
import {all, open, date, search, play, contact} from './sentence.jsx'
import eachSeries from 'async-each-series'
import ga, {Initializer} from 'react-google-analytics'
import getExecute from './execute.jsx'
import Lacona from './lacona.jsx'
import React from 'react/addons'

const MS_PER_INPUT = 10

const examples = [
  'open Calendar',
  'open Facebook',
  'open kickstarter.com',
  'open ~/Downloads/Lacona.dmg',
  'open todo.txt',
  'open my-document.docx with Pages',
  'open lacona.io in Safari',
  'schedule Dinner with Vicky at The Friendly Toast for 7pm tomorrow',
  'schedule Vacation 10a Monday to 6:30p Thursday',
  'remind me to Pick up the car September 12 at 11:30am',
  'remind me to Buy a gift 7 days before 12/1',
  'search Google for pictures of cats',
  'search Wikipedia for Laconia',
  'Google stormtroopers',
  'Amazon Avengers',
  'play Robot Love',
  'play Walk the Moon',
  'play Jason Derulo, Flyte, and Elle King',
  'play Jams',
  'play next song',
  'pause',
  'call Mom',
  'email Tony Stark',
  'text Leaving now :) to Hank McCoy',
  'email Dinner Plans to Peter Parker',
  'facetime Bruce Banner',
  'email app@lacona.io',
  'call +1 617 867 5309'
]

class Lightbox {
  render() {
    return (
      <div className='lightbox-total'>
        <div className='lightbox-cover' onClick={this.props.hide} />
        <div className='lightbox'>
          <div className='closeButton' onClick={this.props.hide}>×</div>
          <h3>Thanks for trying the Lacona demo!</h3>
          <p>If this were a real copy of Lacona, it would {this.props.message}.</p>
          <ShareSheet />
          {/*<p>Feel free to try something else, <a href='https://twitter.com/intent/follow?screen_name=lacona&user_id=1963107458' target='_blank' onClick={this.openWindow}>follow @lacona on Twitter</a>, or <a href='http://eepurl.com/bjPRjD' target='_blank'>subscribe to the newsletter</a>.</p>*/}
        </div>
      </div>
    )
  }
}

class ShareSheet {
  render () {
    return (
      <div className='share-sheet'>
        {this.props.includeTry ?
          <div className='share-item extend'>
            <div className='share-desc'>
              Try
            </div>
            <div className='share-icons'>
              <img src='try.png' />
            </div>
          </div>
          : null
        }
        <a href='#comingsoon' className='share-item'>
          <div className='share-desc'>
            Back
          </div>
          <div className='share-icons'>
            <img src='kickstarter.png' />
          </div>
        </a>
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
  includeTry: false
}

export default class Page extends React.Component {
  constructor() {
    super()

    this.state = {
      theme: 'theme-eighties-dark',
      initialLoad: true
    }

    this.execute = getExecute(this.showLightbox.bind(this))

    this.demoRunning = true
  }

  showLightbox (text) {
    this.setState({lightBoxMessage: text})
  }

  hideLightbox () {
    this.setState({lightBoxMessage: null})
  }

  componentDidMount () {
    ga('create', 'UA-61643321-1', 'auto')
    ga('send', 'pageview')

    this.setState({initialLoad: false})

    this.startDemo()
  }


  startDemo () {
    const shuffledExamples = _.shuffle(examples)

    const shouldStop = () => !this.demoRunning

    eachSeries(shuffledExamples, (item, done) => {
      this.type('big', shouldStop, item, false)
      if (!shouldStop()) setTimeout(done, 7000)
    }, this.startDemo.bind(this))
  }

  stopDemo () {
    this.demoRunning = false
  }

  erase (elem, shouldStop, focus, done) {
    const input = elem.getInput()

    for (let i = 0; i < input.length; i++) {
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

  render() {
    return (
      <div className={`page${this.state.fixedMode ? ' fixed' : ''}${this.state.initialLoad ? ' initial-load' : ''}${this.state.active ? '' : ' inactive'} ${this.props.isMobile ? 'mobile' : 'desktop'} theme-eighties-dark`}>

        <React.addons.CSSTransitionGroup transitionName='lightbox'>
          {this.state.lightBoxMessage ? <Lightbox key='1' message={this.state.lightBoxMessage} hide={this.hideLightbox.bind(this)} /> : null}
        </React.addons.CSSTransitionGroup>

        <header>
          <h1><a href="#" tabIndex="-1">Lacona</a></h1>
          <h2><span className='category-action highlighted'>Natural Language Commands</span> <span className='category-conjunction highlighted'>for your</span> <span className='category-argument2 highlighted'>Mac</span></h2>
          <p>Call up Lacona with a keypress, and type whatever you want to do.</p>
          <p>It gives intelligent suggestions as you type and then follows your orders.</p>
        </header>

        <content>
          <section className='full green'>
            <div className='text'>
              {/*<p>Lacona will be available for download <em>late summer, 2015</em>. Until then, check out the demos below, <a href='https://twitter.com/intent/follow?screen_name=lacona&user_id=1963107458' target='_blank' onClick={this.openWindow}>follow @lacona on Twitter</a>, or <a href='http://eepurl.com/bjPRjD' target='_blank'>sign up for the newsletter</a>.</p>*/}
              <ShareSheet includeTry={true} />
            </div>
          </section>
          <section className='full'>
            <Lacona
              userInteracted={this.stopDemo.bind(this)}
              grammar={all.grammar}
              execute={this.execute}
              ref='big'
              tryMe={true}
              tabIndex={1} />

          </section>
          <section className='textLeft'>
            <div className='text'>
              <h3>Ditch the Dock</h3>
              <p>With Lacona, your Apps, Bookmarks, Files, and more are just a few keystrokes away.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '0', () => false, 'open Calendar')}>
                  <span className='category-action'>open</span> <span className='descriptor-application'>Calendar</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open Facebook')}>
                  <span className='category-action'>open</span> <span className='descriptor-bookmark'>Facebook</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'iTunes')}>
                  <span className='descriptor-application'>iTunes</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open kickstarter.com')}>
                  <span className='category-action'>open</span> <span className='descriptor-url'>kickstarter.com</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open lacona.io in Safari')}>
                  <span className='category-action'>open</span> <span className='descriptor-url'>lacona.io</span> <span className='category-conjunction'>in</span> <span className='descriptor-application'>Safari</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'lifehacker.com')}>
                  <span className='descriptor-url'>lifehacker.com</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open ~/Downloads/Lacona.dmg')}>
                  <span className='category-action'>open</span> <span className='descriptor-path'>~/Downloads/Lacona.dmg</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open todo.txt')}>
                  <span className='category-action'>open</span> <span className='descriptor-file'>todo.txt</span>
                </li>
                <li onClick={this.type.bind(this, '0', () => false, 'open my-document.docx with Pages')}>
                  <span className='category-action'>open</span> <span className='descriptor-file'>my-document.docx</span> <span className='category-conjunction'>with</span> <span className='descriptor-application'>Pages</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='0' grammar={open.grammar} execute={open => this.execute({open})} />
          </section>
          <section className='textRight'>
            <div className='text'>
              <h3>Organize your Life, not your Calendar</h3>
              <p>Create events and reminders just like you were talking to a person. Lacona understands.</p>
              <p className='well'>Dates are complicated! The occasional choppiness is only because Lacona is running in a browser. The real app will be silky smooth.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '1', () => false, "schedule Dinner with Vicky at Sacco's Flatbread for 7pm tomorrow")}>
                  <span className='category-action'>schedule</span> <span className='descriptor-calendar-event'>Dinner with Vicky</span> <span className='category-conjunction'>at</span> <span className='descriptor-location'>The Friendly Toast</span> <span className='category-conjunction'>for</span> <span className='descriptor-date-and-time'>7pm tomorrow</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'remind me to Pick up the car September 12 at 11:30am')}>
                  <span className='category-action'>remind me to</span> <span className='descriptor-reminder-title'>Pick up the car</span> <span className='descriptor-date-and-time'>September 12 at 11:30am</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'schedule Vacation 10a Monday to 6:30p Thursday')}>
                  <span className='category-action'>schedule</span> <span className='descriptor-calendar-event'>Vacation</span> <span className='descriptor-period-of-time'>10a Monday to 6:30p Thursday</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'remind me to Buy a gift 7 days before 12/1')}>
                  <span className='category-action'>remind me to</span> <span className='descriptor-reminder-title'>Buy a gift</span> <span className='descriptor-date'>7 days before 12/1</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'remind me to Call Jenny')}>
                  <span className='category-action'>remind me to</span> <span className='descriptor-reminder-title'>Call Jenny</span>
                </li>
                <li onClick={this.type.bind(this, '1', () => false, 'remind me to Charge my phone at 9pm')}>
                  <span className='category-action'>remind me to</span> <span className='descriptor-reminder-title'>Charge my phone</span> <span className='category-conjunction'>at</span> <span className='descriptor-time'>9pm</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='1' grammar={date.grammar} execute={date => this.execute({date})} />
          </section>
          <section className='textLeft'>
            <div className='text'>
              <h3>Seek and Ye Shall Find</h3>
              <p>Search the web like a boss. Utilize powerful fallthrough functionality to save even more keystrokes.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '2', () => false, 'search Google for pictures of cats')}>
                  <span className='category-action'>search</span> <span className='descriptor-search-engine'>Google</span> <span className='category-conjunction'>for</span> <span className='descriptor-query'>pictures of cats</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'Google stormtroopers')}>
                  <span className='descriptor-search-engine'>Google</span> <span className='descriptor-query'>stormtroopers</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'Amazon Avengers')}>
                  <span className='descriptor-search-engine'>Amazon</span> <span className='descriptor-query'>Avengers</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'search Wikipedia for Laconia')}>
                  <span className='category-action'>search</span> <span className='descriptor-search-engine'>Wikipedia</span> <span className='category-conjunction'>for</span> <span className='descriptor-query'>Laconia</span>
                </li>
                <li onClick={this.type.bind(this, '2', () => false, 'search eBay and Amazon for iPhone 6')}>
                  <span className='category-action'>search</span> <span className='descriptor-search-engine'>eBay</span> <span className='category-conjunction'>and</span> <span className='descriptor-search-engine'>Amazon</span> <span className='category-conjunction'>for</span> <span className='descriptor-query'>iPhone 6</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='2' grammar={search.grammar} execute={search => this.execute({search})} />
          </section>
          <section className='textRight'>
            <div className='text'>
              <h3>Your Work Needs a DJ</h3>
              <p>Instantly play anything in your iTunes library, without ever touching the mouse.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '3', () => false, 'play Robot Love')}>
                  <span className='category-action'>play</span> <span className='descriptor-song'>Robot Love</span>
                </li>
                <li onClick={this.type.bind(this, '3', () => false, 'play Walk the Moon')}>
                  <span className='category-action'>play</span> <span className='descriptor-artist'>Walk the Moon</span>
                </li>
                <li onClick={this.type.bind(this, '3', () => false, 'play Jason Derulo, Flyte, and Elle King')}>
                  <span className='category-action'>play</span> <span className='descriptor-artist'>Jason Derulo</span><span className='category-conjunction'>, </span><span className='descriptor-artist'>Flyte</span><span className='category-conjunction'>, and </span><span className='descriptor-artist'>Elle King</span>
                </li>

                <li onClick={this.type.bind(this, '3', () => false, 'play Jams')}>
                  <span className='category-action'>play</span> <span className='descriptor-playlist'>Jams</span>
                </li>
                <li onClick={this.type.bind(this, '3', () => false, 'play next song')}>
                  <span className='category-action'>play</span> <span className='descriptor-next-song'>next song</span>
                </li>
                <li onClick={this.type.bind(this, '3', () => false, 'pause')}>
                  <span className='category-action'>pause</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='3' grammar={play.grammar} execute={play => this.execute({play})} />
          </section>
          <section className='textLeft'>
            <div className='text'>
              <h3>Keep in Touch</h3>
              <p>Easily communicate with all of your contacts over Email, FaceTime, iMessage. Make calls and send texts through your iPhone. Smoke signals not yet supported.</p>
              <ul className='examples'>
                <li onClick={this.type.bind(this, '4', () => false, 'call Mom')}>
                  <span className='category-action'>call</span> <span className='descriptor-relationship'>Mom</span>
                </li>
                <li onClick={this.type.bind(this, '4', () => false, 'email Tony Stark')}>
                  <span className='category-action'>email</span> <span className='descriptor-contact'>Tony Stark</span>
                </li>
                <li onClick={this.type.bind(this, '4', () => false, 'text Leaving now :) to Hank McCoy')}>
                  <span className='category-action'>text</span> <span className='descriptor-message'>Leaving now :)</span> <span className='conjunction'>to</span> <span className='descriptor-contact'>Hank McCoy</span>
                </li>
                <li onClick={this.type.bind(this, '4', () => false, 'email Dinner Plans to Peter Parker')}>
                  <span className='category-action'>email</span> <span className='descriptor-message'>Dinner Plans</span> <span className='conjunction'>to</span> <span className='descriptor-contact'>Peter Parker</span>
                </li>
                <li onClick={this.type.bind(this, '4', () => false, 'facetime my boss')}>
                  <span className='category-action'>facetime</span> <span className='descriptor-relationship'>my boss</span>
                </li>
                <li onClick={this.type.bind(this, '4', () => false, 'facetime Bruce Banner')}>
                  <span className='category-action'>facetime</span> <span className='descriptor-contact'>Bruce Banner</span>
                </li>
                <li onClick={this.type.bind(this, '4', () => false, 'email app@lacona.io')}>
                  <span className='category-action'>email</span> <span className='descriptor-email-address'>app@lacona.io</span>
                </li>
                <li onClick={this.type.bind(this, '4', () => false, 'call +1 617 867 5309')}>
                  <span className='category-action'>call</span> <span className='descriptor-phone-number'>+1 617 867 5309</span>
                </li>
              </ul>
            </div>
            <Lacona userInteracted={this.stopDemo.bind(this)} ref='4' grammar={contact.grammar} execute={contact => this.execute({contact})} />
          </section>
          <section className='full'>
            <div className='text'>
              <h3>The Sky's the Limit</h3>
              <p>Lacona is built to be extended. An open Developer API will let it understand anything you need to do.</p>
              <ul className='examples inactive'>
                <li><span className='category-action'>tweet</span> <span className='category-argument2'>just setting up my twttr #blessed</span></li>
                <li><span className='category-action'>skype</span> <span className='descriptor-contact'>Aaron</span></li>
                <li><span className='category-action'>switch to</span> <span className='descriptor-application'>Safari</span></li>
                <li><span className='category-action'>email</span> <span className='category-argument4'>my last instagram picture</span> <span className='category-conjunction'>to</span> <span className='descriptor-relationship'>Mom</span></li>
                <li><span className='category-action'>calculate</span> <span className='category-argument3'>sqrt(5)</span></li>
                <li><span className='category-action'>turn off</span> <span className='category-argument5'>the kitchen lights</span></li>
                <li><span className='category-action'>check</span> <span className='category-argument6'>APPL</span></li>
                <li><span className='category-action'>translate</span> <span className='category-argument3'>How do you do?</span> <span className='category-conjunction'>to</span> <span className='category-argument2'>Japanese</span></li>
                <li><span className='category-action'>empty the Trash</span></li>
                <li><span className='category-action'>remind me to</span> <span className='category-argument3'>Book a flight home</span> <span className='descriptor-date'>6 weeks before Jordan's birthday</span></li>
                <li><span className='category-action'>set a timer</span> <span className='category-conjunction'>for</span> <span className='category-argument2'>25 minutes</span></li>
                <li><span className='category-action'>block</span> <span className='descriptor-url'>reddit.com</span></li>
                <li><span className='category-action'>fork</span> <span className='category-argument1'>lacona/lacona</span></li>
                {/*<li><span className='category-action'>Поиск</span> <span className='descriptor-search-engine'>Яндекса</span> <span className='category-conjunction'>для</span> <span className='descriptor-query'>музыки</span></li>
                <li><span className='category-conjunction'>在</span><span className='descriptor-search-engine'>百度</span><span classAName='category-conjunction'>上</span><span className='category-action'>搜索</span><span className='descriptor-query'>好听的音乐</span></li>
                <li style={{textAlign: 'right'}}><span className='category-action'>بحث</span> <span className='descriptor-search-engine'>يملي</span> <span className='descriptor-query'>للموسيقى</span></li>
                <li><span className='category-action'>calculate</span> <span className='category-argument3'>六十四 + 23 + ٣‎٤</span></li>*/}
              </ul>
            </div>
          </section>
          {/*<section className='full'>
            <div className='text'>
              <h3>Just the Beginning</h3>
              <p>
                Lacona is currently under active development, and will be launching <em>Summer, 2015</em>. To recieve updates, <a href='http://lacona.us10.list-manage.com/subscribe?u=f923be23d36f00f457ea3b2c6&id=1db875d5ed' target='_blank' onClick={this.openWindow}>subscribe to the Newsletter</a> or .
              </p>
              {/*<p>
                Since computers have existed, we have needed to learn <em>their</em> language. With Lacona, the computer takes that responsibility back. It understands commands <em>the way they exist in your mind</em>, freeing you from the burden of an expensive mental context-switch, so you can forget about the computer and just <em>get things done</em>.
              </p>
            </div>
          </section>*/}
        </content>
        <footer>
          <div className='text'>
            <p className='well'>
              This page is only a demonstration of Lacona's interface. It cannot access your files, apps, calendar, or anything else on your computer.
            </p>
            ©2015 Lacona Labs
          </div>
        </footer>
        <Initializer />
      </div>
    )
  }
}
