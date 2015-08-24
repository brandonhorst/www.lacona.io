/** @jsx createElement */

import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'
import {Date as DatePhrase, DateTime, Time, TimePeriod, TimeDuration} from 'lacona-phrase-datetime'
import URL from 'lacona-phrase-url'
import Email from 'lacona-phrase-email'
import PhoneNumber from 'lacona-phrase-phonenumber'

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
  { name: 'Iron Man',
    artist: 'Black Sabbath',
    album: 'Paranoid',
    genre: 'Metal' },
  { name: 'Stronger',
    artist: 'Clean Bandit',
    album: 'New Eyes',
    genre: 'Rock' },
  { name: 'Stole the Show',
    artist: 'Kygo',
    album: 'Stole the Show',
    genre: 'Jazz' },
  { name: 'In Your Arms',
    artist: 'Nico & Vinz',
    album: 'Black Star Elephant',
    genre: 'Folk' },
  { name: 'Intoxicated',
    artist: 'Martin Solveig',
    album: 'Intoxicated (Radio Edit)',
    genre: 'Indie' },
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
    genre: 'Pop' },
  { name: 'Theme Music'} ]

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
            {text: 'log.csv', value: '/Users/LaconaUser/Documents/log.csv'},
            {text: 'lacona-logo.png', value: '/Users/LaconaUser/Documents/lacona-logo.png'},
            {text: 'kickstarter-video.m4v', value: '/Users/LaconaUser/Documents/kickstarter-video.m4v'},
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

class SystemPreference extends Phrase {
  describe () {
    return (
      <argument text='preference pane' showForEmpty={true}>
        <list items={[
          {text: 'Displays', value: 'Displays'},
          {text: 'Desktop & Screen Saver', value: 'Desktop & Screen Saver'},
          {text: 'Extensions', value: 'Extensions'},
          {text: 'Energy Saver', value: 'Energy Saver'},
          {text: 'Sound', value: 'Sound'},
          {text: 'Keyboard', value: 'Keyboard'},
          {text: 'Internet Accounts', value: 'Internet Accounts'},
          {text: 'Date & Time', value: 'Date & Time'},
          {text: 'Accessibility', value: 'Accessibility'},
          {text: 'Security & Privacy', value: 'Security & Privacy'},
          {text: 'Dock', value: 'Dock'},
          {text: 'Profiles', value: 'Profiles'},
          {text: 'Network', value: 'Network'},
          {text: 'Notifications', value: 'Notifications'},
          {text: 'Fibre Channel', value: 'Fibre Channel'},
          {text: 'App Store', value: 'App Store'},
          {text: 'Time Machine', value: 'Time Machine'},
          {text: 'General', value: 'General'},
          {text: 'Dictation & Speech', value: 'Dictation & Speech'},
          {text: 'Spotlight', value: 'Spotlight'},
          {text: 'Ink', value: 'Ink'},
          {text: 'Language & Region', value: 'Language & Region'},
          {text: 'CDs & DVDs', value: 'CDs & DVDs'},
          {text: 'Sharing', value: 'Sharing'},
          {text: 'Users & Groups', value: 'Users & Groups'},
          {text: 'Bluetooth', value: 'Bluetooth'},
          {text: 'Mouse', value: 'Mouse'},
          {text: 'Trackpad', value: 'Trackpad'},
          {text: 'Mission Control', value: 'Mission Control'},
          {text: 'Startup Disk', value: 'Startup Disk'},
          {text: 'Parental Controls', value: 'Parental Controls'},
          {text: 'Printers & Scanners', value: 'Printers & Scanners'},
          {text: 'iCloud', value: 'iCloud'}
        ]} />
      </argument>
    )
  }
}

