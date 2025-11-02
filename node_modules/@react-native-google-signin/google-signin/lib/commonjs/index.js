"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  GoogleSignin: true,
  statusCodes: true,
  GoogleSigninButton: true
};
Object.defineProperty(exports, "GoogleSignin", {
  enumerable: true,
  get: function () {
    return _GoogleSignin.GoogleSigninSingleton;
  }
});
Object.defineProperty(exports, "GoogleSigninButton", {
  enumerable: true,
  get: function () {
    return _GoogleSigninButton.GoogleSigninButton;
  }
});
Object.defineProperty(exports, "statusCodes", {
  enumerable: true,
  get: function () {
    return _GoogleSignin.statusCodes;
  }
});
var _GoogleSignin = require("./GoogleSignin");
var _GoogleSigninButton = require("./GoogleSigninButton");
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
//# sourceMappingURL=index.js.map