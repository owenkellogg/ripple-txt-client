
import http from 'superagent'
import Promise from 'bluebird'

class NotFoundError extends Error {
  constructor() {
    super()
    this.message = 'ripple.txt not found'
  }
}

export default class RippleTxtClient {

  fetch(domain) {
    return this._fetch(domain)
      .then(txt => {
        return Promise.resolve(this._parse(txt))
      })
  }

  get NotFoundError() {
    return NotFoundError
  }

  _fetch(domain) {
    return new Promise((resolve, reject) => {
      http
        .get('https://'+domain+'/ripple.txt')
        .end((err, resp) => {
          if (err) { return reject(new NotFoundError('ripple.txt not found')) }
          resolve(resp.text)
        })
    })
  }

  _parse(txt) {
    txt = txt.replace('\r\n', '\n');
    txt = txt.replace('\r', '\n');
    txt = txt.split('\n');

    let currentSection = "", sections = {};
    for (let i = 0, l = txt.length; i < l; i++) {
      let line = txt[i];
      if (!line.length || line[0] === '#') {
        continue;
      }
      else if (line[0] === '[' && line[line.length - 1] === ']') {
        currentSection = line.slice(1, line.length - 1);
        sections[currentSection] = [];
      }
      else {
        line = line.replace(/^\s+|\s+$/g, '');
        if (sections[currentSection]) {
          sections[currentSection].push(line);
        }
      }
    }

    return sections;
  }
}