class Application extends Phrase {
  describe () {
    return (
      <argument text='application' showForEmpty={true}>
        <list score={1} items={[
          {text: 'Calendar', value: 'Calendar'},
          {text: 'Contacts', value: 'Contacts'},
          {text: 'FaceTime', value: 'FaceTime'},
          {text: 'Finder', value: 'Finder'},
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
          {text: 'Google Chrome', value: 'Google Chrome'},
          {text: 'Firefox', value: 'Firefox'},
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
          {text: 'Gmail', value:'http://gmail.com'},
          {text: 'Youtube', value:'http://youtube.com'},
          {text: 'Wikipedia', value:'http://wikipedia.org'},
          {text: 'Ebay', value:'http://ebay.com'}
        ]} fuzzy={true} />
    </argument>
    )
  }
}

class AppsGroup extends Phrase {
  describe () {
    return (
      <repeat unique={true} separator={<list items={[' and ', ', ', ', and ']} limit={1} max={this.props.max} />}>
        <choice>
          <Application id='app' />
        </choice>
      </repeat>
    )
  }
}

class OpenableGroup extends Phrase {
  describe () {
    return (
      <repeat unique={true} separator={<list items={[' and ', ', ', ', and ']} limit={1} />}>
        <choice>
          <Application id='app' />
          <URL id='url' />
          <Bookmark id='url' />
          <File id='file' />
          <SystemPreference id='pref' />
        </choice>
      </repeat>
    )
  }
}

class OpenInableGroup extends Phrase {
  describe () {
    return (
      <repeat unique={true} separator={<list items={[' and ', ', ', ', and ']} limit={1} />}>
        <choice>
          <URL id='url' />
          <Bookmark id='url' />
          <File id='file' />
        </choice>
      </repeat>
    )
  }
}

class Open extends Phrase {
  filter (result) {
    const allPrefs = _.filter(result.things, 'pref')
    return allPrefs.length < 2
  }

  describe () {
    return (
      <choice id='open'>
        <sequence>
          <literal text='open ' category='action' value='open' id='verb' />
          <choice merge={true}>
            <OpenableGroup id='things' />
            <sequence>
              <OpenInableGroup id='things' />
              <list items={[' with ', ' using ', ' in ']} limit={1} category='conjunction' />
              <AppsGroup id='openin' />
            </sequence>
          </choice>
        </sequence>
        <sequence>
          <literal text='switch to ' category='action' value='switch' id='verb' />
          <AppsGroup max={1} id='things' />
        </sequence>
        <sequence>
          <list items={[
              {text: 'close ', value: 'close'},
              {text: 'quit ', value: 'quit'},
              {text: 'kill ', value: 'kill'},
              {text: 'launch ', value: 'open'}
            ]} id='verb' category='action' limit={2} />
          <AppsGroup id='things' />
        </sequence>
      </choice>
    )
  }
}

export const open = {
  grammar: <Open id='open' />
}

class Birthday extends Phrase {
  getValue () {
    return new Date(2015, 9, 11, 0, 0, 0, 0)
  }

  describe () {
    return (
      <sequence>
        <literal text='on ' optional={true} prefered={true} limited={true} />
        <argument text='birthday' merge={true}>
          <choice>
            <sequence>
              <Contact argument={false} merge={true} />
              <literal text="'s birthday" />
            </sequence>
            <sequence>
              <Relationship argument={false} merge={true} />
              <literal text="'s birthday" />
            </sequence>
          </choice>
        </argument>
      </sequence>
    )
  }
}
Birthday.extends = [DatePhrase]

