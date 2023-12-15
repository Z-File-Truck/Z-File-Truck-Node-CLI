// Word/Text Formats
const txt = ['.doc', '.docx', '.rtf', '.txt', '.odt', '.odp', '.wpd', '.tex', '.log', '.xml', '.json'];

// Spreadsheet Formats
const sheet = ['.xls', '.xlsx', '.csv', '.ods', '.numbers', '.dif', '.dbf', '.sxc'];

// PDF Formats
const pdf = ['.pdf', '.djvu', '.xps', '.epub'];

// Presentation Formats
const ppt = ['.ppt', '.pptx', '.pps', '.ppsx', '.odp'];

// Docs Formats
const docs = [...txt, ...sheet, ...pdf, ...ppt];

// Popular Video Formats
const vid = ['.mp4', '.avi', '.mkv', '.ts', '.mov', '.wmv', '.flv', '.webp', '.mpg', '.ogm', '.m2p', '.m2ts', '.m4p', '.vob', '.asx'];

// All Known Video Formats
const xvid = [
  ...vid,
  '.3g2', '.3gp2', '.3gpp', '.amv', '.bik', '.csf', '.divx', '.drc', '.dv', '.dvr-ms', '.evo',
  '.eye', '.flc', '.fli', '.flx', '.flic', '.fli', '.flx', '.gl', '.grasp', '.gvi', '.m1v',
  '.m2t', '.mj2', '.mjp2', '.mov', '.mp2v', '.mpe', '.mpv2', '.m2v', '.mpv', '.nsf', '.nut',
  '.nsv', '.pva', '.qt', '.r3d', '.rm', '.rmvb', '.roq', '.rp', '.smk', '.swf', '.svi', '.trp',
  '.ts', '.tts', '.vdo', '.vfw', '.vid', '.viv', '.vivo', '.vob', '.vp6', '.vp7', '.wmx', '.wm',
  '.wmp', '.wvx', '.yuv'
];

// Popular Image Formats
const img = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp', '.svg', '.ico'];

// All Known Image Formats
const xImg = [
    ...img, '.jfif', '.pjpeg', '.pjp',
    '.ai', '.eps', '.psd', '.indd', '.pdf', '.raw', '.svgz',
    '.arw', '.cr2', '.nrw', '.k25', '.bmp', '.crw', '.dcr', '.dng', '.erf', '.gif', '.ico', '.jfif', '.jpg', '.jpeg', '.mos', '.mrw',
    '.nef', '.orf', '.pef', '.png', '.ppm', '.pbm', '.pgm', '.pnm', '.raf', '.rw2', '.rwl', '.srw', '.tif', '.tiff', '.webp', '.x3f'
];

// Popular Audio Formats
const aud = ['.mp3', '.wav', '.ogg', '.flac', '.aac'];

// All Known Audio Formats
const xAud = [
  '.mp3', '.wav', '.ogg', '.flac', '.aac', '.wma', '.m4a', '.mp2', '.opus', '.aiff', '.amr',
  '.ape', '.au', '.pcm', '.adpcm', '.dts', '.dsd', '.gsm', '.mka', '.m3u', '.mid', '.midi',
  '.mod', '.s3m', '.it', '.xm', '.ra', '.rm', '.ram', '.ac3', '.ec3', '.mlp', '.alac', '.caf',
  '.spx', '.opus', '.opus', '.tta', '.wv', '.ra', '.rma', '.ofr', '.ofs', '.ofs', '.wma'
];

// All Formats
const allFormats = ['*'];

const CONSTANTS = {
    quickFileTypes: {
        'all': {
            val: ['*'],
            desc: 'All Files'
        },
        'docs': {
            val: docs,
            desc: 'All Document Files'
        },
        'txt': {
            val: txt,
            desc: 'All Text Files'
        },
        'sheet': {
            val: sheet,
            desc: 'All Spreadsheet Files'
        },
        'pdf': {
            val: pdf,
            desc: 'All PDF Files'
        },
        'ppt': { 
            val: ppt,
            desc: 'All Presentation Files'
        },
        'vid': {
            val: vid,
            desc: 'All Popular Video Files'
        },
        'xvid': {
            val: xvid,
            desc: 'All Video Files'
        },
        'img': {
            val: img,
            desc: 'All Popular Image Files'
        },
        'ximg': {
            val: xImg,
            desc: 'All Image Files'
        },
        'aud': {
            val: aud,
            desc: 'All Popular Audio Files'
        },
        'xaud': {
            val: xAud,
            desc: 'All Audio Files'
        }
    }
}

export default CONSTANTS;