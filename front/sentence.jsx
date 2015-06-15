/** @jsx createElement */

import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'
import {Date, DateTime, Time, TimePeriod} from 'lacona-phrase-datetime'
import URL from 'lacona-phrase-url'
import Email from 'lacona-phrase-email'
import PhoneNumber from 'lacona-phrase-phonenumber'
import Repeat from 'lacona-phrase-repeat'

const userFiles = [
  {
    name: 'Desktop',
    children: ['mydocument.pages', 'mockup.html', 'kickstarter.url'],
  },
  {
    name: 'Documents',
    children: [
      {
        name: 'University',
        children: ['...']
      },
      {
        name: 'Resumes',
        children: ['...']
      },
      {
        name: 'Ideas',
        children: ['...']
      },
      {
        name: 'Presentations',
        children: ['...']
      },
      {
        name: 'Projects',
        children: ['...']
      },
      {
        name: 'NLP',
        children: ['...']
      }
    ]
  },
  {
    name: 'Downloads',
    children: ['Lacona.dmg']
  },
  {
    name: 'Library',
    children: [
      {
        name: 'Accounts',
        children: ['...']
      },
      {
        name: 'Application Scripts',
        children: ['...']
      },
      {
        name: 'Application Support',
        children: ['...']
      },
      {
        name: 'Assistants',
        children: ['...']
      },
      {
        name: 'Audio',
        children: ['...']
      },
      {
        name: 'Autosave Information',
        children: ['...']
      },
      {
        name: 'Caches',
        children: ['...']
      },
      {
        name: 'Calendars',
        children: ['...']
      },
      {
        name: 'ColorPickers',
        children: ['...']
      },
      {
        name: 'Colors',
        children: ['...']
      },
      {
        name: 'Compositions',
        children: ['...']
      },
      {
        name: 'Containers',
        children: ['...']
      },
      {
        name: 'Cookies',
        children: ['...']
      },
      {
        name: 'Developer',
        children: ['...']
      },
      {
        name: 'Dictionaries',
        children: ['...']
      },
      {
        name: 'Favorites',
        children: ['...']
      },
      {
        name: 'FlashlightPlugins',
        children: ['...']
      },
      {
        name: 'FontCollections',
        children: ['...']
      },
      {
        name: 'Fonts',
        children: ['...']
      },
      {
        name: 'GameKit',
        children: ['...']
      },
      {
        name: 'Google',
        children: ['...']
      },
      {
        name: 'Group Containers',
        children: ['...']
      },
      {
        name: 'IdentityServices',
        children: ['...']
      },
      {
        name: 'Input Methods',
        children: ['...']
      },
      {
        name: 'Internet Plug-Ins',
        children: ['...']
      },
      {
        name: 'Keyboard Layouts',
        children: ['...']
      },
      {
        name: 'Keychains',
        children: ['...']
      },
      {
        name: 'LanguageModeling',
        children: ['...']
      },
      {
        name: 'LaunchAgents',
        children: ['...']
      },
      {
        name: 'Logs',
        children: ['...']
      },
      {
        name: 'Mail',
        children: ['...']
      },
      {
        name: 'Messages',
        children: ['...']
      },
      {
        name: 'Mobile Documents',
        children: ['...']
      },
      {
        name: 'PreferencePanes',
        children: ['...']
      },
      {
        name: 'Preferences',
        children: ['...']
      },
      {
        name: 'Printers',
        children: ['...']
      },
      {
        name: 'PubSub',
        children: ['...']
      },
      {
        name: 'Safari',
        children: ['...']
      },
      {
        name: 'Saved Application State',
        children: ['...']
      },
      {
        name: 'Saved Searches',
        children: ['...']
      },
      {
        name: 'Screen Savers',
        children: ['...']
      },
      {
        name: 'ScriptingAdditions',
        children: ['...']
      },
      {
        name: 'Services',
        children: ['...']
      },
      {
        name: 'Sounds',
        children: ['...']
      },
      {
        name: 'Spelling',
        children: ['...']
      },
      {
        name: 'SyncedPreferences',
        children: ['...']
      },
      {
        name: 'Voices',
        children: ['...']
      },
      {
        name: 'WebKit',
        children: ['...']
      },
      {
        name: 'com.apple.nsurlsessiond',
        children: ['...']
      },
      {
        name: 'iMovie',
        children: ['...']
      },
      {
        name: 'iTunes',
        children: ['...']
      }
    ]
  },
  {
    name: 'Movies',
    children: ['The Avengers.avi', 'X-Men First Class.avi', 'Iron Man.avi']
  },
  {
    name: 'Music',
    children: [
      {
        name: 'Audio Music Apps',
        children: ['...']
      },
      {
        name: 'GarageBand',
        children: ['...']
      },
      {
        name: 'iTunes',
        children: ['...']
      }
    ]
  },
  {
    name: 'Pictures',
    children: ['Photos Library.photoslibrary']
  }
]

