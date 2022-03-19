import { v4 as uuidv4 } from 'uuid';


let sitesDB = [
  {
    id: uuidv4(),
    name: 'gmail',
    address: 'https://mail.google.com/mail/u/0',
    key: 'g',
    search: 'https://mail.google.com/mail/u/0/#search/',
    hues: ['0', '0'],
  },
  {
    id: uuidv4(),
    name: 'whatsapp',
    address: 'https://web.whatsapp.com/',
    key: 'w',
    hues: ['355', '335'],
  },
  {
    id: uuidv4(),
    name: 'linkedin',
    address: 'https://www.linkedin.com/',
    key: 'k',
    search: 'https://www.linkedin.com/search/results/all/?keywords=',
    hues: ['349', '329']
  },
  {
    id: uuidv4(),
    name: 'github',
    address: 'https://github.com/',
    key: 'h',
    search: 'https://github.com/search?q=',
    hues: ['337', '317']
  },
  {
    id: uuidv4(),
    name: 'gdrive',
    address: 'https://drive.google.com/drive/u/0/my-drive',
    key: 'z',
    search: 'https://drive.google.com/drive/u/0/search?q=',
    hues: ['266', '286']
  },
  {
    id: uuidv4(),
    name: 'reddit',
    address: 'https://www.reddit.com/',
    key: 'r',
    search: 'https://www.reddit.com/search?q=',
    hues: ['230', '280']
  },
  {
    id: uuidv4(),
    name: 'discord',
    address: 'https://discord.com/channels/@me',
    key: 'd',
    hues: ['264', '244']
  },
  {
    id: uuidv4(),
    name: 'youtube',
    address: 'https://www.youtube.com/feed/subscriptions',
    key: 'y',
    search: 'https://www.youtube.com/results?search_query=',
    hues: ['254', '234']
  },
  {
    id: uuidv4(),
    name: 'netflix',
    address: 'https://www.netflix.com/browse',
    search: 'https://www.netflix.com/search?q=',
    key: 'n',
    hues: ['226', '236']
  },
  {
    id: uuidv4(),
    name: 'twitch',
    address: 'https://www.twitch.tv/directory',
    key: 't',
    hues: ['192', '232']
  },
  {
    id: uuidv4(),
    name: 'spotify',
    address: 'https://open.spotify.com/',
    key: 's',
    search: 'https://open.spotify.com/search/',
    hues: ['217', '197']
  },
  {
    id: uuidv4(),
    name: 'podcast',
    address: 'https://99percentinvisible.org/',
    key: 'b',
    hues: ['203', '183']
  },
  {
    id: uuidv4(),
    name: 'news',
    address: 'https://www.newslookup.com/',
    key: 'e',
    search: 'https://newslookup.com/results?ovs=&dp=&mt=-1&mtx=0&tp=&s=&groupby=no&cat=-1&fmt=&ut=&mkt=0&mktx=0&q=',
    hues: ['166', '146']
  },
  {
    id: uuidv4(),
    name: 'letterboxd',
    address: 'https://letterboxd.com/',
    key: 'l',
    search: 'https://letterboxd.com/search/',
    hues: ['124', '164']
  },
  {
    id: uuidv4(),
    name: 'photopea',
    address: 'https://www.photopea.com/',
    key: 'j',
    hues: ['90', '150']
  },
  {
    id: uuidv4(),
    name: 'translator',
    address: 'https://www.deepl.com/translator',
    key: 'f',
    hues: ['90', '90']
  },
  {
    id: uuidv4(),
    name: 'onelook',
    address: 'https://www.onelook.com/reverse-dictionary.shtml',
    key: 'o',
    hues: ['45', '40']
  },
  {
    id: uuidv4(),
    name: 'devhints',
    address: 'https://devhints.io/',
    key: 'x',
    hues: ['32', '22']
  },
  {
    id: uuidv4(),
    name: 'devtools',
    address: 'https://tiny-helpers.dev/',
    key: 'u',
    hues: ['13', '33']
  },
  {
    id: uuidv4(),
    name: 'ninite',
    address: 'https://ninite.com/',
    key: 'q',
    hues: ['4', '24']
  },
];

export default sitesDB;