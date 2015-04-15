/** @jsx createElement */

import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'
import Email from 'lacona-phrase-email'
import Validator from 'lacona-phrase-validator'

const themes = [
  '3024',
  'Ashes',
  'Atelier Dune',
  'Atelier Forest',
  'Atelier Heath',
  'Atelier Lakeside',
  'Atelier Seaside',
  'Bespin',
  'Bright',
  'Chalk',
  'Default',
  'Eighties',
  'Flat',
  'Grayscale',
  'Greenscreen',
  'Harmonic',
  'Isotope',
  'London Tube',
  'Marrakesh',
  'Mocha',
  'Monokai',
  'Ocean',
  'Paraiso',
  'Pop',
  'Railscasts',
  'Shapeshifter',
  'Solarized',
  'Tomorrow',
  'Twilight'
]

export default class Sentence extends Phrase {
  describe() {
    const themeChoices = _.map(themes, theme => <literal value={`theme-${_.kebabCase(theme)}-light`} text={`${theme} Light`} fuzzy={true} />)
      .concat(_.map(themes, theme => <literal value={`theme-${_.kebabCase(theme)}-dark`} text={`${theme} Dark`} fuzzy={true} />))

    return (
      <choice>
        <sequence>
          <literal text='learn ' id='action' value='learn' category='action' />
          <literal text='more about Lacona' category='argument' join={true} />
        </sequence>
        <sequence>
          <choice limit={1} id='action' value='subscribe' category='action'>
            <literal text='add ' />
            <literal text='subscribe ' />
          </choice>
          <placeholder text='your email address' id='email' category='argument'>
            <Email />
          </placeholder>
          <literal text=' to the ' category='conjunction' />
          <choice limit={1} category='actor' join={true}>
            <literal text='newsletter' />
            <literal text='mailing list' />
          </choice>
        </sequence>
        <sequence>
          <literal text='tweet ' id='action' value='tweet' category='action' />
          <placeholder text='something about lacona' category='argument' id='message'>
            <Validator />
          </placeholder>
        </sequence>
        <sequence>
          <literal text='share ' id='action' value='share' category='action' />
          <choice limit={1} join={true} category='conjunction'>
            <literal text='with ' />
            <literal text='using ' />
            <literal text='on ' />
          </choice>
          <placeholder text='a social network' category='actor' id='platform' >
            <choice>
              <literal text='Twitter' value='twitter' />
              <literal text='Facebook' value='facebook' />
              <literal text='Google+' value='google-plus' />
              <literal text='Email' value='email' />
            </choice>
          </placeholder>
        </sequence>
        <sequence>
          <literal text='follow ' id='action' value='follow' category='action' />
          <literal text='@lacona ' category='argument' join={true} />
          <literal text='on ' category='conjunction' join={true} />
          <literal text='Twitter' category='actor' join={true} />
        </sequence>
        <sequence>
          <literal text='contact us ' id='action' value='contact' category='action' />
          <choice limit={1} join={true} category='conjunction'>
            <literal text='using ' />
            <literal text='over ' />
            <literal text='with ' />
            <literal text='on ' />
          </choice>
          <placeholder text='a social network' category='actor' id='platform'>
            <choice>
              <literal text='Twitter' value='twitter' />
              <literal text='Email' value='email' />
            </choice>
          </placeholder>
        </sequence>
      </choice>
    )
  }
}
        // <sequence>
        //   <literal text='change ' id='action' value='change' category='action' />
        //   <choice limit={1} join={true} category='action'>
        //     <literal text='theme ' />
        //     <literal text='color scheme ' />
        //     <literal text='colors ' />
        //   </choice>
        //   <literal text='to ' category='conjunction' join={true} />
        //   <placeholder text='a new theme' category='argument' id='theme'>
        //     <choice>{themeChoices}</choice>
        //   </placeholder>
        // </sequence>