const rootFiles = [
  {
    name: 'Applications',
    children: [
      {
        name: 'App Store.app',
        children: ['...']
      },
      {
        name: 'Atom.app',
        children: ['...']
      },
      {
        name: 'Automator.app',
        children: ['...']
      },
      {
        name: 'Calculator.app',
        children: ['...']
      },
      {
        name: 'Calendar.app',
        children: ['...']
      },
      {
        name: 'Chess.app',
        children: ['...']
      },
      {
        name: 'Contacts.app',
        children: ['...']
      },
      {
        name: 'DVD Player.app',
        children: ['...']
      },
      {
        name: 'Dash.app',
        children: ['...']
      },
      {
        name: 'Dashboard.app',
        children: ['...']
      },
      {
        name: 'Dictionary.app',
        children: ['...']
      },
      {
        name: 'FaceTime.app',
        children: ['...']
      },
      {
        name: 'Font Book.app',
        children: ['...']
      },
      {
        name: 'Game Center.app',
        children: ['...']
      },
      {
        name: 'GarageBand.app',
        children: ['...']
      },
      {
        name: 'GitHub.app',
        children: ['...']
      },
      {
        name: 'Google Chrome.app',
        children: ['...']
      },
      {
        name: 'Image Capture.app',
        children: ['...']
      },
      {
        name: 'Keynote.app',
        children: ['...']
      },
      {
        name: 'Launchpad.app',
        children: ['...']
      },
      {
        name: 'Mail.app',
        children: ['...']
      },
      {
        name: 'Maps.app',
        children: ['...']
      },
      {
        name: 'Messages.app',
        children: ['...']
      },
      {
        name: 'Mission Control.app',
        children: ['...']
      },
      {
        name: 'Notes.app',
        children: ['...']
      },
      {
        name: 'Numbers.app',
        children: ['...']
      },
      {
        name: 'Pages.app',
        children: ['...']
      },
      {
        name: 'Photo Booth.app',
        children: ['...']
      },
      {
        name: 'Photos.app',
        children: ['...']
      },
      {
        name: 'Preview.app',
        children: ['...']
      },
      {
        name: 'QuickTime Player.app',
        children: ['...']
      },
      {
        name: 'Reminders.app',
        children: ['...']
      },
      {
        name: 'Safari.app',
        children: ['...']
      },
      {
        name: 'Slack.app',
        children: ['...']
      },
      {
        name: 'Stickies.app',
        children: ['...']
      },
      {
        name: 'System Preferences.app',
        children: ['...']
      },
      {
        name: 'TextEdit.app',
        children: ['...']
      },
      {
        name: 'Time Machine.app',
        children: ['...']
      },
      {
        name: 'Utilities',
        children: ['...']
      },
      {
        name: 'Xcode.app',
        children: ['...']
      },
      {
        name: 'iBooks.app',
        children: ['...']
      },
      {
        name: 'iMovie.app',
        children: ['...']
      },
      {
        name: 'iPhoto.app',
        children: ['...']
      },
      {
        name: 'iTunes.app',
        children: ['...']
      }
    ]
  },
  {
    name: 'Library',
    children: [
      {
        name: 'Application Support',
        children: ['...']
      },
      {
        name: 'Audio',
        children: ['...']
      },
      {
        name: 'Caches',
        children: ['...']
      },
      {
        name: 'ColorPickers',
        children: ['...']
      },
      {
        name: 'ColorSync',
        children: ['...']
      },
      {
        name: 'Components',
        children: ['...']
      },
      {
        name: 'Compositions',
        children: ['...']
      },
      {
        name: 'Contextual Menu Items',
        children: ['...']
      },
      {
        name: 'CoreMediaIO',
        children: ['...']
      },
      {
        name: 'Desktop Pictures',
        children: ['...']
      },
      {
        name: 'Developer',
        children: ['...']
      },
      {
        name: 'Dictionaries',
        children: ['...']
      },
      {
        name: 'DirectoryServices',
        children: ['...']
      },
      {
        name: 'Documentation',
        children: ['...']
      },
      {
        name: 'DropboxHelperTools',
        children: ['...']
      },
      {
        name: 'Extensions',
        children: ['...']
      },
      {
        name: 'Filesystems',
        children: ['...']
      },
      {
        name: 'Fonts',
        children: ['...']
      },
      {
        name: 'Frameworks',
        children: ['...']
      },
      {
        name: 'Google',
        children: ['...']
      },
      {
        name: 'Graphics',
        children: ['...']
      },
      {
        name: 'Image Capture',
        children: ['...']
      },
      {
        name: 'Input Methods',
        children: ['...']
      },
      {
        name: 'Internet Plug-Ins',
        children: ['...']
      },
      {
        name: 'Java',
        children: ['...']
      },
      {
        name: 'Keyboard Layouts',
        children: ['...']
      },
      {
        name: 'Keychains',
        children: ['...']
      },
      {
        name: 'LaunchAgents',
        children: ['...']
      },
      {
        name: 'LaunchDaemons',
        children: ['...']
      },
      {
        name: 'Logs',
        children: ['...']
      },
      {
        name: 'Messages',
        children: ['...']
      },
      {
        name: 'Modem Scripts',
        children: ['...']
      },
      {
        name: 'OpenDirectory',
        children: ['...']
      },
      {
        name: 'PDF Services',
        children: ['...']
      },
      {
        name: 'Perl',
        children: ['...']
      },
      {
        name: 'PreferencePanes',
        children: ['...']
      },
      {
        name: 'Preferences',
        children: ['...']
      },
      {
        name: 'Printers',
        children: ['...']
      },
      {
        name: 'PrivilegedHelperTools',
        children: ['...']
      },
      {
        name: 'Python',
        children: ['...']
      },
      {
        name: 'QuickLook',
        children: ['...']
      },
      {
        name: 'QuickTime',
        children: ['...']
      },
      {
        name: 'Receipts',
        children: ['...']
      },
      {
        name: 'Ruby',
        children: ['...']
      },
      {
        name: 'Sandbox',
        children: ['...']
      },
      {
        name: 'Screen Savers',
        children: ['...']
      },
      {
        name: 'ScriptingAdditions',
        children: ['...']
      },
      {
        name: 'Scripts',
        children: ['...']
      },
      {
        name: 'Security',
        children: ['...']
      },
      {
        name: 'Server',
        children: ['...']
      },
      {
        name: 'Speech',
        children: ['...']
      },
      {
        name: 'Spelling',
        children: ['...']
      },
      {
        name: 'Spotlight',
        children: ['...']
      },
      {
        name: 'StartupItems',
        children: ['...']
      },
      {
        name: 'SystemMigration',
        children: ['...']
      },
      {
        name: 'SystemProfiler',
        children: ['...']
      },
      {
        name: 'Updates',
        children: ['...']
      },
      {
        name: 'User Pictures',
        children: ['...']
      },
      {
        name: 'Video',
        children: ['...']
      },
      {
        name: 'WebServer',
        children: ['...']
      },
      {
        name: 'Widgets',
        children: ['...']
      },
      {
        name: 'iTunes',
        children: ['...']
      }
    ]
  },
  {
    name: 'Users',
    children: [
      {
        name: 'LaconaUser',
        children: userFiles
      },
      {
        name: 'Guest',
        children: ['...']
      },
      {
        name: 'Shared',
        children: ['...']
      }

    ]
  },
  {
    name: 'bin',
    children: ['bash', 'cat', 'chmod', 'cp', 'csh', 'date', 'dd', 'df', 'domainname', 'echo', 'ed', 'expr', 'hostname', 'kill', 'ksh', 'launchctl', 'link', 'ln', 'ls', 'mkdir', 'mv', 'pax', 'ps', 'pwd', 'rcp', 'rm', 'rmdir', 'sh', 'sleep', 'stty', 'sync', 'tcsh', 'test', 'unlink', 'wait4path', 'zsh']
  },
  {
    name: 'etc',
    children: [

    ]
  },
  {
    name: 'home',
    children: []
  },
  {
    name: 'net',
    children: []
  },
  {
    name: 'tmp',
    children: ['KSOutOfProcessFetcher.0.OlaJUhhgKAnFsX7fZ0FyXTFxIgg=', 'com.apple.launchd.CWPFO2w3Rj', 'com.apple.launchd.eM0bByeRbW', 'tmphosts', 'tmphosts1', 'some.tmp', 'test.tmp', 'yes.txt']
  },
  {
    name: 'usr',
    children: [
      {
        name: 'X11',
        children: ['...']
      },
      {
        name: 'X11R6',
        children: ['...']
      },
      {
        name: 'bin',
        children: ['...']
      },
      {
        name: 'include',
        children: ['...']
      },
      {
        name: 'lib',
        children: ['...']
      },
      {
        name: 'libexec',
        children: ['...']
      },
      {
        name: 'local',
        children: ['...']
      },
      {
        name: 'sbin',
        children: ['...']
      },
      {
        name: 'share',
        children: ['...']
      },
      {
        name: 'standalone',
        children: ['...']
      }
    ]
  },
  {
    name: 'var',
    children: [
      {
        name: 'Keychains',
        children: ['...']
      },
      {
        name: 'agentx',
        children: ['...']
      },
      {
        name: 'at',
        children: ['...']
      },
      {
        name: 'audit',
        children: ['...']
      },
      {
        name: 'backups',
        children: ['...']
      },
      {
        name: 'db',
        children: ['...']
      },
      {
        name: 'empty',
        children: ['...']
      },
      {
        name: 'folders',
        children: ['...']
      },
      {
        name: 'folders~orig',
        children: ['...']
      },
      {
        name: 'jabberd',
        children: ['...']
      },
      {
        name: 'lib',
        children: ['...']
      },
      {
        name: 'log',
        children: ['...']
      },
      {
        name: 'mail',
        children: ['...']
      },
      {
        name: 'msgs',
        children: ['...']
      },
      {
        name: 'netboot',
        children: ['...']
      },
      {
        name: 'networkd',
        children: ['...']
      },
      {
        name: 'root',
        children: ['...']
      },
      {
        name: 'rpc',
        children: ['...']
      },
      {
        name: 'run',
        children: ['...']
      },
      {
        name: 'rwho',
        children: ['...']
      },
      {
        name: 'spool',
        children: ['...']
      },
      {
        name: 'tmp',
        children: ['...']
      },
      {
        name: 'vm',
        children: ['...']
      },
      {
        name: 'yp',
        children: ['...']
      }
    ]
  }
]

