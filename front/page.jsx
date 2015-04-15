import _ from 'lodash'
import {createFactory} from 'lacona-phrase'
import ga, {Initializer} from 'react-google-analytics'
import * as things from './execute'
import fulltext from 'lacona-util-fulltext'
import {Parser} from 'lacona'
import Lacona from 'react-lacona'
import React from 'react'
import Sentence from './sentence.jsx'

class Notification {
  render() {
    return <div className={`notification ${this.props.type}${this.props.hidden ? ' hidden' : ''}`} onClick={this.props.hide}>{this.props.message}</div>
  }
}

export default class Page extends React.Component {
  constructor() {
    super()

    this.state = {
      theme: 'theme-eighties-dark',
      input: '',
      initialLoad: true,
      noteMessage: '',
      noteVisible: false,
      noteType: ''
    }
  }

  componentWillMount() {
    // create parser
    const sentenceFactory = createFactory(Sentence)
    this.parser = new Parser()
    this.parser.grammar = sentenceFactory()

    //hook to global scroll
    global.onscroll = this.checkScroll.bind(this)
  }

  componentDidMount() {
    this.cancel()

    ga('create', 'UA-61643321-1', 'auto')
    ga('send', 'pageview')

    this.setState({initialLoad: false})
    this.update('')
  }

  update(input) {
    const outputs = this.parser.parseArray(input)
    const groupedOutputs = _.chain(outputs)
      .groupBy(output => fulltext.match(output) + fulltext.suggestion(output))
      .map(group => group[0])
      .value()
    this.setState({input, outputs: groupedOutputs})
  }

  getSetFunction(input) {
    return (e) => {
      this.update(input)
      this.refs.lacona.focusBar()

      e.stopPropagation()
    }
  }

  execute(id) {
    things.execute.call(this, this.state.outputs[id].result)
    this.update('')
  }

  select(id) {
    things.select.call(this, this.state.outputs[id].result)
  }

  cancel(id) {
    this.update('')
    this.setState({input: '', outputs: []})
  }

  checkScroll(e) {
    const scrollAmount = window.pageYOffset || document.documentElement.scrollTop
    if (scrollAmount > 250) { // must be changed if $header-height changes
      if (!this.state.fixedMode) this.setState({fixedMode: true})
    } else {
      if (this.state.fixedMode) this.setState({fixedMode: false})
    }
  }

  focus() {
    this.setState({active: true})
  }

  blur() {
    this.setState({active: false})
  }

  hideNote() {
    this.setState({noteVisible: false})
  }

  render() {
    return (
      <div onscroll={this.checkScroll.bind(this)}
        className={`page${this.state.fixedMode ? ' fixed' : ''}${this.state.initialLoad ? ' initial-load' : ''}${this.state.active ? '' : ' inactive'}`}>

        <Notification type={this.state.noteType} message={this.state.noteMessage}
          hidden={!this.state.noteVisible} hide={this.hideNote.bind(this)} />

        <div className='initialHeader'>
          <a href="javascript:$('html, body').animate({scrollTop:0}, 400, 'swing');" tabIndex="-1">
            <h1>Lacona</h1>
          </a>
          <h2>Natural Language Command System</h2>
          <div className='keys'>
            <div className='key'><div className='glyph'>↕</div><div className='explanation'>select</div></div>
            <div className='key'><div className='glyph'>⇥</div><div className='explanation'>complete</div></div>
            <div className='key'><div className='glyph'>↩</div><div className='explanation'>do</div></div>
          </div>
        </div>

        <div className={`bar ${this.state.theme}`}>
          <Lacona update={this.update.bind(this)} execute={this.execute.bind(this)}
            select={this.select.bind(this)} cancel={this.cancel.bind(this)}
            outputs={this.state.outputs}
            focus={this.focus.bind(this)} blur={this.blur.bind(this)}
            placeholder='What would you like to do?' autoFocus={true}
            userInput={this.state.input} ref='lacona' />
          <div className='logo'>
            <a href="javascript:$('html, body').animate({scrollTop:0}, 400, 'swing');" tabIndex="-1">
              <img className='icon' src='logo.png' />
            </a>
          </div>
        </div>

        <content>
          <h2>Your New Best Friend</h2>
          <p>Lacona is a revolutionary productivity tool for Mac that allows all of your interactions with your computer to be <em>quicker</em>, <em>simpler</em>, and <em>more focused</em>.</p>
          <h2>Speed</h2>
          <p>Pull up Lacona with a single hotkey, and it allows you to perform common tasks instantly, without any need to touch the mouse or switch applications. A sophisticated autocomplete system reduces the typing required to a bare minimum. Skip the mundanity and the RSI, and get back to work.</p>
          <p>Press <em>tab</em> on this page to see how it feels.</p>
          <h2>Simplicity</h2>
          <p>There are no commands to learn or interface to master. Enter commands in the same way you think them, and let Lacona work out the details. There is no asking "how do you...?" The answer is always the same: just type.</p>
          <h2>Focus</h2>
          <p>Since computers have existed, we have needed to learn <em>their</em> language. Even tools with well-designed graphical interfaces still require us to translate our thoughts into points, clicks, drags, drops, and taps.</p>
          <p>With Lacona, the computer takes that responsibility back. It understands commands <em>the way they exist in your mind</em>, freeing you from the burden of an expensive mental context-switch, so you can forget about the computer and just <em>get things done</em>.</p>
          <h2>Get It</h2>
          <p>Lacona is currently under active development. To recieve updates when they are available, <a onClick={this.getSetFunction('subscribe ')}>subscribe to the mailing list</a> or <a onClick={this.getSetFunction('follow @lacona on Twitter')}>follow @lacona on Twitter</a>. With any questions, please feel free to <a onClick={this.getSetFunction('contact us on Twitter')}>start a conversation on Twitter</a>.</p>
        </content>
        <footer>
          ©2015 Lacona Labs
        </footer>
        <Initializer />
      </div>
    )
  }
}
