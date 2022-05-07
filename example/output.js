
(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id];

    function localRequire(relativePath) {
      return require(mapping[relativePath]);
    }

    const module = { exports: {} };
    fn(localRequire, module, module.exports);
    return module.exports
  }
  require(0);
})({
  0: [
    function (require, module, exports) {
      "use strict";

      var _foo = require("./foo.js");

      (0, _foo.foo)();
      console.log("something");
    },
    { "./foo.js": 1 }
  ], 0: [
    function (require, module, exports) {
      "use strict";

      var _foo = require("./foo.js");

      (0, _foo.foo)();
      console.log("something");
    },
    { "./foo.js": 1 }
  ], 1: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.foo = undefined;

      var _bar = require("./bar.js");

      var _bar2 = _interopRequireDefault(_bar);

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      function foo() {
        console.log('1');
      }

      exports.foo = foo;
    },
    { "./bar.js": 2 }
  ], 0: [
    function (require, module, exports) {
      "use strict";

      var _foo = require("./foo.js");

      (0, _foo.foo)();
      console.log("something");
    },
    { "./foo.js": 1 }
  ], 0: [
    function (require, module, exports) {
      "use strict";

      var _foo = require("./foo.js");

      (0, _foo.foo)();
      console.log("something");
    },
    { "./foo.js": 1 }
  ], 1: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.foo = undefined;

      var _bar = require("./bar.js");

      var _bar2 = _interopRequireDefault(_bar);

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

      function foo() {
        console.log('1');
      }

      exports.foo = foo;
    },
    { "./bar.js": 2 }
  ], 2: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.bar = bar;

      function bar() { }
    },
    {}
  ],
})