const tunes = [ { name: 'I\'m Good',
    artist: 'The Mowgli\'s',
    album: 'I\'m Good',
    genre: 'Pop' },
  { name: 'Baby Love',
    artist: 'Petite Meller',
    album: 'Baby Love',
    genre: 'Pop' },
  { name: 'T-Shirt Weather',
    artist: 'Circa Waves',
    album: 'T-Shirt Weather',
    genre: 'Pop' },
  { name: 'Fade Out Lines - The Avener Rework',
    artist: 'The Avener & Phoebe Killdeer',
    album: 'Fade Out Lines',
    genre: 'Pop' },
  { name: 'Salt',
    artist: 'Bad Suns',
    album: 'Language & Perspective',
    genre: 'Pop' },
  { name: 'Ship To Wreck',
    artist: 'Florence + The Machine',
    album: 'Ship To Wreck',
    genre: 'Pop' },
  { name: 'Couch Potato',
    artist: 'Shortstraw',
    album: 'Good Morning, Sunshine',
    genre: 'Pop' },
  { name: 'Good Day',
    artist: 'distant cousins',
    album: 'Good Day',
    genre: 'Pop' },
  { name: 'Ex\'s & Oh\'s',
    artist: 'Elle King',
    album: 'Love Stuff',
    genre: 'Pop' },
  { name: 'Irresistible',
    artist: 'Fall Out Boy',
    album: 'American Beauty/American Psycho',
    genre: 'Pop' },
  { name: 'Centuries',
    artist: 'Fall Out Boy',
    album: 'American Beauty/American Psycho',
    genre: 'Pop' },
  { name: 'Light Me Up',
    artist: 'Flyte',
    album: 'Light Me Up',
    genre: 'Pop' },
  { name: 'Violins',
    artist: 'I\'m From Barcelona',
    album: 'Violins',
    genre: 'Pop' },
  { name: 'I Bet My Life',
    artist: 'Imagine Dragons',
    album: 'Smoke + Mirrors (Deluxe)',
    genre: 'Pop' },
  { name: 'RIVA (Restart the Game) - Radio Edit',
    artist: 'Klingande',
    album: 'RIVA (Restart The Game) [Radio Edit]',
    genre: 'Pop' },
  { name: 'Lean On (feat. MØ & DJ Snake)',
    artist: 'Major Lazer',
    album: 'Lean On (feat. MØ & DJ Snake)',
    genre: 'Pop' },
  { name: 'Got It',
    artist: 'Marian Hill',
    album: 'Sway',
    genre: 'Pop' },
  { name: 'Can You Blame Me',
    artist: 'Matt and Kim',
    album: 'Can You Blame Me',
    genre: 'Pop' },
  { name: 'Talk About You',
    artist: 'MIKA',
    album: 'Talk About You',
    genre: 'Pop' },
  { name: 'Love Like Mine',
    artist: 'Miami Horror',
    album: 'Love Like Mine',
    genre: 'Pop' },
  { name: 'Our Own House',
    artist: 'MisterWives',
    album: 'Our Own House',
    genre: 'Pop' },
  { name: 'The Rhythm',
    artist: 'MNEK',
    album: 'The Rhythm',
    genre: 'Pop' },
  { name: 'Magic (feat. Nile Rodgers and Brandy)',
    artist: 'Mystery Skulls',
    album: 'Forever',
    genre: 'Pop' },
  { name: 'Never Gets Old',
    artist: 'Penguin Prison',
    album: 'Never Gets Old',
    genre: 'Pop' },
  { name: 'Karaoke',
    artist: 'Smallpools',
    album: 'Karaoke',
    genre: 'Pop' },
  { name: 'Robot Love',
    artist: 'Urban Cone',
    album: 'Robot Love',
    genre: 'Pop' },
  { name: 'King',
    artist: 'Years & Years',
    album: 'King',
    genre: 'Pop' },
  { name: 'So Cruel',
    artist: 'Young Empires',
    album: 'So Cruel',
    genre: 'Pop' },
  { name: 'The Night Is Still Young',
    artist: 'Nicki Minaj',
    album: 'The Pinkprint',
    genre: 'Pop' },
  { name: 'I Will Never Let You Down',
    artist: 'Rita Ora',
    album: 'I Will Never Let You Down',
    genre: 'Pop' },
  { name: 'Never Been In Love (feat. Icona Pop)',
    artist: 'Cobra Starship',
    album: 'Never Been In Love (feat. Icona Pop)',
    genre: 'Pop' },
  { name: 'What I did for Love (feat. Emeli Sandé)',
    artist: 'David Guetta',
    album: 'Listen (Deluxe)',
    genre: 'Pop' },
  { name: 'Want To Want Me',
    artist: 'Jason Derulo',
    album: 'Want To Want Me',
    genre: 'Pop' },
  { name: 'Stronger',
    artist: 'Clean Bandit',
    album: 'New Eyes',
    genre: 'Pop' },
  { name: 'Stole the Show',
    artist: 'Kygo',
    album: 'Stole the Show',
    genre: 'Pop' },
  { name: 'In Your Arms',
    artist: 'Nico & Vinz',
    album: 'Black Star Elephant',
    genre: 'Pop' },
  { name: 'Intoxicated',
    artist: 'Martin Solveig',
    album: 'Intoxicated (Radio Edit)',
    genre: 'Pop' },
  { name: 'Runaway (U & I)',
    artist: 'Galantis',
    album: 'Runaway (U & I)',
    genre: 'Pop' },
  { name: 'Outside',
    artist: 'Calvin Harris',
    album: 'Motion',
    genre: 'Pop' },
  { name: 'Crazy For You',
    artist: 'Hedley',
    album: 'Wild Life',
    genre: 'Pop' },
  { name: 'Kathleen',
    artist: 'Catfish and the Bottlemen',
    album: 'The Balcony',
    genre: 'Pop' },
  { name: 'Work This Body',
    artist: 'Walk the Moon',
    album: 'TALKING IS HARD',
    genre: 'Pop' },
  { name: 'Seeing Stars',
    artist: 'BØRNS',
    album: 'Candy',
    genre: 'Pop' },
  { name: 'If It\'s Not You',
    artist: 'Keljet',
    album: 'Keljet x AYER - If It\'s Not You',
    genre: 'Pop' },
  { name: 'The Nights',
    artist: 'Avicii',
    album: 'The Days / Nights',
    genre: 'Pop' },
  { name: 'Pay No Mind',
    artist: 'Madeon',
    album: 'Adventure (Deluxe)',
    genre: 'Pop' },
  { name: 'Best Fake Smile',
    artist: 'James Bay',
    album: 'Chaos And The Calm',
    genre: 'Pop' },
  { name: 'Savages',
    artist: 'Marina and The Diamonds',
    album: 'FROOT',
    genre: 'Pop' },
  { name: 'Human Contact',
    artist: 'Catey Shaw',
    album: 'The Brooklyn EP',
    genre: 'Pop' },
  { name: 'Hum Hum',
    artist: 'Mating Ritual',
    album: 'Hum Hum',
    genre: 'Pop' },
  { name: 'Cold Cold Man',
    artist: 'Saint Motel',
    album: 'My Type EP',
    genre: 'Pop' } ]