class Holiday extends Phrase {
  describe () {
    return (
      <argument text='holiday' showForEmpty={true}>
        <list items={[
          {text: 'New Years Day', value: new Date(2016, 0, 1)},
          {text: 'Martin Luther King Jr. Day', value: new Date(2016, 0, 18)},
          {text: 'Martin Luther King Day', value: new Date(2016, 0, 18)},
          {text: 'Dr. Martin Luther King Jr. Day', value: new Date(2016, 0, 18)},
          {text: 'Dr. Martin Luther King Day', value: new Date(2016, 0, 18)},
          {text: 'Valentines Day', value: new Date(2016, 1, 14)},
          {text: "Washington's Birthday", value: new Date(2016, 1, 15)},
          {text: 'Presidents Day', value: new Date(2016, 1, 15)},
          {text: 'Presidents Day', value: new Date(2016, 1, 15)},
          {text: 'Memorial Day', value: new Date(2016, 4, 30)},
          {text: 'Independence Day', value: new Date(2016, 6, 4)},
          {text: 'The Fourth of July', value: new Date(2016, 6, 4)},
          {text: 'Labor Day', value: new Date(2015, 8, 7)},
          {text: 'Columbus Day', value: new Date(2015, 9, 12)},
          {text: 'Christopher Columbus Day', value: new Date(2015, 9, 12)},
          {text: 'American Indian Day', value: new Date(2015, 9, 12)},
          {text: 'Native American Day', value: new Date(2015, 9, 12)},
          {text: "Indigenous People's Day ", value: new Date(2015, 9, 12)},
          {text: 'Veterans Day', value: new Date(2015, 10, 11)},
          {text: 'Thanksgiving Day', value: new Date(2015, 10, 26)},
          {text: 'Christmas Eve', value: new Date(2015, 11, 24)},
          {text: 'Christmas Day', value: new Date(2015, 11, 25)},
          {text: 'New Years Eve', value: new Date(2015, 11, 31)}]} />
      </argument>
    )
  }
}
Holiday.extends = [DatePhrase]

class LocationWithAt extends Phrase {
  describe () {
    return (
      <sequence>
        <list items={[' at ', ' on ', ' in ']} limit={1} category='conjunction' />
        <argument text='location' merge={true}>
          <freetext limit={1} splitOn=' ' />
        </argument>
      </sequence>
    )
  }
}

export const date = {
  grammar: (
    <choice id='date'>
      <sequence id='event' unique={true}>
        <list items={['schedule ', 'create an event ', 'create event ', 'add an event ', 'add event ']} limit={1} category='action' />
        <argument text='calendar event' id='title'>
          <freetext limit={1} splitOn=' ' />
        </argument>
        <LocationWithAt optional={true} id='location' prefered={false} />
        <list items={[' for ', ' at ', ' ']} category='conjunction' limit={1} />
        <choice limit={1} merge={true}>
          <DateTime id='datetime' />
          <Time id='time' />
          <DatePhrase id='date' />
          <TimePeriod id='period' />
        </choice>
        <LocationWithAt optional={true} prefered={false} id='location' />
      </sequence>
      <sequence id='reminder'>
        <list items={['remind me to ', 'create reminder ', 'create a reminder ', 'add a reminder ', 'add reminder ']} limit={1} category='action' />
        <argument text='reminder title' id='title'>
          <freetext limit={1} splitOn=' ' />
        </argument>
        <sequence optional={true} merge={true}>
          <literal text=' ' category='conjunction' />
          <choice merge={true}>
            <Time id='time' includeAt={true} allowPast={false} />
            <DatePhrase id='date' allowPast={false} />
            <DateTime id='datetime' includeAt={true} allowPast={false} />
          </choice>
        </sequence>
      </sequence>
    </choice>
  ),
  extensions: [Birthday, Holiday]
}

const engines = [
  {text: 'Google', value: 'Google'},
  {text: 'Wikipedia', value: 'Wikipedia'},
  {text: 'Bing', value: 'Bing'},
  {text: 'Yahoo', value: 'Yahoo'},
  {text: 'Amazon', value: 'Amazon'},
  {text: 'Google Images', value: 'Google Images'},
  {text: 'DuckDuckGo', value: 'DuckDuckGo'},
  {text: 'Pinterest', value: 'Pinterest'},
  {text: 'Google Maps', value: 'Google Maps'},
  {text: 'Gmail', value: 'Gmail'},
  {text: 'Google Drive', value: 'Google Drive'},
  {text: 'Apple Maps', value: 'Apple Maps'},
  {text: 'Twitter', value: 'Twitter'},
  {text: 'IMDB', value: 'IMDB'},
  {text: 'LinkedIn', value: 'LinkedIn'},
  {text: 'Youtube', value: 'Youtube'},
  {text: 'Rotten Tomatoes', value: 'Rotten Tomatoes'},
  {text: 'Yubnub', value: 'Yubnub'},
  {text: 'Wolfram Alpha', value: 'Wolfram|Alpha'},
  {text: 'Facebook', value: 'Facebook'},
  {text: 'eBay', value: 'eBay'}
]

