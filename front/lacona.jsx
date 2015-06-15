import _ from 'lodash'
import {Parser} from 'lacona'
import React from 'react/addons'
import ReactLacona from 'react-lacona'

function groupPlaceholders (result) {
  return _.chain(result.words)
    .map(item => item.placeholder ? '\uFFFC' : `\uFFF9${item.text}\uFFFA${item.argument}\uFFFB`)
    .value()
}

function mapPlaceholderGroups (resultGroup) {
  const placeholders = _.chain(resultGroup)
    .map(result => {
      return _.chain(result.words)
        .filter('placeholder')
        .map('text')
        .value()
    })
    .thru(descriptorLists => _.zip(...descriptorLists))
    .map(x => _.unique(x))
    .map(x => _.filter(x))
    .value()

  const result = _.clone(_.first(resultGroup))

  _.chain(result.words)
    .filter('placeholder')
    .forEach((item, index) => {
      item.placeholderTexts = placeholders[index]
      // item.descriptors = [placeholders[index]]
    })
    .value()

  return result
}

// function removeDescriptors (result) {
//   _.forEach(result.match.concat(result.suggestion, result.completion), item => {
//     item.topLevelDescriptor = item.ar_.first(item.descriptors)
//   })
// }


const prefixes = ['open ', 'search '] //, 'open ', 'search ']

class Keys {
  render () {
    return (
      <div className={`keys${this.props.visible ? ' visible' : ''}`}>
        <div className='key'>
          <div className='keyChar'>↑↓</div>
          <div className='keyDesc'>select</div>
        </div>
        <div className='key'>
          <div className='keyChar'>⇥</div>
          <div className='keyDesc'>complete</div>
        </div>
        <div className='key'>
          <div className='keyChar'>↩</div>
          <div className='keyDesc'>do</div>
        </div>
      </div>
    )
  }
}

export default class Lacona extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      input: '',
      output: [],
      prefix: '',
      focused: false
    }

    this.parser = new Parser()
    this.parser.grammar = props.grammar
    this.parser.extensions = props.extensions
  }

  componentDidMount () {
    this.update('')
  }

  focusEnd () {
    this.refs.lacona.focusEnd()
  }

  getInput () {
    return this.state.input
  }

  parse (input, checkDone, prefixes = ['']) {
    if (checkDone()) return []

    const inputs = _.map(prefixes, prefix => `${prefix}${input}`)

    const fullOutput = []
    for (let prefix of prefixes) {
      const prefixedInput = `${prefix}${input}`
      for (let output of this.parser.parse(prefixedInput)) {
        if (checkDone()) return []
        if (output.words[0].text === prefix) {
          output.words[0].fallthrough = true
        }
        fullOutput.push(output)
      }
    }

    if (checkDone()) return []

    if (!_.isEmpty(fullOutput)) {
      return _.chain(fullOutput)
        .groupBy(groupPlaceholders)
        .map(mapPlaceholderGroups)
        .sortBy(option => -option.score)
        .value()
    }

    return []
  }

  update (input) {
    this.setState({input})

    const checkDone = () => input !== this.state.input

    setTimeout(() => {
      let output = this.parse(input, checkDone)
      if (checkDone()) return

      if (!output.length) {
        output = this.parse(input, checkDone, prefixes)
      }
      if (checkDone()) return

      this.setState({output})

    }, 11)
  }

  execute (index) {
    const result = this.state.output[index].result
    this.props.execute(result)
  }

  cancel () {
    this.update('')
  }

  blur (event) {
    this.setState({focused: false})
  }

  focus (event) {
    this.setState({focused: true})
    if (!this.props.tryMe) this.props.userInteracted()
  }

  clearPrefix (event) {
    this.setState({prefix: ''})
  }

  render () {
    return (
      <div className='lacona'>
        <Keys visible={this.state.focused} />
        <ReactLacona
          ref='lacona'
          onFocus={this.focus.bind(this)}
          onBlur={this.blur.bind(this)}
          userInput={this.state.input}
          outputs={this.state.output}
          prefix={this.state.prefix}
          update={this.update.bind(this)}
          execute={this.execute.bind(this)}
          cancel={this.cancel.bind(this)}
          clearPrefix={this.clearPrefix.bind(this)}
          userInteracted={this.props.userInteracted}
          tabIndex={this.props.tabIndex}
          placeholder={this.props.placeholder} />
      </div>
    )
  }
}
Lacona.defaultProps = {
  tryMe: false,
  placeholder: 'Try me!',
  extensions: []
}