class FileList extends Phrase {
  getValue (result) {
    if (result.dir) {
      const dir = result.dir === '~' ? '/Users/LaconaUser' : result.dir
      return `${dir}/${result.file}`
    } else {
      return result
    }
  }

  describe () {
    if (_.isPlainObject(this.props.directoryOrFile)) {
      return (
          <sequence>
            <literal text={`${this.props.directoryOrFile.name}/`} id='dir' value={this.props.directoryOrFile.name} />
            <argument text='content' id='file'>
              <choice>
                <literal text='' value='' />
                {_.map(this.props.directoryOrFile.children, child => <FileList directoryOrFile={child} />)}
              </choice>
            </argument>
          </sequence>
      )
    } else {
      return (
        <literal text={this.props.directoryOrFile} value={this.props.directoryOrFile} />
      )
    }
  }
}

class File extends Phrase {
  describe () {
    return (
      <choice>
        <argument text='path' showForEmpty={true}>
          <choice>
            <FileList directoryOrFile={{name: '~', children: userFiles}} />
            <FileList directoryOrFile={{name: '', children: rootFiles}} />
          </choice>
        </argument>
        <argument text='file' showForEmpty={true}>
          <list items={[
            {text: 'logo.jpg', value: '/Users/LaconaUser/Documents/logo.jpg'},
            {text: 'logo.png', value: '/Users/LaconaUser/Documents/logo.png'},
            {text: 'document.docx', value: '/Users/LaconaUser/Documents/document.docx'},
            {text: 'my-document.docx', value: '/Users/LaconaUser/Documents/my-document.docx'},
            {text: 'main.js', value: '/Users/LaconaUser/Projects/test/main.js'},
            {text: 'package.json', value: '/Users/LaconaUser/Projects/test/package.json'},
            {text: 'lodash.js', value: '/Users/LaconaUser/Projects/test/lodash.js'},
            {text: 'react-router.jsx', value: '/Users/LaconaUser/Projects/test/react-router.jsx'},
            {text: 'briefing 1_2.keynote', value: '/Users/LaconaUser/Documents/Presentations/briefing 1_2.keynote'},
            {text: 'briefing 2_24.keynote', value: '/Users/LaconaUser/Documents/Presentations/briefing 2_24.keynote'},
            {text: 'briefing 5_5.keynote', value: '/Users/LaconaUser/Documents/Presentations/briefing 5_5.keynote'},
            {text: 'status-updates.txt', value: '/Users/LaconaUser/status-updates.txt'},
            {text: 'todo.txt', value: '/Users/LaconaUser/todo.txt'},
            {text: 'main.cpp', value: '/Users/LaconaUser/Projects/cpp-test/main.cpp'},
            {text: 'main.h', value: '/Users/LaconaUser/Projects/cpp-test/main.h'},
            {text: 'quick-brown-fox.js', value: '/Users/LaconaUser/Projects/cpp-test/quick-brown-fox.js'},
            {text: 'overjumper.cs', value: '/Users/LaconaUser/Projects/cpp-test/overjumper.cs'},
            {text: 'overjumper.h', value: '/Users/LaconaUser/Projects/cpp-test/overjumper.h'},
            {text: 'lazy_dog.js', value: '/Users/LaconaUser/Projects/cpp-test/lazy_dog.js'}
          ]} fuzzy={true} />
      </argument>
      </choice>
    )
  }
}