class SearchEngines extends Phrase {
  describe () {
    return (
      <repeat unique={true} separator={<list items={[' and ', ', ', ', and']} limit={1} />}>
        <argument text='search engine'>
          <list items={engines} fuzzy={true} limit={5} />
        </argument>
      </repeat>
    )
  }
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
        <descriptor text='search engine' argument={true}>
          <list items={engines} fuzzy={true} limit={5} />
        </descriptor>
        <sequence optional={true}>
          <list items={[' and ', ', ', ', and']} limit={1} />
          <SearchEngines id='engines'/>
        </sequence>
      </sequence>
    </choice>
  )
}

/*
if (global.location && global.location.hash === '#videodemo') {
  search.grammar = (
    <choice>
      <sequence>
        <literal text='ابحث ' category='action' />
        <literal text='في ' category='conjunction' />
        <argument text='محرك البحث'>
          <choice>
            <literal text='جوجل' />
            <literal text='يملي' />
          </choice>
        </argument>
        <literal text=' ' />
        <argument text='بحث'>
          <freetext />
        </argument>
      </sequence>

      <sequence>
        <literal text='найти ' category='action' />
        <literal text='в ' category='conjunction' />
        <argument text='поисковик'>
          <choice>
            <literal text='Яндексе' />
            <literal text='Гугле' />
          </choice>
        </argument>
        <literal text=' ' />
        <argument text='запрос'>
          <freetext />
        </argument>
      </sequence>

      <sequence>
        <literal text='buscar ' category='action' />
        <literal text='en ' category='conjunction' />
        <argument text='buscador'>
          <literal text='Google' />
        </argument>
        <literal text=' ' category='conjunction' />
        <argument text='consulta'>
          <freetext />
        </argument>
      </sequence>

      <sequence>
        <literal text='在' category='conjunction' />
        <argument text='搜寻引擎'>
          <choice>
            <literal text='百度' />
            <literal text='Google' />
          </choice>
        </argument>
        <literal text='上' category='conjunction' />
        <literal text='搜索' category='action' />
        <argument text='查询'>
          <freetext />
        </argument>
      </sequence>
    </choice>
  )
}*/

function itemify (x) {
  return {text: x, value: x}
}

class MusicItems extends Phrase {
  describe () {
    return (
      <repeat unique={true} separator={<list items={[' and ', ', ', ', and ']} limit={1} />}>
        <choice>
          <argument text='song' showForEmpty={true} id='song'>
            <list fuzzy={true} items={_.chain(tunes).map('name').filter().map(itemify).value()} limit={10} />
          </argument>
          <argument text='album' showForEmpty={true} id='album'>
            <list fuzzy={true} items={_.chain(tunes).map('album').filter().unique().map(itemify).value()} limit={10} />
          </argument>
          <argument text='artist' showForEmpty={true} id='artist'>
            <list fuzzy={true} items={_.chain(tunes).map('artist').filter().unique().map(itemify).value()} limit={10} />
          </argument>
          <argument text='genre' showForEmpty={true} id='genre'>
            <list fuzzy={true} items={_.chain(tunes).map('genre').filter().unique().map(itemify).value()} limit={10} />
          </argument>
          <argument text='playlist' showForEmpty={true} id='playlist'>
            <list fuzzy={true} items={['Jams', 'Chill', 'Workout', 'Driving'].map(itemify)} />
          </argument>
          <argument text='composer' showForEmpty={true} id='composer'><literal /></argument>
        </choice>
      </repeat>
    )
  }
}

