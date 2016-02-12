import _ from 'lodash'
import { Parser } from 'lacona'
import React from 'react'
import { LaconaView } from 'react-lacona'

import { grammar, extensions } from './sentence.jsx'

function groupPlaceholders (result) {
  return _.chain(result.words)
    .filter(item => item.placeholder || item.text)
    .map(item => item.placeholder ? '\uFFFC' : `\uFFF9${item.text}\uFFFA${item.argument}\uFFFB`)
    .join('')
    .concat(`\uFFF9${result.qualifiers.join('\uFFFA')}\uFFFB`)
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

function combinePlaceholders(results, limit = 100) {
  return _.chain(results)
    .groupBy(groupPlaceholders)
    .map(mapPlaceholderGroups)
    .sortBy(option => -option.score)
    .take(limit)
    .value()
}

const prefixes = ['open ', 'search ']

class Keys extends React.Component{
  render () {
    return (
      <div className={`keys${this.props.visible ? ' visible' : ''}`}>
        <div className='key'>
          <div className='keyChar'>Arrow Keys</div>
          <div className='keyDesc'>select</div>
        </div>
        <div className='key'>
          <div className='keyChar'>Tab</div>
          <div className='keyDesc'>complete</div>
        </div>
        <div className='key'>
          <div className='keyChar'>Return</div>
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
    this.parser.grammar = grammar
    this.parser.extensions = extensions
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

  parse (input) {
    if (input === '') return []

    let fullOutput = this.parser.parseArray(input)

    if (_.isEmpty(fullOutput)) {
      fullOutput = _.chain(prefixes)
        .map(prefix => {
          const prefixedInput = `${prefix}${input}`
          const outputs = this.parser.parseArray(prefixedInput)
          return outputs
        })
        .flatten()
        .forEach(output => output.words[0].fallthrough = true)
        .value()
    }

    return combinePlaceholders(fullOutput, 20)
  }

  update (input, parse = true) {
    this.setState({input})

    if (parse) {
      setTimeout(() => {
        let output = this.parse(input)

        this.setState({output})
      }, 11)
    }
  }

  execute (index) {
    this.refs.lacona.blur()
    const result = this.state.output[index].result
    this.props.execute(result)
  }

  cancel () {
    this.update('')
  }

  blur (event) {
    this.setState({focused: false})
    this.cancel()
    this.props.onBlur()
  }

  focus (event) {
    this.setState({focused: true})
    // this.props.userInteracted()
    this.props.onFocus()
  }

  clearPrefix (event) {
    this.setState({prefix: ''})
  }

  render () {
    return (
      <LaconaView
        ref='lacona'
        key='lacona'
        onFocus={this.focus.bind(this)}
        onBlur={this.blur.bind(this)}
        userInput={this.state.input}
        outputs={this.state.output}
        prefix={this.state.prefix}
        update={this.update.bind(this)}
        execute={this.execute.bind(this)}
        cancel={this.cancel.bind(this)}
        clearPrefix={this.clearPrefix.bind(this)}
        tabIndex={this.props.tabIndex}
        placeholder={this.props.placeholder} />
    )
  }
}
Lacona.defaultProps = {
  tryMe: false,
  placeholder: 'Try me!'
}