class Application extends Phrase {
  describe () {
    return (
      <argument text='application' showForEmpty={true}>
        <list items={[
          {text: 'Calendar', value: 'Calendar'},
          {text: 'Contacts', value: 'Contacts'},
          {text: 'FaceTime', value: 'FaceTime'},
          {text: 'Game Center', value: 'Game Center'},
          {text: 'GarageBand', value: 'GarageBand'},
          {text: 'iBooks', value: 'iBooks'},
          {text: 'iMovie', value: 'iMovie'},
          {text: 'iPhoto', value: 'iPhoto'},
          {text: 'iTunes', value: 'iTunes'},
          {text: 'Keynote', value: 'Keynote'},
          {text: 'App Store', value: 'App Store'},
          {text: 'Mail', value: 'Mail'},
          {text: 'Maps', value: 'Maps'},
          {text: 'Messages', value: 'Messages'},
          {text: 'Notes', value: 'Notes'},
          {text: 'Numbers', value: 'Numbers'},
          {text: 'Pages', value: 'Pages'},
          {text: 'Photo Booth', value: 'Photo Booth'},
          {text: 'Reminders', value: 'Reminders'},
          {text: 'Safari', value: 'Safari'},
          {text: 'Automator', value: 'Automator'},
          {text: 'Calculator', value: 'Calculator'},
          {text: 'Chess', value: 'Chess'},
          {text: 'Dictionary', value: 'Dictionary'},
          {text: 'DVD Player', value: 'DVD Player'},
          {text: 'Font Book', value: 'Font Book'},
          {text: 'Image Capture', value: 'Image Capture'},
          {text: 'Preview', value: 'Preview'},
          {text: 'QuickTime Player', value: 'QuickTime Player'},
          {text: 'Stickies', value: 'Stickies'},
          {text: 'System Information', value: 'System Information'},
          {text: 'TextEdit', value: 'TextEdit'},
          {text: 'VoiceOver Utility', value: 'VoiceOver Utility'}
        ]} fuzzy={true} />
      </argument>
    )
  }
}