export const play = {
  grammar: (
    <choice id='play'>
      <sequence>
        <literal text='play ' category='action'/>
        <choice merge={true}>
          <sequence>
            <MusicItems id='something' />
            <sequence merge={true} optional={true} id='shuffled' value={true}>
              <literal text=' ' />
              <descriptor argument={true} text='shuffled'>
                <literal text='shuffled' />
              </descriptor>
            </sequence>
          </sequence>
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

const contacts = [
  {text: 'Tony Stark', value: 'Tony Stark'},
  {text: 'Donald Blake', value: 'Donald Blake'},
  {text: 'Henry Pym', value: 'Henry Pym'},
  {text: 'Bruce Banner', value: 'Bruce Banner'},
  {text: 'Steve Rogers', value: 'Steve Rogers'},
  {text: 'Clinton Barton', value: 'Clinton Barton'},
  {text: 'Wanda Maximoff', value: 'Wanda Maximoff'},
  {text: 'Victor Shade', value: 'Victor Shade'},
  {text: 'Natalia Romanova', value: 'Natalia Romanova'},
  {text: 'Jennifer Walters', value: 'Jennifer Walters'},
  {text: 'Hank McCoy', value: 'Hank McCoy'},
  {text: 'Peter Quill', value: 'Peter Quill'},
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
]

class Contact extends Phrase {
  describe () {
    const firstNames = _.map(contacts, ({text, value}) => ({
      text: text.split(' ')[0],
      value,
      qualifier: text
    }))

    return (
      <descriptor placeholder={true} argument={this.props.argument} text='contact' showForEmpty={true}>
        <choice limit={1}>
          <list items={contacts} />
          <list items={firstNames} />
        </choice>
      </descriptor>
    )
  }
}
Contact.defaultProps = {
  argument: true
}


class Relationship extends Phrase {
  describe () {
    return (
      <descriptor placeholder={true} argument={this.props.argument} text='relationship' showForEmpty={true}>
        <sequence>
          <literal text='my ' optional={true} limited={true} />
          <list merge={true} items={[
            {text: 'Mom', value: 'your mom'},
            {text: 'Dad', value: 'your dad'},
            {text: 'Landlord', value: 'your landlord'},
            {text: 'Boss', value: 'your boss'},
            {text: 'Girlfriend', value: 'your girlfriend'},
            {text: 'Wife', value: 'your wife'},
            {text: 'Boyfriend', value: 'your boyfriend'},
            {text: 'Husband', value: 'your husband'}
          ]} />
        </sequence>
      </descriptor>
    )
  }
}
Relationship.defaultProps = {
  argument: true
}

class EmailGroup extends Phrase {
  describe () {
    return (
      <repeat unique={true} separator={<list items={[' and ', ', and ', ', ']} limit={1} />}>
        <choice>
          <Email id='address' />
          <Relationship id='relationship' />
          <Contact id='contact' />
        </choice>
      </repeat>
    )
  }
}

class NumberGroup extends Phrase {
  describe () {
    return (
      <repeat unique={true} separator={<list items={[' and ', ', and ', ', ']} limit={1} max={this.props.max} />}>
        <choice>
          <PhoneNumber id='number' />
          <Relationship id='relationship' />
          <Contact id='contact' />
        </choice>
      </repeat>
    )
  }
}

class AllGroup extends Phrase {
  describe () {
    return (
      <repeat unique={true} separator={<list items={[' and ', ', and ', ', ']} limit={1} max={this.props.max} />}>
        <choice>
          <Relationship id='relationship' />
          <Contact id='contact' />
          <PhoneNumber id='number' />
          <Email id='address' />
        </choice>
      </repeat>
    )
  }
}


export const contact = {
  grammar: (
    <choice id='contact'>
      <choice id='email'>
        <sequence>
          <list items={['email ', 'send an email to ', 'send email to ', 'shoot an email to ']} category='action' limit={1} />
          <EmailGroup id='to' />
        </sequence>
        <sequence>
          <list items={['send ']} category='action' limit={1} />
          <EmailGroup id='to' />
          <literal text=' an email' />
        </sequence>
        <sequence>
          <list items={['email ', 'send ']} category='action' limit={1}/>
          <argument text='message' id='message'>
            <freetext splitOn=' ' limit={1} />
          </argument>
          <literal text=' to ' category='conjunction' />
          <EmailGroup id='to' />
        </sequence>
        <sequence>
          <list items={['email ', 'send an email to ', 'send email to ', 'shoot an email to ']} category='action' limit={1} />
          <EmailGroup id='to' />
          <choice limit={1}>
            <literal text=' about ' />
            <literal text=' ' />
          </choice>
          <argument text='message' id='message'>
            <freetext splitOn=' ' limit={1} />
          </argument>
        </sequence>
        <sequence>
          <list items={['send ']} category='action' limit={1} />
          <EmailGroup id='to' />
          <choice limit={1} category='action'>
            <literal text=' an email about ' />
            <literal text=' an email ' />
            <literal text=' email about ' />
            <literal text=' email ' />
          </choice>
          <argument text='message' id='message'>
            <freetext splitOn=' ' limit={1} />
          </argument>
        </sequence>
      </choice>
      <sequence id='call'>
        <list items={['call ', 'ring ', 'call up ', 'ring up ']} category='action' limit={1} />
        <NumberGroup merge={true} max={1} />
      </sequence>
      <sequence id='facetime'>
        <literal text='facetime ' category='action' />
        <AllGroup merge={true} max={1} />
      </sequence>
      <choice id='text'>
        <sequence>
          <list items={['text ', 'iMessage ', 'shoot a text to ', 'send a text to ']} limit={1} category='action' />
          <AllGroup />
        </sequence>
        <sequence>
          <list items={['text ', 'iMessage ']} limit={1} category='action' />
          <argument text='message' id='message'>
            <freetext splitOn=' ' limit={1} />
          </argument>
          <literal text=' to ' category='conjunction' />
          <AllGroup merge={true} />
        </sequence>
        <sequence>
          <list items={['send ']} limit={1} category='action' />
          <AllGroup merge={true} />
          <choice limit={1} category='action'>
            <literal text=' a text saying ' />
            <literal text=' an iMessage saying' />
            <literal text=' a text ' />
            <literal text=' an iMessage' />
          </choice>
          <argument text='message' id='message'>
            <freetext splitOn=' ' limit={1} />
          </argument>
        </sequence>
        <sequence>
          <list items={['text ', 'iMessage ']} limit={1} category='action' />
          <AllGroup merge={true} />
          <choice limit={1}>
            <literal text=' saying ' />
            <literal text=' ' />
          </choice>
          <argument text='message' id='message'>
            <freetext splitOn=' ' limit={1} />
          </argument>
        </sequence>
      </choice>
    </choice>
  )
}

class Language extends Phrase {
  describe () {
    return (
      <argument text='language'>
        <list items={[
          {text: 'Afrikaans', value: 'Afrikaans'},
          {text: 'Albanian', value: 'Albanian'},
          {text: 'Arabic', value: 'Arabic'},
          {text: 'Armenian', value: 'Armenian'},
          {text: 'Azerbaijani', value: 'Azerbaijani'},
          {text: 'Basque', value: 'Basque'},
          {text: 'Belarusian', value: 'Belarusian'},
          {text: 'Bengali', value: 'Bengali'},
          {text: 'Bosnian', value: 'Bosnian'},
          {text: 'Bulgarian', value: 'Bulgarian'},
          {text: 'Catalan', value: 'Catalan'},
          {text: 'Cebuano', value: 'Cebuano'},
          {text: 'Chichewa', value: 'Chichewa'},
          {text: 'Chinese', value: 'Chinese (Simplified)'},
          {text: 'Chinese (Simplified)', value: 'Chinese (Simplified)'},
          {text: 'Chinese (Traditional)', value: 'Chinese (Traditional)'},
          {text: 'Croatian', value: 'Croatian'},
          {text: 'Czech', value: 'Czech'},
          {text: 'Danish', value: 'Danish'},
          {text: 'Dutch', value: 'Dutch'},
          {text: 'English', value: 'English'},
          {text: 'Esperanto', value: 'Esperanto'},
          {text: 'Estonian', value: 'Estonian'},
          {text: 'Filipino', value: 'Filipino'},
          {text: 'Finnish', value: 'Finnish'},
          {text: 'French', value: 'French'},
          {text: 'Galician', value: 'Galician'},
          {text: 'Georgian', value: 'Georgian'},
          {text: 'German', value: 'German'},
          {text: 'Greek', value: 'Greek'},
          {text: 'Gujarati', value: 'Gujarati'},
          {text: 'Haitian Creole', value: 'Creole'},
          {text: 'Hausa', value: 'Hausa'},
          {text: 'Hebrew', value: 'Hebrew'},
          {text: 'Hindi', value: 'Hindi'},
          {text: 'Hmong', value: 'Hmong'},
          {text: 'Hungarian', value: 'Hungarian'},
          {text: 'Icelandic', value: 'Icelandic'},
          {text: 'Igbo', value: 'Igbo'},
          {text: 'Indonesian', value: 'Indonesian'},
          {text: 'Irish', value: 'Irish'},
          {text: 'Italian', value: 'Italian'},
          {text: 'Japanese', value: 'Japanese'},
          {text: 'Javanese', value: 'Javanese'},
          {text: 'Kannada', value: 'Kannada'},
          {text: 'Kazakh', value: 'Kazakh'},
          {text: 'Khmer', value: 'Khmer'},
          {text: 'Korean', value: 'Korean'},
          {text: 'Lao', value: 'Lao'},
          {text: 'Latin', value: 'Latin'},
          {text: 'Latvian', value: 'Latvian'},
          {text: 'Lithuanian', value: 'Lithuanian'},
          {text: 'Macedonian', value: 'Macedonian'},
          {text: 'Malagasy', value: 'Malagasy'},
          {text: 'Malay', value: 'Malay'},
          {text: 'Malayalam', value: 'Malayalam'},
          {text: 'Maltese', value: 'Maltese'},
          {text: 'Maori', value: 'Maori'},
          {text: 'Marathi', value: 'Marathi'},
          {text: 'Mongolian', value: 'Mongolian'},
          {text: 'Myanmar', value: 'Burmese'},
          {text: 'Burmese', value: 'Burmese'},
          {text: 'Nepali', value: 'Nepali'},
          {text: 'Norwegian', value: 'Norwegian'},
          {text: 'Persian', value: 'Persian'},
          {text: 'Polish', value: 'Polish'},
          {text: 'Portuguese', value: 'Portuguese'},
          {text: 'Punjabi', value: 'Punjabi'},
          {text: 'Romanian', value: 'Romanian'},
          {text: 'Russian', value: 'Russian'},
          {text: 'Serbian', value: 'Serbian'},
          {text: 'Sesotho', value: 'Sesotho'},
          {text: 'Sinhala', value: 'Sinhala'},
          {text: 'Slovak', value: 'Slovak'},
          {text: 'Slovenian', value: 'Slovenian'},
          {text: 'Somali', value: 'Somali'},
          {text: 'Spanish', value: 'Spanish'},
          {text: 'Sundanese', value: 'Sundanese'},
          {text: 'Swahili', value: 'Swahili'},
          {text: 'Swedish', value: 'Swedish'},
          {text: 'Tajik', value: 'Tajik'},
          {text: 'Tamil', value: 'Tamil'},
          {text: 'Telugu', value: 'Telugu'},
          {text: 'Thai', value: 'Thai'},
          {text: 'Turkish', value: 'Turkish'},
          {text: 'Ukrainian', value: 'Ukrainian'},
          {text: 'Urdu', value: 'Urdu'},
          {text: 'Uzbek', value: 'Uzbek'},
          {text: 'Vietnamese', value: 'Vietnamese'},
          {text: 'Welsh', value: 'Welsh'},
          {text: 'Yiddish', value: 'Yiddish'},
          {text: 'Yoruba', value: 'Yoruba'},
          {text: 'Zulu', value: 'Zulu'}
        ]} />
      </argument>
    )
  }
}

export const translate = {
  grammar: (
    <sequence id='translate'>
      <literal text='translate ' category='action' />
      <argument text='phrase' id='phrase'>
        <freetext splitOn=' ' limit={1} />
      </argument>
      <sequence optional={true} merge={true}>
        <literal text=' from ' category='conjunction' />
        <Language id='from' />
      </sequence>
      <sequence optional={true} merge={true}>
        <literal text=' to ' />
        <repeat separator={<list items={[', ', ' and ', ', and ']} category='conjunction' limit={1} />} id='to'>
          <Language />
        </repeat>
      </sequence>
    </sequence>
  )
}

export const settings = {
  grammar: (
    <choice id='settings'>
      <sequence id='settings'>
        <choice merge={true}>
          <sequence>
            <list items={[
                {text: 'disable ', value: 'turn off'},
                {text: 'enable ', value: 'turn on'},
                {text: 'toggle ', value: 'toggle'},
                {text: 'turn off ', value: 'turn off'},
                {text: 'turn on ', value: 'turn on'}
              ]} limit={3} category='action' id='verb' />
            <argument text='setting' merge={true}>
              <choice>
                <list items={['wifi', 'airport']} value={{setting: 'wifi'}} limit={1} />
                <literal text='bluetooth' value={{setting: 'bluetooth'}} />
                <literal text='Do Not Disturb' value={{setting: 'Do Not Disturb'}} />
                <literal text='notifications' value={{setting: 'Do Not Disturb', direction: -1}} />
                <list items={['sound', 'audio']} value={{setting: 'the sound'}} limit={1} />
                <list items={['sleep', 'autosleep']} value={{setting: 'automatic sleeping'}} limit={1} />
                <literal text='Dock magnification' value={{setting: 'Dock magnification'}} />
                <list items={['Dock hiding', 'dock autohide', 'dock autohiding']} value={{setting: 'Dock hiding'}} limit={1} />
              </choice>
            </argument>
          </sequence>
          <list items={['caffeinate', 'do not sleep', 'do not go to sleep']} limit={1} category='action' value={{setting: 'automatic sleeping', verb: 'turn off'}} />
          <list items={['do not disturb', 'do not disturb me']} limit={1} category='action' value={{setting: 'Do Not Disturb', verb: 'turn on'}} />
        </choice>
        <sequence optional={true} id='duration'>
          <literal text=' for ' category='conjunction' />
          <argument text='amount of time' merge={true}>
            <TimeDuration />
          </argument>
        </sequence>
      </sequence>
      <choice id='actions'>
        <sequence>
          <list items={[
              {text: 'restart', value: 'restart the computer'},
              {text: 'shutdown', value: 'shutdown the computer'},
              {text: 'sleep', value: 'put the computer to sleep'},
              {text: 'lock', value: 'lock the computer'}
            ]} category='action' id='verb' />
          <list items={[' computer', ' the computer', ' system', ' the system']} limit={1} optional={true} prefered={false} limited={true} category='action' />
        </sequence>
        <literal text='empty Trash' category='action' value='empty the Trash' id='verb'/>
        <sequence id='verb'>
          <literal text='turn on ' category='action' value='turn on the screensaver' merge={true} />
          <literal text='the ' optional={true} prefered={false} limited={true} category='action' />
          <list items={['screensaver', 'screen saver']} limit={1} category='action' />
        </sequence>
        <sequence id='verb'>
          <literal text='turn off ' category='action' />
          <literal text='the ' optional={true} prefered={false} limited={true} category='action' />
          <choice merge={true}>
            <list items={['display', 'screen']} limit={1} category='action' value='turn off the display' />
            <list items={['computer', 'system']} limit={1} category='action' value='shutdown the computer' />
          </choice>
        </sequence>
        <sequence>
          <literal text='eject ' category='action' id='verb' value='eject' />
          <choice merge={true}>
            <list items={['all', 'everything', 'all devices']} limit={1} category='action' id='verb' value='eject every volume and drive' />
            <argument text='volume' id='object'>
              <list items={[
                  {text: 'Lacona.dmg', value:' Lacona.dmg'},
                  {text: 'Flash Drive', value: 'Flash Drive'},
                  {text: 'Remote Disc', value: 'Remote Disc'}
                ]} />
            </argument>
          </choice>
        </sequence>
      </choice>
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
      {translate.grammar}
      {settings.grammar}
    </choice>
  ),
  extensions: [Birthday, Holiday]
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
