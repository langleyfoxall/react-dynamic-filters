"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DynamicFilters =
/*#__PURE__*/
function (_Component) {
  _inherits(DynamicFilters, _Component);

  function DynamicFilters(props) {
    var _this;

    _classCallCheck(this, DynamicFilters);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DynamicFilters).call(this, props));
    _this.state = {
      filters: []
    };
    _this.addFilter = _this.addFilter.bind(_assertThisInitialized(_this));
    _this.updateFilter = _this.updateFilter.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DynamicFilters, [{
    key: "addFilter",
    value: function addFilter() {
      var _this2 = this;

      var fields = this.props.fields;
      var filters = this.state.filters;
      var field = Object.keys(fields)[0];
      filters.push({
        id: this.nextFilterId(),
        field: field,
        operator: this.getDefaultOperatorForField(field),
        value: this.getDefaultValueForField(field),
        type: this.getTypeOfField(field)
      });
      this.setState({
        filters: filters
      }, function () {
        _this2.triggerOnChangeCallback();
      });
    }
  }, {
    key: "updateFilter",
    value: function updateFilter(filterId, updatedData) {
      var _this3 = this;

      var filters = this.state.filters;

      for (var i = 0; i < filters.length; i++) {
        var filter = filters[i];

        if (filter.id === filterId) {
          filters[i] = Object.assign(filter, updatedData);
          break;
        }
      }

      this.setState({
        filters: filters
      }, function () {
        _this3.triggerOnChangeCallback();
      });
    }
  }, {
    key: "removeFilter",
    value: function removeFilter(filterId) {
      var _this4 = this;

      var filters = this.state.filters;

      for (var i = 0; i < filters.length; i++) {
        var filter = filters[i];

        if (filter.id === filterId) {
          filters.splice(i, 1);
          break;
        }
      }

      this.setState({
        filters: filters
      }, function () {
        _this4.triggerOnChangeCallback();
      });
    }
  }, {
    key: "triggerOnChangeCallback",
    value: function triggerOnChangeCallback() {
      var onChange = this.props.onChange;
      var filters = this.state.filters;
      var data = filters.map(function (filter) {
        var field = filter.field,
            operator = filter.operator,
            value = filter.value;
        return {
          field: field,
          operator: operator,
          value: value
        };
      });
      onChange(data);
    }
  }, {
    key: "getDefaultOperatorForField",
    value: function getDefaultOperatorForField(field) {
      var fieldOperators = this.getOperatorsForField(field);
      return fieldOperators[0];
    }
  }, {
    key: "getDefaultValueForField",
    value: function getDefaultValueForField(field) {
      var fieldValues = this.getValuesForField(field);
      var keys = Object.keys(fieldValues);
      return keys.length ? keys[0] : '';
    }
  }, {
    key: "getOperatorsForField",
    value: function getOperatorsForField(field) {
      var operators = this.props.operators;
      var defaultOperators = ['contains', 'equals', 'not equals'];

      switch (this.getTypeOfField(field)) {
        case 'dropdown':
          defaultOperators = ['equals', 'not equals'];
          break;

        case 'number':
        case 'date':
        case 'datetime':
        case 'time':
          defaultOperators = ['equals', 'not equals', '>=', '<=', '>', '<'];
          break;
      }

      return operators[field] ? operators[field] : defaultOperators;
    }
  }, {
    key: "getValuesForField",
    value: function getValuesForField(field) {
      var values = this.props.values;
      return values[field] ? values[field] : {};
    }
  }, {
    key: "getTypeOfField",
    value: function getTypeOfField(field) {
      var types = this.props.types;
      return types[field] ? types[field] : 'text';
    }
  }, {
    key: "getCustomValueRendererForField",
    value: function getCustomValueRendererForField(field) {
      var customValueRenderers = this.props.customValueRenderers;
      return customValueRenderers && customValueRenderers[field] ? customValueRenderers[field] : null;
    }
  }, {
    key: "nextFilterId",
    value: function nextFilterId() {
      var filters = this.state.filters;
      var id = 0;

      for (var i = 0; i < filters.length; i++) {
        var filter = filters[i];

        if (filter.id >= id) {
          id = filter.id + 1;
        }
      }

      return id;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var filters = this.state.filters;
      return _react["default"].createElement("div", {
        className: "rdf-container table-responsive"
      }, _react["default"].createElement("table", {
        className: "rdf-table table"
      }, _react["default"].createElement("tbody", null, filters.map(function (filter) {
        return _this5.renderFilterRow(filter);
      }), this.renderAddFilterRow())));
    }
  }, {
    key: "renderAddFilterRow",
    value: function renderAddFilterRow() {
      var filters = this.state.filters;
      return _react["default"].createElement("tr", {
        className: "rdf-add-filter-row"
      }, _react["default"].createElement("td", {
        colSpan: 3,
        className: "rdf-filters-count-cell"
      }, (!filters.length ? 'No ' : filters.length) + ' ' + (filters.length === 1 ? 'filter' : 'filters') + ' applied'), _react["default"].createElement("td", {
        className: "rdf-btn-cell text-right"
      }, _react["default"].createElement("div", {
        className: "btn btn-primary btn-add-filter",
        onClick: this.addFilter
      }, "+ Filter")));
    }
  }, {
    key: "renderFilterRow",
    value: function renderFilterRow(filter) {
      var _this6 = this;

      return _react["default"].createElement("tr", {
        key: filter.id,
        className: "filter-row"
      }, _react["default"].createElement("td", {
        className: "rdf-fields-cell"
      }, this.renderFieldsDropdown(filter)), _react["default"].createElement("td", {
        className: "rdf-operators-cell"
      }, this.renderOperatorsDropdown(filter)), _react["default"].createElement("td", {
        className: "rdf-value-cell"
      }, this.renderValueInput(filter)), _react["default"].createElement("td", {
        className: "rdf-btn-cell text-right"
      }, _react["default"].createElement("div", {
        className: "rdf-btn-remove-filter btn btn-secondary",
        onClick: function onClick() {
          _this6.removeFilter(filter.id);
        }
      }, "-")));
    }
  }, {
    key: "renderFieldsDropdown",
    value: function renderFieldsDropdown(filter) {
      var _this7 = this;

      var fields = this.props.fields;
      return _react["default"].createElement("select", {
        value: filter.field,
        className: "rdf-fields-dropdown form-control",
        onChange: function onChange(e) {
          var field = e.target.value;

          _this7.updateFilter(filter.id, {
            field: field,
            operator: _this7.getDefaultOperatorForField(field),
            value: _this7.getDefaultValueForField(field),
            type: _this7.getTypeOfField(field)
          });
        }
      }, Object.keys(fields).map(function (key) {
        var value = fields[key];
        return _react["default"].createElement("option", {
          key: key,
          value: key
        }, value);
      }));
    }
  }, {
    key: "renderOperatorsDropdown",
    value: function renderOperatorsDropdown(filter) {
      var _this8 = this;

      var operators = this.getOperatorsForField(filter.field);

      if (!operators.length) {
        return null;
      }

      return _react["default"].createElement("select", {
        value: filter.operator,
        className: "rdf-operators-dropdown form-control",
        onChange: function onChange(e) {
          _this8.updateFilter(filter.id, {
            operator: e.target.value
          });
        }
      }, operators.map(function (operator) {
        return _react["default"].createElement("option", {
          key: operator,
          value: operator
        }, operator);
      }));
    }
  }, {
    key: "renderValueInput",
    value: function renderValueInput(filter) {
      var _this9 = this;

      var renderer = this.getCustomValueRendererForField(filter.field);

      if (renderer) {
        return renderer(filter, this.updateFilter);
      }

      switch (filter.type) {
        case 'text':
        case 'number':
        case 'email':
        case 'url':
        case 'date':
        case 'datetime':
        case 'time':
          var inputType = filter.type;

          if (inputType === 'datetime') {
            inputType = 'datetime-local';
          }

          return _react["default"].createElement("input", {
            type: inputType,
            value: filter.value,
            className: "rdf-value-input form-control",
            onChange: function onChange(e) {
              _this9.updateFilter(filter.id, {
                value: e.target.value
              });
            }
          });

        case 'dropdown':
          var values = this.getValuesForField(filter.field);
          return _react["default"].createElement("select", {
            value: filter.value,
            className: "rdf-value-dropdown form-control",
            onChange: function onChange(e) {
              _this9.updateFilter(filter.id, {
                value: e.target.value
              });
            }
          }, Object.keys(values).map(function (key) {
            var value = values[key];
            return _react["default"].createElement("option", {
              key: key,
              value: key
            }, value);
          }));
      }
    }
  }]);

  return DynamicFilters;
}(_react.Component);

DynamicFilters.propTypes = {
  fields: _propTypes["default"].objectOf(_propTypes["default"].string).isRequired,
  operators: _propTypes["default"].objectOf(_propTypes["default"].arrayOf(_propTypes["default"].string)),
  values: _propTypes["default"].objectOf(_propTypes["default"].PropTypes.objectOf(_propTypes["default"].string)),
  types: _propTypes["default"].objectOf(_propTypes["default"].PropTypes.string),
  onChange: _propTypes["default"].func,
  customValueRenders: _propTypes["default"].objectOf(_propTypes["default"].func)
};
DynamicFilters.defaultProps = {
  operators: {},
  values: {},
  types: {},
  customValueRenders: {},
  onChange: function onChange() {}
};
var _default = DynamicFilters;
exports["default"] = _default;