class Bookmark extends Phrase {
  describe () {
    return (
      <argument text='bookmark' showForEmpty={true}>
        <list items={[
          {text: 'Facebook', value:'http://facebook.com'},
          {text: 'Twitter', value:'http://twitter.com'},
          {text: 'Google', value:'http://google.com'},
          {text: 'Lifehacker', value:'http://lifehacker.com'},
          {text: 'xkcd', value:'http://xkcd.com'},
          {text: 'Github', value:'http://github.com'},
          {text: 'Youtube', value:'http://youtube.com'},
          {text: 'Wikipedia', value:'http://wikipedia.org'},
          {text: 'Ebay', value:'http://ebay.com'}
        ]} fuzzy={true} />
    </argument>
    )
  }
}

export const open = {
  grammar: (
    <sequence id='open'>
      <literal text='open ' category='action' />
      <choice merge={true}>
        <Application id='app' />
        <URL id='url' />
        <Bookmark id='url' />
        <File id='file' />
        <sequence>
          <choice merge={true}>
            <URL id='url' />
            <Bookmark id='url' />
            <File id='file' />
          </choice>
          <list items={[' with ', ' using ', ' in ']} limit={1} category='conjunction' />
          <Application id='app' />
        </sequence>
      </choice>
    </sequence>
  )
}

export const date = {
  grammar: (
    <choice id='date'>
      <sequence id='event'>
        <list items={['schedule ', 'create an event ', 'create event ', 'add an event ', 'add event ']} limit={1} category='action' />
        <argument text='calendar event' id='title'>
          <freetext limit={1} splitOn=' ' />
        </argument>
        <sequence optional={true} id='location'>
          <list items={[' at ', ' on ', ' in ']} limit={1} category='conjunction' />
          <argument text='location' merge={true}>
            <freetext limit={1} splitOn=' ' />
          </argument>
        </sequence>
        <list items={[' for ', ' ']} category='conjunction' limit={1} />
        <choice limit={1} merge={true}>
          <DateTime includeAt={true} />
          <TimePeriod />
        </choice>
      </sequence>
      <sequence id='reminder'>
        <literal text='remind me to ' category='action' />
        <argument text='reminder title' id='title'>
          <freetext limit={1} splitOn=' ' />
        </argument>
        <sequence optional={true} merge={true}>
          <literal text=' ' category='conjunction' />
          <choice merge={true}>
            <argument text='time' id='time'>
              <sequence>
                <literal text='at ' />
                <Time allowPast={false} merge={true} />
              </sequence>
            </argument>
            <Date allowPast={false} />
            <DateTime includeAt={true} allowPast={false} />
          </choice>
        </sequence>
      </sequence>
    </choice>
  )
}

const engines = [
  {text: 'Google', value: 'Google'},
  {text: 'Wikipedia', value: 'Wikipedia'},
  {text: 'Bing', value: 'Bing'},
  {text: 'Yahoo', value: 'Yahoo'},
  {text: 'Amazon', value: 'Amazon'},
  {text: 'eBay', value: 'eBay'}
]

class SearchEngines extends Phrase {
  describe () {
    return (
      <Repeat unique={true}>
        <content>
          <argument text='search engine'>
            <list items={engines} />
          </argument>
        </content>
        <separator>
          <list items={[' and ', ', ', ', and']} limit={1} category='conjunction' />
        </separator>
        {this.props.firstArgument ? undefined :
          <firstContent>
            <descriptor text='search engine' argument={true}>
              <list items={engines} />
            </descriptor>
          </firstContent>
        }
      </Repeat>
    )
  }
}

