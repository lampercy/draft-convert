(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOMServer"), require("Draft"), require("Immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOMServer", "Draft", "Immutable"], factory);
	else if(typeof exports === 'object')
		exports["DraftConvert"] = factory(require("React"), require("ReactDOMServer"), require("Draft"), require("Immutable"));
	else
		root["DraftConvert"] = factory(root["React"], root["ReactDOMServer"], root["Draft"], root["Immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_23__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseHTML = exports.convertFromHTML = exports.convertToHTML = undefined;

	var _convertToHTML = __webpack_require__(14);

	var _convertToHTML2 = _interopRequireDefault(_convertToHTML);

	var _convertFromHTML = __webpack_require__(13);

	var _convertFromHTML2 = _interopRequireDefault(_convertFromHTML);

	var _parseHTML = __webpack_require__(8);

	var _parseHTML2 = _interopRequireDefault(_parseHTML);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.convertToHTML = _convertToHTML2.default;
	exports.convertFromHTML = _convertFromHTML2.default;
	exports.parseHTML = _parseHTML2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (r1, r2) {
	  if (r1.offset === r2.offset) {
	    return r2.length - r1.length;
	  }
	  return r1.offset - r2.offset;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = splitReactElement;

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _server2 = _interopRequireDefault(_server);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// see http://w3c.github.io/html/syntax.html#writing-html-documents-elements
	var VOID_TAGS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

	function splitReactElement(element) {
	  if (VOID_TAGS.indexOf(element.type) !== -1) {
	    return _server2.default.renderToStaticMarkup(element);
	  }

	  var tags = _server2.default.renderToStaticMarkup(_react2.default.cloneElement(element, {}, '\r')).split('\r');

	  (0, _invariant2.default)(tags.length > 1, 'convertToHTML: Element of type ' + element.type + ' must render children');

	  (0, _invariant2.default)(tags.length < 3, 'convertToHTML: Element of type ' + element.type + ' cannot use carriage return character');

	  return {
	    start: tags[0],
	    end: tags[1]
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (newFn, rest) {
	  return function () {
	    var newResult = newFn.apply(undefined, arguments);
	    if (newResult !== undefined && newResult !== null) {
	      return newResult;
	    }

	    return rest.apply(undefined, arguments);
	  };
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getElementHTML;

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _server2 = _interopRequireDefault(_server);

	var _splitReactElement = __webpack_require__(4);

	var _splitReactElement2 = _interopRequireDefault(_splitReactElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function hasChildren(element) {
	  return _react2.default.isValidElement(element) && _react2.default.Children.count(element.props.children) > 0;
	}

	function getElementHTML(element) {
	  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	  if (element === undefined || element === null) {
	    return element;
	  }

	  if (typeof element === 'string') {
	    return element;
	  }

	  if (_react2.default.isValidElement(element)) {
	    if (hasChildren(element)) {
	      return _server2.default.renderToStaticMarkup(element);
	    }

	    var tags = (0, _splitReactElement2.default)(element);

	    if (text !== null) {
	      var start = tags.start,
	          end = tags.end;

	      return start + text + end;
	    }

	    return tags;
	  }

	  (0, _invariant2.default)(Object.prototype.hasOwnProperty.call(element, 'start') && Object.prototype.hasOwnProperty.call(element, 'end'), 'convertToHTML: received conversion data without either an HTML string, ReactElement or an object with start/end tags');

	  if (text !== null) {
	    var _start = element.start,
	        _end = element.end;

	    return _start + text + _end;
	  }

	  return element;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parseHTML;
	var fallback = function fallback(html) {
	  var doc = document.implementation.createHTMLDocument('');
	  doc.documentElement.innerHTML = html;
	  return doc;
	};

	function parseHTML(html) {
	  var doc = void 0;
	  if (typeof DOMParser !== 'undefined') {
	    var parser = new DOMParser();
	    doc = parser.parseFromString(html, 'text/html');
	    if (doc === null || doc.body === null) {
	      doc = fallback(html);
	    }
	  } else {
	    doc = fallback(html);
	  }
	  return doc.body;
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = updateMutation;
	function updateMutation(mutation, originalOffset, originalLength, newLength, prefixLength, suffixLength) {
	  // three cases we can reasonably adjust - disjoint mutations that
	  // happen later on where the offset will need to be changed,
	  // mutations that completely contain the new one where we can adjust
	  // the length, and mutations that occur partially within the new one.
	  var lengthDiff = newLength - originalLength;

	  var mutationAfterChange = originalOffset + originalLength <= mutation.offset;
	  if (mutationAfterChange) {
	    return Object.assign({}, mutation, {
	      offset: mutation.offset + lengthDiff
	    });
	  }

	  var mutationContainsChange = originalOffset >= mutation.offset && originalOffset + originalLength <= mutation.offset + mutation.length;
	  if (mutationContainsChange) {
	    return Object.assign({}, mutation, {
	      length: mutation.length + lengthDiff
	    });
	  }

	  var mutationWithinPrefixChange = mutation.offset >= originalOffset && mutation.offset + mutation.length <= originalOffset + originalLength && prefixLength > 0;
	  if (mutationWithinPrefixChange) {
	    return Object.assign({}, mutation, {
	      offset: mutation.offset + prefixLength
	    });
	  }

	  var mutationContainsPrefix = mutation.offset < originalOffset && mutation.offset + mutation.length <= originalOffset + originalLength && mutation.offset + mutation.length > originalOffset && prefixLength > 0;
	  if (mutationContainsPrefix) {
	    return [Object.assign({}, mutation, {
	      length: originalOffset - mutation.offset
	    }), Object.assign({}, mutation, {
	      offset: originalOffset + prefixLength,
	      length: mutation.offset - originalOffset + mutation.length
	    })];
	  }

	  var mutationContainsSuffix = mutation.offset >= originalOffset && mutation.offset + mutation.length > originalOffset + originalLength && originalOffset + originalLength > mutation.offset && suffixLength > 0;
	  if (mutationContainsSuffix) {
	    return [Object.assign({}, mutation, {
	      offset: mutation.offset + prefixLength,
	      length: originalOffset + originalLength - mutation.offset
	    }), Object.assign({}, mutation, {
	      offset: originalOffset + originalLength + prefixLength + suffixLength,
	      length: mutation.offset + mutation.length - (originalOffset + originalLength)
	    })];
	  }

	  return mutation;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _updateMutation = __webpack_require__(9);

	var _updateMutation2 = _interopRequireDefault(_updateMutation);

	var _rangeSort = __webpack_require__(3);

	var _rangeSort2 = _interopRequireDefault(_rangeSort);

	var _getElementHTML = __webpack_require__(7);

	var _getElementHTML2 = _interopRequireDefault(_getElementHTML);

	var _getElementTagLength = __webpack_require__(20);

	var _getElementTagLength2 = _interopRequireDefault(_getElementTagLength);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var converter = function converter() {
	  var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var originalText = arguments[1];

	  return originalText;
	};

	exports.default = function (block, entityMap) {
	  var entityConverter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : converter;

	  var resultText = [].concat(_toConsumableArray(block.text));

	  var getEntityHTML = entityConverter;

	  if (entityConverter.__isMiddleware) {
	    getEntityHTML = entityConverter(converter);
	  }

	  if (Object.prototype.hasOwnProperty.call(block, 'entityRanges') && block.entityRanges.length > 0) {
	    var entities = block.entityRanges.sort(_rangeSort2.default);

	    var styles = block.inlineStyleRanges;

	    var _loop = function _loop(index) {
	      var entityRange = entities[index];
	      var entity = entityMap[entityRange.key];

	      var originalText = resultText.slice(entityRange.offset, entityRange.offset + entityRange.length).join('');

	      var entityHTML = getEntityHTML(entity, originalText);
	      var converted = [].concat(_toConsumableArray((0, _getElementHTML2.default)(entityHTML, originalText) || originalText));

	      var prefixLength = (0, _getElementTagLength2.default)(entityHTML, 'start');
	      var suffixLength = (0, _getElementTagLength2.default)(entityHTML, 'end');

	      var updateLaterMutation = function updateLaterMutation(mutation, mutationIndex) {
	        if (mutationIndex > index || Object.prototype.hasOwnProperty.call(mutation, 'style')) {
	          return (0, _updateMutation2.default)(mutation, entityRange.offset, entityRange.length, converted.length, prefixLength, suffixLength);
	        }
	        return mutation;
	      };

	      var updateLaterMutations = function updateLaterMutations(mutationList) {
	        return mutationList.reduce(function (acc, mutation, mutationIndex) {
	          var updatedMutation = updateLaterMutation(mutation, mutationIndex);
	          if (Array.isArray(updatedMutation)) {
	            return acc.concat(updatedMutation);
	          }

	          return acc.concat([updatedMutation]);
	        }, []);
	      };

	      entities = updateLaterMutations(entities);
	      styles = updateLaterMutations(styles);

	      resultText = [].concat(_toConsumableArray(resultText.slice(0, entityRange.offset)), _toConsumableArray(converted), _toConsumableArray(resultText.slice(entityRange.offset + entityRange.length)));
	    };

	    for (var index = 0; index < entities.length; index++) {
	      _loop(index);
	    }

	    return Object.assign({}, block, {
	      text: resultText.join(''),
	      inlineStyleRanges: styles,
	      entityRanges: entities
	    });
	  }

	  return block;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _styleObjectFunction = __webpack_require__(22);

	var _styleObjectFunction2 = _interopRequireDefault(_styleObjectFunction);

	var _accumulateFunction = __webpack_require__(6);

	var _accumulateFunction2 = _interopRequireDefault(_accumulateFunction);

	var _getElementHTML = __webpack_require__(7);

	var _getElementHTML2 = _interopRequireDefault(_getElementHTML);

	var _rangeSort = __webpack_require__(3);

	var _rangeSort2 = _interopRequireDefault(_rangeSort);

	var _defaultInlineHTML = __webpack_require__(16);

	var _defaultInlineHTML2 = _interopRequireDefault(_defaultInlineHTML);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var subtractStyles = function subtractStyles(original, toRemove) {
	  return original.filter(function (el) {
	    return !toRemove.some(function (elToRemove) {
	      return elToRemove.style === el.style;
	    });
	  });
	};

	var popEndingStyles = function popEndingStyles(styleStack, endingStyles) {
	  return endingStyles.reduceRight(function (stack, style) {
	    var styleToRemove = stack[stack.length - 1];

	    (0, _invariant2.default)(styleToRemove.style === style.style, 'Style ' + styleToRemove.style + ' to be removed doesn\'t match expected ' + style.style);

	    return stack.slice(0, -1);
	  }, styleStack);
	};

	var characterStyles = function characterStyles(offset, ranges) {
	  return ranges.filter(function (range) {
	    return offset >= range.offset && offset < range.offset + range.length;
	  });
	};

	var rangeIsSubset = function rangeIsSubset(firstRange, secondRange) {
	  // returns true if the second range is a subset of the first
	  var secondStartWithinFirst = firstRange.offset <= secondRange.offset;
	  var secondEndWithinFirst = firstRange.offset + firstRange.length >= secondRange.offset + secondRange.length;

	  return secondStartWithinFirst && secondEndWithinFirst;
	};

	var latestStyleLast = function latestStyleLast(s1, s2) {
	  // make sure longer-lasting styles are added first
	  var s2endIndex = s2.offset + s2.length;
	  var s1endIndex = s1.offset + s1.length;
	  return s2endIndex - s1endIndex;
	};

	var getStylesToReset = function getStylesToReset(remainingStyles, newStyles) {
	  var i = 0;
	  while (i < remainingStyles.length) {
	    if (newStyles.every(rangeIsSubset.bind(null, remainingStyles[i]))) {
	      i++;
	    } else {
	      return remainingStyles.slice(i);
	    }
	  }
	  return [];
	};

	var appendStartMarkup = function appendStartMarkup(inlineHTML, string, styleRange) {
	  return string + (0, _getElementHTML2.default)(inlineHTML(styleRange.style)).start;
	};

	var prependEndMarkup = function prependEndMarkup(inlineHTML, string, styleRange) {
	  return (0, _getElementHTML2.default)(inlineHTML(styleRange.style)).end + string;
	};

	var defaultCustomInlineHTML = function defaultCustomInlineHTML(next) {
	  return function (style) {
	    return next(style);
	  };
	};
	defaultCustomInlineHTML.__isMiddleware = true;

	exports.default = function (rawBlock) {
	  var customInlineHTML = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultCustomInlineHTML;

	  (0, _invariant2.default)(rawBlock !== null && rawBlock !== undefined, 'Expected raw block to be non-null');

	  var inlineHTML = void 0;
	  if (customInlineHTML.__isMiddleware === true) {
	    inlineHTML = customInlineHTML(_defaultInlineHTML2.default);
	  } else {
	    inlineHTML = (0, _accumulateFunction2.default)((0, _styleObjectFunction2.default)(customInlineHTML), (0, _styleObjectFunction2.default)(_defaultInlineHTML2.default));
	  }

	  var result = '';
	  var styleStack = [];

	  var sortedRanges = rawBlock.inlineStyleRanges.sort(_rangeSort2.default);

	  var originalTextArray = [].concat(_toConsumableArray(rawBlock.text));

	  for (var i = 0; i < originalTextArray.length; i++) {
	    var styles = characterStyles(i, sortedRanges);

	    var endingStyles = subtractStyles(styleStack, styles);
	    var newStyles = subtractStyles(styles, styleStack);
	    var remainingStyles = subtractStyles(styleStack, endingStyles);

	    // reset styles: look for any already existing styles that will need to
	    // end before styles that are being added on this character. to solve this
	    // close out those current tags and all nested children,
	    // then open new ones nested within the new styles.
	    var resetStyles = getStylesToReset(remainingStyles, newStyles);

	    var openingStyles = resetStyles.concat(newStyles).sort(latestStyleLast);

	    var openingStyleTags = openingStyles.reduce(appendStartMarkup.bind(null, inlineHTML), '');
	    var endingStyleTags = endingStyles.concat(resetStyles).reduce(prependEndMarkup.bind(null, inlineHTML), '');

	    result += endingStyleTags + openingStyleTags + originalTextArray[i];

	    styleStack = popEndingStyles(styleStack, resetStyles.concat(endingStyles));
	    styleStack = styleStack.concat(openingStyles);

	    (0, _invariant2.default)(styleStack.length === styles.length, 'Character ' + i + ': ' + (styleStack.length - styles.length) + ' styles left on stack that should no longer be there');
	  }

	  result = styleStack.reduceRight(function (res, openStyle) {
	    return res + (0, _getElementHTML2.default)(inlineHTML(openStyle.style)).end;
	  }, result);

	  return result;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Copyright (c) 2013-present, Facebook, Inc.
	                                                                                                                                                                                                                                                                               * All rights reserved.
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * Copyright (c) 2013-present, Facebook, Inc.
	                                                                                                                                                                                                                                                                               * All rights reserved.
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * This source code is licensed under the BSD-style license found in the
	                                                                                                                                                                                                                                                                               * LICENSE file in the /src directory of this source tree. An additional grant
	                                                                                                                                                                                                                                                                               * of patent rights can be found in the PATENTS file in the same directory.
	                                                                                                                                                                                                                                                                               */

	var _immutable = __webpack_require__(23);

	var _draftJs = __webpack_require__(10);

	var _parseHTML = __webpack_require__(8);

	var _parseHTML2 = _interopRequireDefault(_parseHTML);

	var _rangeSort = __webpack_require__(3);

	var _rangeSort2 = _interopRequireDefault(_rangeSort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NBSP = '&nbsp;';
	var SPACE = ' ';

	// Arbitrary max indent
	var MAX_DEPTH = 4;

	// used for replacing characters in HTML
	/* eslint-disable no-control-regex */
	var REGEX_CR = new RegExp('\r', 'g');
	var REGEX_LF = new RegExp('\n', 'g');
	var REGEX_NBSP = new RegExp(NBSP, 'g');
	var REGEX_BLOCK_DELIMITER = new RegExp('\r', 'g');
	/* eslint-enable no-control-regex */

	// Block tag flow is different because LIs do not have
	// a deterministic style ;_;
	var blockTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'pre'];
	var inlineTags = {
	  b: 'BOLD',
	  code: 'CODE',
	  del: 'STRIKETHROUGH',
	  em: 'ITALIC',
	  i: 'ITALIC',
	  s: 'STRIKETHROUGH',
	  strike: 'STRIKETHROUGH',
	  strong: 'BOLD',
	  u: 'UNDERLINE'
	};

	var handleMiddleware = function handleMiddleware(maybeMiddleware, base) {
	  if (maybeMiddleware && maybeMiddleware.__isMiddleware === true) {
	    return maybeMiddleware(base);
	  }

	  return maybeMiddleware;
	};

	var defaultHTMLToBlock = function defaultHTMLToBlock(nodeName, node, lastList) {
	  return undefined;
	};

	var defaultHTMLToStyle = function defaultHTMLToStyle(nodeName, node, currentStyle) {
	  return currentStyle;
	};

	var defaultHTMLToEntity = function defaultHTMLToEntity(nodeName, node) {
	  return undefined;
	};

	var defaultTextToEntity = function defaultTextToEntity(text) {
	  return [];
	};

	var nullthrows = function nullthrows(x) {
	  if (x != null) {
	    return x;
	  }
	  throw new Error('Got unexpected null or undefined');
	};

	var sanitizeDraftText = function sanitizeDraftText(input) {
	  return input.replace(REGEX_BLOCK_DELIMITER, '');
	};

	function getEmptyChunk() {
	  return {
	    text: '',
	    inlines: [],
	    entities: [],
	    blocks: []
	  };
	}

	function getWhitespaceChunk(inEntity) {
	  var entities = new Array(1);
	  if (inEntity) {
	    entities[0] = inEntity;
	  }
	  return {
	    text: SPACE,
	    inlines: [(0, _immutable.OrderedSet)()],
	    entities: entities,
	    blocks: []
	  };
	}

	function getSoftNewlineChunk(block, depth) {
	  var flat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (0, _immutable.Map)();

	  if (flat === true) {
	    return {
	      text: '\r',
	      inlines: [(0, _immutable.OrderedSet)()],
	      entities: new Array(1),
	      blocks: [{
	        type: block,
	        data: data,
	        depth: Math.max(0, Math.min(MAX_DEPTH, depth))
	      }],
	      isNewline: true
	    };
	  }

	  return {
	    text: '\n',
	    inlines: [(0, _immutable.OrderedSet)()],
	    entities: new Array(1),
	    blocks: []
	  };
	}

	function getBlockDividerChunk(block, depth) {
	  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _immutable.Map)();

	  return {
	    text: '\r',
	    inlines: [(0, _immutable.OrderedSet)()],
	    entities: new Array(1),
	    blocks: [{
	      type: block,
	      data: data,
	      depth: Math.max(0, Math.min(MAX_DEPTH, depth))
	    }]
	  };
	}

	function getBlockTypeForTag(tag, lastList) {
	  switch (tag) {
	    case 'h1':
	      return 'header-one';
	    case 'h2':
	      return 'header-two';
	    case 'h3':
	      return 'header-three';
	    case 'h4':
	      return 'header-four';
	    case 'h5':
	      return 'header-five';
	    case 'h6':
	      return 'header-six';
	    case 'li':
	      if (lastList === 'ol') {
	        return 'ordered-list-item';
	      }
	      return 'unordered-list-item';
	    case 'blockquote':
	      return 'blockquote';
	    case 'pre':
	      return 'code-block';
	    case 'div':
	    case 'p':
	      return 'unstyled';
	    default:
	      return null;
	  }
	}

	function baseCheckBlockType(nodeName, node, lastList) {
	  return getBlockTypeForTag(nodeName, lastList);
	}

	function processInlineTag(tag, node, currentStyle) {
	  var styleToCheck = inlineTags[tag];
	  if (styleToCheck) {
	    currentStyle = currentStyle.add(styleToCheck).toOrderedSet();
	  } else if (node instanceof HTMLElement) {
	    (function () {
	      var htmlElement = node;
	      currentStyle = currentStyle.withMutations(function (style) {
	        if (htmlElement.style.fontWeight === 'bold') {
	          style.add('BOLD');
	        }

	        if (htmlElement.style.fontStyle === 'italic') {
	          style.add('ITALIC');
	        }

	        if (htmlElement.style.textDecoration === 'underline') {
	          style.add('UNDERLINE');
	        }

	        if (htmlElement.style.textDecoration === 'line-through') {
	          style.add('STRIKETHROUGH');
	        }
	      }).toOrderedSet();
	    })();
	  }
	  return currentStyle;
	}

	function baseProcessInlineTag(tag, node) {
	  return processInlineTag(tag, node, (0, _immutable.OrderedSet)());
	}

	function joinChunks(A, B) {
	  var flat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  // Sometimes two blocks will touch in the DOM and we need to strip the
	  // extra delimiter to preserve niceness.
	  var firstInB = B.text.slice(0, 1);
	  var lastInA = A.text.slice(-1);

	  var adjacentDividers = lastInA === '\r' && firstInB === '\r';
	  var isJoiningBlocks = A.text !== '\r' && B.text !== '\r'; // when joining two full blocks like this we want to pop one divider
	  var addingNewlineToEmptyBlock = A.text === '\r' && !A.isNewline && B.isNewline; // when joining a newline to an empty block we want to remove the newline

	  if (adjacentDividers && (isJoiningBlocks || addingNewlineToEmptyBlock)) {
	    A.text = A.text.slice(0, -1);
	    A.inlines.pop();
	    A.entities.pop();
	    A.blocks.pop();
	  }

	  // Kill whitespace after blocks if flat mode is on
	  if (A.text.slice(-1) === '\r' && flat === true) {
	    if (B.text === SPACE || B.text === '\n') {
	      return A;
	    } else if (firstInB === SPACE || firstInB === '\n') {
	      B.text = B.text.slice(1);
	      B.inlines.shift();
	      B.entities.shift();
	    }
	  }

	  var isNewline = A.text.length === 0 && B.isNewline;

	  return {
	    text: A.text + B.text,
	    inlines: A.inlines.concat(B.inlines),
	    entities: A.entities.concat(B.entities),
	    blocks: A.blocks.concat(B.blocks),
	    isNewline: isNewline
	  };
	}

	/*
	 * Check to see if we have anything like <p> <blockquote> <h1>... to create
	 * block tags from. If we do, we can use those and ignore <div> tags. If we
	 * don't, we can treat <div> tags as meaningful (unstyled) blocks.
	 */
	function containsSemanticBlockMarkup(html) {
	  return blockTags.some(function (tag) {
	    return html.indexOf('<' + tag) !== -1;
	  });
	}

	function genFragment(node, inlineStyle, lastList, inBlock, fragmentBlockTags, depth, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, options, inEntity) {
	  var nodeName = node.nodeName.toLowerCase();
	  var newBlock = false;
	  var nextBlockType = 'unstyled';

	  // Base Case
	  if (nodeName === '#text') {
	    var _ret2 = function () {
	      var text = node.textContent;
	      if (text.trim() === '' && inBlock === null) {
	        return {
	          v: getEmptyChunk()
	        };
	      }

	      if (text.trim() === '' && inBlock !== 'code-block') {
	        return {
	          v: getWhitespaceChunk(inEntity)
	        };
	      }
	      if (inBlock !== 'code-block') {
	        // Can't use empty string because MSWord
	        text = text.replace(REGEX_LF, SPACE);
	      }

	      var entities = Array(text.length).fill(inEntity);

	      var offsetChange = 0;
	      var textEntities = checkEntityText(text).sort(_rangeSort2.default);
	      textEntities.forEach(function (_ref) {
	        var entity = _ref.entity,
	            offset = _ref.offset,
	            length = _ref.length,
	            result = _ref.result;

	        var adjustedOffset = offset + offsetChange;

	        if (result === null || result === undefined) {
	          result = text.substr(adjustedOffset, length);
	        }

	        var textArray = text.split('');
	        textArray.splice.bind(textArray, adjustedOffset, length).apply(textArray, result.split(''));
	        text = textArray.join('');

	        entities.splice.bind(entities, adjustedOffset, length).apply(entities, Array(result.length).fill(entity));
	        offsetChange += result.length - length;
	      });

	      return {
	        v: {
	          text: text,
	          inlines: Array(text.length).fill(inlineStyle),
	          entities: entities,
	          blocks: []
	        }
	      };
	    }();

	    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	  }

	  // BR tags
	  if (nodeName === 'br') {
	    var _blockType = inBlock;

	    if (_blockType === null) {
	      //  BR tag is at top level, treat it as an unstyled block
	      return getSoftNewlineChunk('unstyled', depth, true);
	    }

	    return getSoftNewlineChunk(_blockType || 'unstyled', depth, options.flat);
	  }

	  var chunk = getEmptyChunk();
	  var newChunk = null;

	  // Inline tags
	  inlineStyle = processInlineTag(nodeName, node, inlineStyle);
	  inlineStyle = processCustomInlineStyles(nodeName, node, inlineStyle);

	  // Handle lists
	  if (nodeName === 'ul' || nodeName === 'ol') {
	    if (lastList) {
	      depth += 1;
	    }
	    lastList = nodeName;
	    inBlock = null;
	  }

	  // Block Tags
	  var blockInfo = checkBlockType(nodeName, node, lastList, inBlock);
	  var blockType = void 0;
	  var blockDataMap = void 0;

	  if (blockInfo === false) {
	    return getEmptyChunk();
	  }

	  blockInfo = blockInfo || {};

	  if (typeof blockInfo === 'string') {
	    blockType = blockInfo;
	    blockDataMap = (0, _immutable.Map)();
	  } else {
	    blockType = typeof blockInfo === 'string' ? blockInfo : blockInfo.type;
	    blockDataMap = blockInfo.data ? (0, _immutable.Map)(blockInfo.data) : (0, _immutable.Map)();
	  }
	  if (!inBlock && (fragmentBlockTags.indexOf(nodeName) !== -1 || blockType)) {
	    chunk = getBlockDividerChunk(blockType || getBlockTypeForTag(nodeName, lastList), depth, blockDataMap);
	    inBlock = blockType || getBlockTypeForTag(nodeName, lastList);
	    newBlock = true;
	  } else if (lastList && (inBlock === 'ordered-list-item' || inBlock === 'unordered-list-item') && nodeName === 'li') {
	    var listItemBlockType = getBlockTypeForTag(nodeName, lastList);
	    chunk = getBlockDividerChunk(listItemBlockType, depth);
	    inBlock = listItemBlockType;
	    newBlock = true;
	    nextBlockType = lastList === 'ul' ? 'unordered-list-item' : 'ordered-list-item';
	  } else if (inBlock && inBlock !== 'atomic' && blockType === 'atomic') {
	    inBlock = blockType;
	    newBlock = true;
	    chunk = getSoftNewlineChunk(blockType, depth, true, // atomic blocks within non-atomic blocks must always be split out
	    blockDataMap);
	  }

	  // Recurse through children
	  var child = node.firstChild;

	  // hack to allow conversion of atomic blocks from HTML (e.g. <figure><img
	  // src="..." /></figure>). since metadata must be stored on an entity text
	  // must exist for the entity to apply to. the way chunks are joined strips
	  // whitespace at the end so it cannot be a space character.

	  if (child == null && inEntity && (blockType === 'atomic' || inBlock === 'atomic')) {
	    child = document.createTextNode('a');
	  }

	  if (child != null) {
	    nodeName = child.nodeName.toLowerCase();
	  }

	  var entityId = null;

	  while (child) {
	    entityId = checkEntityNode(nodeName, child);

	    newChunk = genFragment(child, inlineStyle, lastList, inBlock, fragmentBlockTags, depth, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, options, entityId || inEntity);

	    chunk = joinChunks(chunk, newChunk, options.flat);
	    var sibling = child.nextSibling;

	    // Put in a newline to break up blocks inside blocks
	    if (sibling && fragmentBlockTags.indexOf(nodeName) >= 0 && inBlock) {
	      var newBlockInfo = checkBlockType(nodeName, child, lastList, inBlock);

	      var newBlockType = void 0;
	      var newBlockData = void 0;

	      if (newBlockInfo !== false) {
	        newBlockInfo = newBlockInfo || {};

	        if (typeof newBlockInfo === 'string') {
	          newBlockType = newBlockInfo;
	          newBlockData = (0, _immutable.Map)();
	        } else {
	          newBlockType = newBlockInfo.type || getBlockTypeForTag(nodeName, lastList);
	          newBlockData = newBlockInfo.data ? (0, _immutable.Map)(newBlockInfo.data) : (0, _immutable.Map)();
	        }

	        chunk = joinChunks(chunk, getSoftNewlineChunk(newBlockType, depth, options.flat, newBlockData), options.flat);
	      }
	    }
	    if (sibling) {
	      nodeName = sibling.nodeName.toLowerCase();
	    }
	    child = sibling;
	  }

	  if (newBlock) {
	    chunk = joinChunks(chunk, getBlockDividerChunk(nextBlockType, depth, (0, _immutable.Map)()), options.flat);
	  }

	  return chunk;
	}

	function getChunkForHTML(html, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, options, DOMBuilder) {
	  html = html.trim().replace(REGEX_CR, '').replace(REGEX_NBSP, SPACE);

	  var safeBody = DOMBuilder(html);
	  if (!safeBody) {
	    return null;
	  }

	  // Sometimes we aren't dealing with content that contains nice semantic
	  // tags. In this case, use divs to separate everything out into paragraphs
	  // and hope for the best.
	  var workingBlocks = containsSemanticBlockMarkup(html) ? blockTags.concat(['div']) : ['div'];

	  // Start with -1 block depth to offset the fact that we are passing in a fake
	  // UL block to sta rt with.
	  var chunk = genFragment(safeBody, (0, _immutable.OrderedSet)(), 'ul', null, workingBlocks, -1, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, options);

	  // join with previous block to prevent weirdness on paste
	  if (chunk.text.indexOf('\r') === 0) {
	    chunk = {
	      text: chunk.text.slice(1),
	      inlines: chunk.inlines.slice(1),
	      entities: chunk.entities.slice(1),
	      blocks: chunk.blocks
	    };
	  }

	  // Kill block delimiter at the end
	  if (chunk.text.slice(-1) === '\r') {
	    chunk.text = chunk.text.slice(0, -1);
	    chunk.inlines = chunk.inlines.slice(0, -1);
	    chunk.entities = chunk.entities.slice(0, -1);
	    chunk.blocks.pop();
	  }

	  // If we saw no block tags, put an unstyled one in
	  if (chunk.blocks.length === 0) {
	    chunk.blocks.push({ type: 'unstyled', data: (0, _immutable.Map)(), depth: 0 });
	  }

	  // Sometimes we start with text that isn't in a block, which is then
	  // followed by blocks. Need to fix up the blocks to add in
	  // an unstyled block for this content
	  if (chunk.text.split('\r').length === chunk.blocks.length + 1) {
	    chunk.blocks.unshift({ type: 'unstyled', data: (0, _immutable.Map)(), depth: 0 });
	  }

	  return chunk;
	}

	function convertFromHTMLtoContentBlocks(html, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, options, DOMBuilder) {
	  // Be ABSOLUTELY SURE that the dom builder you pass hare won't execute
	  // arbitrary code in whatever environment you're running this in. For an
	  // example of how we try to do this in-browser, see getSafeBodyFromHTML.

	  var chunk = getChunkForHTML(html, processCustomInlineStyles, checkEntityNode, checkEntityText, checkBlockType, options, DOMBuilder);
	  if (chunk == null) {
	    return [];
	  }
	  var start = 0;
	  return chunk.text.split('\r').map(function (textBlock, blockIndex) {
	    // Make absolutely certain that our text is acceptable.
	    textBlock = sanitizeDraftText(textBlock);
	    var end = start + textBlock.length;
	    var inlines = nullthrows(chunk).inlines.slice(start, end);
	    var entities = nullthrows(chunk).entities.slice(start, end);
	    var characterList = (0, _immutable.List)(inlines.map(function (style, entityIndex) {
	      var data = { style: style, entity: null };
	      if (entities[entityIndex]) {
	        data.entity = entities[entityIndex];
	      }
	      return _draftJs.CharacterMetadata.create(data);
	    }));
	    start = end + 1;

	    return new _draftJs.ContentBlock({
	      key: (0, _draftJs.genKey)(),
	      type: nullthrows(chunk).blocks[blockIndex].type,
	      data: nullthrows(chunk).blocks[blockIndex].data,
	      depth: nullthrows(chunk).blocks[blockIndex].depth,
	      text: textBlock,
	      characterList: characterList
	    });
	  });
	}

	var convertFromHTML = function convertFromHTML(_ref2) {
	  var _ref2$htmlToStyle = _ref2.htmlToStyle,
	      htmlToStyle = _ref2$htmlToStyle === undefined ? defaultHTMLToStyle : _ref2$htmlToStyle,
	      _ref2$htmlToEntity = _ref2.htmlToEntity,
	      htmlToEntity = _ref2$htmlToEntity === undefined ? defaultHTMLToEntity : _ref2$htmlToEntity,
	      _ref2$textToEntity = _ref2.textToEntity,
	      textToEntity = _ref2$textToEntity === undefined ? defaultTextToEntity : _ref2$textToEntity,
	      _ref2$htmlToBlock = _ref2.htmlToBlock,
	      htmlToBlock = _ref2$htmlToBlock === undefined ? defaultHTMLToBlock : _ref2$htmlToBlock;
	  return function (html) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	      flat: false
	    };
	    var DOMBuilder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _parseHTML2.default;

	    return _draftJs.ContentState.createFromBlockArray(convertFromHTMLtoContentBlocks(html, handleMiddleware(htmlToStyle, baseProcessInlineTag), handleMiddleware(htmlToEntity, defaultHTMLToEntity), handleMiddleware(textToEntity, defaultTextToEntity), handleMiddleware(htmlToBlock, baseCheckBlockType), options, DOMBuilder));
	  };
	};

	exports.default = function () {
	  if (arguments.length >= 1 && typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
	    return convertFromHTML({}).apply(undefined, arguments);
	  }
	  return convertFromHTML.apply(undefined, arguments);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _server2 = _interopRequireDefault(_server);

	var _draftJs = __webpack_require__(10);

	var _encodeBlock = __webpack_require__(17);

	var _encodeBlock2 = _interopRequireDefault(_encodeBlock);

	var _blockEntities = __webpack_require__(11);

	var _blockEntities2 = _interopRequireDefault(_blockEntities);

	var _blockInlineStyles = __webpack_require__(12);

	var _blockInlineStyles2 = _interopRequireDefault(_blockInlineStyles);

	var _accumulateFunction = __webpack_require__(6);

	var _accumulateFunction2 = _interopRequireDefault(_accumulateFunction);

	var _blockTypeObjectFunction = __webpack_require__(18);

	var _blockTypeObjectFunction2 = _interopRequireDefault(_blockTypeObjectFunction);

	var _getBlockTags = __webpack_require__(19);

	var _getBlockTags2 = _interopRequireDefault(_getBlockTags);

	var _getNestedBlockTags = __webpack_require__(21);

	var _getNestedBlockTags2 = _interopRequireDefault(_getNestedBlockTags);

	var _defaultBlockHTML = __webpack_require__(15);

	var _defaultBlockHTML2 = _interopRequireDefault(_defaultBlockHTML);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import Immutable from 'immutable'; // eslint-disable-line no-unused-vars
	var NESTED_BLOCK_TYPES = ['ordered-list-item', 'unordered-list-item'];

	var defaultEntityToHTML = function defaultEntityToHTML(entity, originalText) {
	  return originalText;
	};

	var convertToHTML = function convertToHTML(_ref) {
	  var _ref$styleToHTML = _ref.styleToHTML,
	      styleToHTML = _ref$styleToHTML === undefined ? {} : _ref$styleToHTML,
	      _ref$blockToHTML = _ref.blockToHTML,
	      blockToHTML = _ref$blockToHTML === undefined ? {} : _ref$blockToHTML,
	      _ref$entityToHTML = _ref.entityToHTML,
	      entityToHTML = _ref$entityToHTML === undefined ? defaultEntityToHTML : _ref$entityToHTML;
	  return function (contentState) {
	    (0, _invariant2.default)(contentState !== null && contentState !== undefined, 'Expected contentState to be non-null');

	    var getBlockHTML = void 0;
	    if (blockToHTML.__isMiddleware === true) {
	      getBlockHTML = blockToHTML((0, _blockTypeObjectFunction2.default)(_defaultBlockHTML2.default));
	    } else {
	      getBlockHTML = (0, _accumulateFunction2.default)((0, _blockTypeObjectFunction2.default)(blockToHTML), (0, _blockTypeObjectFunction2.default)(_defaultBlockHTML2.default));
	    }

	    var rawState = (0, _draftJs.convertToRaw)(contentState);

	    var listStack = [];

	    var result = rawState.blocks.map(function (block) {
	      var type = block.type,
	          depth = block.depth;


	      var closeNestTags = '';
	      var openNestTags = '';

	      if (NESTED_BLOCK_TYPES.indexOf(type) === -1) {
	        // this block can't be nested, so reset all nesting if necessary
	        closeNestTags = listStack.reduceRight(function (string, nestedBlock) {
	          return string + (0, _getNestedBlockTags2.default)(getBlockHTML(nestedBlock)).nestEnd;
	        }, '');
	        listStack = [];
	      } else {
	        while (depth + 1 !== listStack.length || type !== listStack[depth].type) {
	          if (depth + 1 === listStack.length) {
	            // depth is right but doesn't match type
	            var blockToClose = listStack[depth];
	            closeNestTags += (0, _getNestedBlockTags2.default)(getBlockHTML(blockToClose)).nestEnd;
	            openNestTags += (0, _getNestedBlockTags2.default)(getBlockHTML(block)).nestStart;
	            listStack[depth] = block;
	          } else if (depth + 1 < listStack.length) {
	            var _blockToClose = listStack[listStack.length - 1];
	            closeNestTags += (0, _getNestedBlockTags2.default)(getBlockHTML(_blockToClose)).nestEnd;
	            listStack = listStack.slice(0, -1);
	          } else {
	            openNestTags += (0, _getNestedBlockTags2.default)(getBlockHTML(block)).nestStart;
	            listStack.push(block);
	          }
	        }
	      }

	      var innerHTML = (0, _blockInlineStyles2.default)((0, _blockEntities2.default)((0, _encodeBlock2.default)(block), rawState.entityMap, entityToHTML), styleToHTML);

	      var blockHTML = (0, _getBlockTags2.default)(getBlockHTML(block));

	      var html = void 0;

	      if (typeof blockHTML === 'string') {
	        html = blockHTML;
	      } else {
	        html = blockHTML.start + innerHTML + blockHTML.end;
	      }

	      if (innerHTML.length === 0 && Object.prototype.hasOwnProperty.call(blockHTML, 'empty')) {
	        if (_react2.default.isValidElement(blockHTML.empty)) {
	          html = _server2.default.renderToStaticMarkup(blockHTML.empty);
	        } else {
	          html = blockHTML.empty;
	        }
	      }

	      return closeNestTags + openNestTags + html;
	    }).join('');

	    result = listStack.reduce(function (res, nestBlock) {
	      return res + (0, _getNestedBlockTags2.default)(getBlockHTML(nestBlock)).nestEnd;
	    }, result);

	    return result;
	  };
	};

	exports.default = function () {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (args.length === 1 && Object.prototype.hasOwnProperty.call(args[0], '_map') && args[0].getBlockMap != null) {
	    // skip higher-order function and use defaults
	    return convertToHTML({}).apply(undefined, args);
	  }

	  return convertToHTML.apply(undefined, args);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  'unstyled': _react2.default.createElement('p', null),
	  'paragraph': _react2.default.createElement('p', null),
	  'header-one': _react2.default.createElement('h1', null),
	  'header-two': _react2.default.createElement('h2', null),
	  'header-three': _react2.default.createElement('h3', null),
	  'header-four': _react2.default.createElement('h4', null),
	  'header-five': _react2.default.createElement('h5', null),
	  'header-six': _react2.default.createElement('h6', null),
	  'blockquote': _react2.default.createElement('blockquote', null),
	  'unordered-list-item': {
	    element: _react2.default.createElement('li', null),
	    nest: _react2.default.createElement('ul', null)
	  },
	  'ordered-list-item': {
	    element: _react2.default.createElement('li', null),
	    nest: _react2.default.createElement('ol', null)
	  },
	  'media': _react2.default.createElement('figure', null)
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = defaultInlineHTML;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function defaultInlineHTML(style) {
	  switch (style) {
	    case 'BOLD':
	      return _react2.default.createElement('strong', null);
	    case 'ITALIC':
	      return _react2.default.createElement('em', null);
	    case 'UNDERLINE':
	      return _react2.default.createElement('u', null);
	    case 'CODE':
	      return _react2.default.createElement('code', null);
	    default:
	      return {
	        start: '',
	        end: ''
	      };
	  }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _updateMutation = __webpack_require__(9);

	var _updateMutation2 = _interopRequireDefault(_updateMutation);

	var _rangeSort = __webpack_require__(3);

	var _rangeSort2 = _interopRequireDefault(_rangeSort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var ENTITY_MAP = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '\n': '<br/>'
	};

	exports.default = function (block) {
	  var blockText = [].concat(_toConsumableArray(block.text));

	  var entities = block.entityRanges.sort(_rangeSort2.default);
	  var styles = block.inlineStyleRanges.sort(_rangeSort2.default);
	  var resultText = '';

	  var _loop = function _loop(index) {
	    var char = blockText[index];

	    if (ENTITY_MAP[char] !== undefined) {
	      (function () {
	        var encoded = ENTITY_MAP[char];
	        var resultIndex = resultText.length;
	        resultText += encoded;

	        var updateForChar = function updateForChar(mutation) {
	          return (0, _updateMutation2.default)(mutation, resultIndex, char.length, encoded.length, 0, 0);
	        };

	        entities = entities.map(updateForChar);
	        styles = styles.map(updateForChar);
	      })();
	    } else {
	      resultText += char;
	    }
	  };

	  for (var index = 0; index < blockText.length; index++) {
	    _loop(index);
	  }

	  return Object.assign({}, block, {
	    text: resultText,
	    inlineStyleRanges: styles,
	    entityRanges: entities
	  });
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (typeObject) {
	  return function (block) {
	    if (typeof typeObject === 'function') {
	      // handle case where typeObject is already a function
	      return typeObject(block);
	    }

	    return typeObject[block.type];
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getBlockTags;

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _server2 = _interopRequireDefault(_server);

	var _splitReactElement = __webpack_require__(4);

	var _splitReactElement2 = _interopRequireDefault(_splitReactElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function hasChildren(element) {
	  return _react2.default.isValidElement(element) && _react2.default.Children.count(element.props.children) > 0;
	}

	function getBlockTags(blockHTML) {
	  (0, _invariant2.default)(blockHTML !== null && blockHTML !== undefined, 'Expected block HTML value to be non-null');

	  if (typeof blockHTML === 'string') {
	    return blockHTML;
	  }

	  if (_react2.default.isValidElement(blockHTML)) {
	    if (hasChildren(blockHTML)) {
	      return _server2.default.renderToStaticMarkup(blockHTML);
	    }

	    return (0, _splitReactElement2.default)(blockHTML);
	  }

	  if (Object.prototype.hasOwnProperty.call(blockHTML, 'element') && _react2.default.isValidElement(blockHTML.element)) {
	    return Object.assign({}, blockHTML, (0, _splitReactElement2.default)(blockHTML.element));
	  }

	  (0, _invariant2.default)(Object.prototype.hasOwnProperty.call(blockHTML, 'start') && Object.prototype.hasOwnProperty.call(blockHTML, 'end'), 'convertToHTML: received block information without either a ReactElement or an object with start/end tags');

	  return blockHTML;
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _splitReactElement = __webpack_require__(4);

	var _splitReactElement2 = _interopRequireDefault(_splitReactElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getElementTagLength = function getElementTagLength(element) {
	  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'start';

	  if (_react2.default.isValidElement(element)) {
	    var length = (0, _splitReactElement2.default)(element)[type].length;

	    var child = _react2.default.Children.toArray(element.props.children)[0];
	    return length + (child && _react2.default.isValidElement(child) ? getElementTagLength(child, type) : 0);
	  }

	  if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object') {
	    return element[type] ? element[type].length : 0;
	  }

	  return 0;
	};

	exports.default = getElementTagLength;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getNestedBlockTags;

	var _invariant = __webpack_require__(2);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _splitReactElement2 = __webpack_require__(4);

	var _splitReactElement3 = _interopRequireDefault(_splitReactElement2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getNestedBlockTags(blockHTML) {
	  (0, _invariant2.default)(blockHTML !== null && blockHTML !== undefined, 'Expected block HTML value to be non-null');

	  if (_react2.default.isValidElement(blockHTML.nest)) {
	    var _splitReactElement = (0, _splitReactElement3.default)(blockHTML.nest),
	        start = _splitReactElement.start,
	        end = _splitReactElement.end;

	    return Object.assign({}, blockHTML, {
	      nestStart: start,
	      nestEnd: end
	    });
	  }

	  (0, _invariant2.default)(Object.prototype.hasOwnProperty.call(blockHTML, 'nestStart') && Object.prototype.hasOwnProperty.call(blockHTML, 'nestEnd'), 'convertToHTML: received block information without either a ReactElement or an object with start/end tags');

	  return blockHTML;
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (object) {
	  return function (style) {
	    if (typeof object === 'function') {
	      return object(style);
	    }

	    return object[style];
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ }
/******/ ])
});
;