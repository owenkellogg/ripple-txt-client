'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _http = require('superagent');

var _http2 = _interopRequireWildcard(_http);

var _Promise = require('bluebird');

var _Promise2 = _interopRequireWildcard(_Promise);

var NotFoundError = (function (_Error) {
  function NotFoundError() {
    _classCallCheck(this, NotFoundError);

    _get(Object.getPrototypeOf(NotFoundError.prototype), 'constructor', this).call(this);
    this.message = 'ripple.txt not found';
  }

  _inherits(NotFoundError, _Error);

  return NotFoundError;
})(Error);

var RippleTxtClient = (function () {
  function RippleTxtClient() {
    _classCallCheck(this, RippleTxtClient);
  }

  _createClass(RippleTxtClient, [{
    key: 'fetch',
    value: function fetch(domain) {
      var _this = this;

      return this._fetch(domain).then(function (txt) {
        return _Promise2['default'].resolve(_this._parse(txt));
      });
    }
  }, {
    key: 'NotFoundError',
    get: function () {
      return NotFoundError;
    }
  }, {
    key: '_fetch',
    value: function _fetch(domain) {
      return new _Promise2['default'](function (resolve, reject) {
        _http2['default'].get('https://' + domain + '/ripple.txt').end(function (err, resp) {
          if (err) {
            return reject(new NotFoundError('ripple.txt not found'));
          }
          resolve(resp.text);
        });
      });
    }
  }, {
    key: '_parse',
    value: function _parse(txt) {
      txt = txt.replace('\r\n', '\n');
      txt = txt.replace('\r', '\n');
      txt = txt.split('\n');

      var currentSection = '',
          sections = {};
      for (var i = 0, l = txt.length; i < l; i++) {
        var line = txt[i];
        if (!line.length || line[0] === '#') {
          continue;
        } else if (line[0] === '[' && line[line.length - 1] === ']') {
          currentSection = line.slice(1, line.length - 1);
          sections[currentSection] = [];
        } else {
          line = line.replace(/^\s+|\s+$/g, '');
          if (sections[currentSection]) {
            sections[currentSection].push(line);
          }
        }
      }

      return sections;
    }
  }]);

  return RippleTxtClient;
})();

exports['default'] = RippleTxtClient;
module.exports = exports['default'];