SearchEngines.defaultProps = {
  firstArgument: true
}

export const search = {
  grammar: (
    <choice limit={1} id='search'>
      <sequence>
        <literal text='search ' category='action' />
        <SearchEngines id='engines' />
        <literal text=' ' />
        <decorator text='for ' category='conjunction' />
        <argument text='query' id='query'>
          <freetext consumeAll={true} />
        </argument>
      </sequence>
      <sequence>
        <literal text='search ' category='action' />
        <literal text='for ' category='conjunction' optional={true} prefered={true} limited={true} />
        <argument text='query' id='query'>
          <freetext splitOn={' '} limit={1} />
        </argument>
        <list items={[' on ', ' with ', ' using ']} limit={1} />
        <SearchEngines id='engines' firstArgument={false} />
      </sequence>
    </choice>
  )
}

function itemify (x) {
  return {text: x, value: x}
}

export const play = {
  grammar: (
    <choice id='play'>
      <sequence>
        <literal text='play ' category='action'/>
        <choice merge={true}>
          <Repeat id='something' unique={true}>
            <content>
              <choice>
                <argument text='song' showForEmpty={true} id='song'>
                  <list items={_.chain(tunes).map('name').map(itemify).value()} limit={10} />
                </argument>
                <argument text='album' showForEmpty={true} id='album'>
                  <list items={_.chain(tunes).map('album').unique().map(itemify).value()} limit={10} />
                </argument>
                <argument text='artist' showForEmpty={true} id='artist'>
                  <list items={_.chain(tunes).map('artist').unique().map(itemify).value()} limit={10} />
                </argument>
                <argument text='genre' showForEmpty={true} id='genre'>
                  <list items={_.chain(tunes).map('genre').unique().map(itemify).value()} limit={10} />
                </argument>
                <argument text='playlist' showForEmpty={true} id='playlist'>
                  <list items={['Jams', 'Chill', 'Workout', 'Driving'].map(itemify)} />
                </argument>
                <argument text='composer' showForEmpty={true} id='composer'><literal /></argument>
              </choice>
            </content>
            <separator>
              <list items={[' and ', ', ', ', and ']} limit={1} category='conjunction' />
            </separator>
          </Repeat>
          <list id='previous' value={true} items={['previous track', 'previous song']} limit={1} category='argument5' />
        </choice>
      </sequence>
      <choice limit={1} value={{next: true}}>
        <sequence>
          <literal text='play ' category='action'/>
          <list items={['next track', 'next song']} limit={1} category='argument5' />
        </sequence>
        <sequence>
          <literal text='skip ' category='action'/>
          <list items={['track', 'song', 'this track', 'this song']} limit={1} category='argument5' />
        </sequence>
      </choice>
      <list value={{pause: true}} items={['pause music', 'pause this track', 'pause iTunes', 'pause track', 'pause song']} limit={1} category='action' />
      <list value={{stop: true}} items={['stop music', 'stop iTunes', 'stop track', 'stop song']} limit={1} category='action' />
    </choice>
  )
}

class Contact extends Phrase {
  describe () {
    return (
      <argument text='contact' showForEmpty={true}>
        <list items={[
          {text: 'Tony Stark', value: 'Tony Stark'},
          {text: 'Thor Odinson', value: 'Thor Odinson'},
          {text: 'Henry Pym', value: 'Henry Pym'},
          {text: 'Bruce Banner', value: 'Bruce Banner'},
          {text: 'Steve Rogers', value: 'Steve Rogers'},
          {text: 'Clinton Barton', value: 'Clinton Barton'},
          {text: 'Wanda Maximoff', value: 'Wanda Maximoff'},
          {text: 'Victor Shade', value: 'Victor Shade'},
          {text: 'Natalia Romanova', value: 'Natalia Romanova'},
          {text: 'Jennifer Walters', value: 'Jennifer Walters'},
          {text: 'Hank McCoy', value: 'Hank McCoy'},
          {text: 'Reed Richards', value: 'Reed Richards'},
          {text: 'Susan Richards', value: 'Susan Richards'},
          {text: 'Jim Hammond', value: 'Jim Hammond'},
          {text: 'Benjamin Grimm', value: 'Benjamin Grimm'},
          {text: 'Peter Parker', value: 'Peter Parker'},
          {text: 'Luke Cage', value: 'Luke Cage'},
          {text: 'Logan Howlett', value: 'Logan Howlett'},
          {text: 'James Barnes', value: 'James Barnes'},
          {text: 'Steven Strange', value: 'Steven Strange'},
          {text: 'Matt Murdock', value: 'Matt Murdock'},
          {text: 'Scott Summers', value: 'Scott Summers'},
          {text: 'Charles Xavier', value: 'Charles Xavier'},
          {text: 'Bobby Drake', value: 'Bobby Drake'},
          {text: 'Jean Grey-Summers', value: 'Jean Grey-Summers'},
          {text: 'Kurt Wagner', value: 'Kurt Wagner'},
          {text: 'Ororo Monroe', value: 'Ororo Monroe'},
          {text: 'Anna Marie', value: 'Anna Marie'},
          {text: 'Erik Lehnsherr', value: 'Erik Lehnsherr'}
        ]} />
    </argument>
    )
  }
}


class Relationship extends Phrase {
  describe () {
    return (
      <argument text='relationship' showForEmpty={true}>
        <sequence>
          <literal text='my ' optional={true} limited={true} />
          <list merge={true} items={[
            {text: 'Mom', value: 'your mom'},
            {text: 'Dad', value: 'your dad'},
            {text: 'Landlord', value: 'your landlord'},
            {text: 'Boss', value: 'your boss'},
          ]} />
        </sequence>
      </argument>
    )
  }
}

export const contact = {
  grammar: (
    <choice id='contact'>
      <sequence id='email'>
        <literal text='email ' category='action' />
        <choice merge={true}>
          <choice>
            <Email id='address' />
            <Relationship id='relationship' />
            <Contact id='contact' />
          </choice>
          <sequence>
            <argument text='message' id='message'>
              <freetext splitOn=' ' />
            </argument>
            <literal text=' to ' category='conjunction' />
            <choice merge={true}>
              <Email id='address' />
              <Relationship id='relationship' />
              <Contact id='contact' />
            </choice>
          </sequence>
        </choice>
      </sequence>
      <sequence id='call'>
        <literal text='call ' category='action' />
        <choice merge={true}>
          <PhoneNumber id='number' />
          <Relationship id='relationship' />
          <Contact id='contact' />
        </choice>
      </sequence>
      <sequence id='facetime'>
        <literal text='facetime ' category='action' />
        <choice merge={true}>
          <Relationship id='relationship' />
          <Contact id='contact' />
          <PhoneNumber id='number' />
          <Email id='address' />
        </choice>
      </sequence>
      <sequence id='text'>
        <list items={['text ', 'iMessage ']} limit={1} category='action' />
        <choice merge={true}>
          <choice>
            <Relationship id='relationship' />
            <Contact id='contact' />
            <PhoneNumber id='number' />
            <Email id='address' />
          </choice>
          <sequence>
            <argument text='message' id='message'>
              <freetext splitOn=' ' />
            </argument>
            <literal text=' to ' category='conjunction' />
            <choice merge={true}>
              <Relationship id='relationship' />
              <Contact id='contact' />
              <PhoneNumber id='number' />
              <Email id='address' />
            </choice>
          </sequence>
        </choice>
      </sequence>
    </choice>
  )
}

export const all = {
  grammar: (
    <choice>
      {open.grammar}
      {date.grammar}
      {search.grammar}
      {play.grammar}
      {contact.grammar}
    </choice>
  )
}

// export default class Sentence extends Phrase {
//   describe() {
//     const themeChoices = _.map(themes, theme => <literal value={`theme-${_.kebabCase(theme)}-light`} text={`${theme} Light`} fuzzy={true} />)
//       .concat(_.map(themes, theme => <literal value={`theme-${_.kebabCase(theme)}-dark`} text={`${theme} Dark`} fuzzy={true} />))
//
//     return (
//       <choice>
//         <sequence>
//           <literal text='learn ' id='action' value='learn' category='action' />
//           <literal text='more about Lacona' category='argument' join={true} />
//         </sequence>
//         <sequence>
//           <choice limit={1} id='action' value='subscribe' category='action'>
//             <literal text='add ' />
//             <literal text='subscribe ' />
//           </choice>
//           <placeholder text='your email address' id='email' category='argument'>
//             <Email />
//           </placeholder>
//           <literal text=' to the ' category='conjunction' />
//           <choice limit={1} category='actor' join={true}>
//             <literal text='newsletter' />
//             <literal text='mailing list' />
//           </choice>
//         </sequence>
//         <sequence>
//           <literal text='tweet ' id='action' value='tweet' category='action' />
//           <placeholder text='something about lacona' category='argument' id='message'>
//             <Validator />
//           </placeholder>
//         </sequence>
//         <sequence>
//           <literal text='share ' id='action' value='share' category='action' />
//           <choice limit={1} join={true} category='conjunction'>
//             <literal text='with ' />
//             <literal text='using ' />
//             <literal text='on ' />
//           </choice>
//           <placeholder text='a social network' category='actor' id='platform' >
//             <choice>
//               <literal text='Twitter' value='twitter' />
//               <literal text='Facebook' value='facebook' />
//               <literal text='Google+' value='google-plus' />
//               <literal text='Email' value='email' />
//             </choice>
//           </placeholder>
//         </sequence>
//         <sequence>
//           <literal text='follow ' id='action' value='follow' category='action' />
//           <literal text='@lacona ' category='argument' join={true} />
//           <literal text='on ' category='conjunction' join={true} />
//           <literal text='Twitter' category='actor' join={true} />
//         </sequence>
//         <sequence>
//           <literal text='contact us ' id='action' value='contact' category='action' />
//           <choice limit={1} join={true} category='conjunction'>
//             <literal text='using ' />
//             <literal text='over ' />
//             <literal text='with ' />
//             <literal text='on ' />
//           </choice>
//           <placeholder text='a social network' category='actor' id='platform'>
//             <choice>
//               <literal text='Twitter' value='twitter' />
//               <literal text='Email' value='email' />
//             </choice>
//           </placeholder>
//         </sequence>
//       </choice>
//     )
//   }
// }
