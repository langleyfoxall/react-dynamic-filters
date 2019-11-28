import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DynamicFilters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: [],
        };

        this.addFilter = this.addFilter.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    addFilter() {
        const { fields } = this.props;
        let { filters } = this.state;

        const field = Object.keys(fields)[0];

        filters.push({
            id: this.nextFilterId(),
            field: field,
            operator: this.getDefaultOperatorForField(field),
            value: this.getDefaultValueForField(field),
            type: this.getTypeOfField(field),
        });

        this.setState({ filters }, () => {
            this.triggerOnChangeCallback();
        });
    }

    updateFilter(filterId, updatedData) {
        let { filters } = this.state;

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];

            if (filter.id === filterId) {
                filters[i] = Object.assign(filter, updatedData);
                break;
            }
        }

        this.setState({ filters }, () => {
            this.triggerOnChangeCallback();
        });
    }

    removeFilter(filterId) {
        let { filters } = this.state;

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            if (filter.id === filterId) {
                filters.splice(i, 1);
                break;
            }
        }

        this.setState({ filters }, () => {
            this.triggerOnChangeCallback();
        });
    }

    triggerOnChangeCallback() {
        const { onChange } = this.props;
        const { filters } = this.state;

        const data = filters.map((filter) => {
            const { field, operator, value } = filter;
            return { field, operator, value };
        });

        onChange(data);
    }

    getDefaultOperatorForField(field) {
        const fieldOperators = this.getOperatorsForField(field);
        return fieldOperators[0];
    }

    getDefaultValueForField(field) {
        const fieldValues = this.getValuesForField(field);
        const keys = Object.keys(fieldValues);
        return keys.length ? fieldValues[keys[0]] : '';
    }

    getOperatorsForField(field) {
        const { operators } = this.props;

        let defaultOperators = ['contains', 'equals', 'not equals'];

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

    getValuesForField(field) {
        const { values } = this.props;
        return values[field] ? values[field] : {};
    }

    getTypeOfField(field) {
        const { types } = this.props;
        return types[field] ? types[field] : 'text';
    }

    getCustomValueRendererForField(field) {
        const { customValueRenderers } = this.props;
        return customValueRenderers ? customValueRenderers[field] : null;
    }

    nextFilterId() {
        const { filters } = this.state;

        let id = 0;

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            if (filter.id >= id) {
                id = filter.id + 1;
            }
        }

        return id;
    }

    render() {
        const { filters } = this.state;

        return (
            <div className={"rdf-container table-responsive"}>
                <table className={"rdf-table table"}>
                    <tbody>
                        { filters.map((filter) => {
                            return this.renderFilterRow(filter);
                        })}
                        { this.renderAddFilterRow() }
                    </tbody>
                </table>
            </div>
        );
    }

    renderAddFilterRow() {
        const { filters } = this.state;

        return (
            <tr className={"rdf-add-filter-row"}>
                <td colSpan={3} className={"rdf-filters-count-cell"}>
                    { (!filters.length ? 'No ' : filters.length) + ' ' + (filters.length === 1 ? 'filter' : 'filters') + ' applied' }
                </td>
                <td className={"rdf-btn-cell text-right"}>
                    <div
                        className={"btn btn-primary btn-add-filter"}
                        onClick={this.addFilter}
                    >
                        + Filter
                    </div>
                </td>
            </tr>
        );
    }

    renderFilterRow(filter) {
        return (
            <tr key={filter.id} className={"filter-row"}>
                <td className={"rdf-fields-cell"}>
                    { this.renderFieldsDropdown(filter) }
                </td>
                <td className={"rdf-operators-cell"}>
                    { this.renderOperatorsDropdown(filter) }
                </td>
                <td className={"rdf-value-cell"}>
                    { this.renderValueInput(filter) }
                </td>
                <td className={"rdf-btn-cell text-right"}>
                    <div
                        className={"rdf-btn-remove-filter btn btn-secondary"}
                        onClick={() => { this.removeFilter(filter.id) }}
                    >
                        -
                    </div>
                </td>
            </tr>
        );
    }

    renderFieldsDropdown(filter) {
        const { fields } = this.props;

        return (
            <select
                value={filter.field}
                className={"rdf-fields-dropdown form-control"}
                onChange={(e) => {
                    const field = e.target.value;
                    this.updateFilter(filter.id, {
                        field,
                        operator: this.getDefaultOperatorForField(field),
                        value: this.getDefaultValueForField(field),
                        type: this.getTypeOfField(field)
                    })

                }}
            >
                { Object.keys(fields).map((key) => {
                    const value = fields[key];
                    return (
                        <option
                            key={key}
                            value={key}
                        >
                            { value }
                        </option>
                    )
                })}
            </select>
        );
    }

    renderOperatorsDropdown(filter) {
        const operators = this.getOperatorsForField(filter.field);

        if (!operators.length) {
            return null;
        }

        return (
            <select
                value={filter.operator}
                className={"rdf-operators-dropdown form-control"}
                onChange={(e) => {
                    this.updateFilter(filter.id, {operator: e.target.value})
                }}
            >
                { operators.map((operator) => {
                    return (
                        <option
                            key={operator}
                            value={operator}
                        >
                            { operator }
                        </option>
                    )
                })}
            </select>
        );
    }

    renderValueInput(filter) {
        const renderer = this.getCustomValueRendererForField(filter.field);

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
                let inputType = filter.type;

                if (inputType === 'datetime') {
                    inputType = 'datetime-local';
                }

                return (
                    <input
                        type={inputType}
                        value={filter.value}
                        className={"rdf-value-input form-control"}
                        onChange={(e) => {
                            this.updateFilter(filter.id, {value: e.target.value})
                        }}
                    />
                );

            case 'dropdown':
                const values = this.getValuesForField(filter.field);
                return (
                    <select
                        value={filter.value}
                        className={"rdf-value-dropdown form-control"}
                        onChange={(e) => {
                            this.updateFilter(filter.id, {value: e.target.value})
                        }}
                    >
                        { Object.keys(values).map((key) => {
                            const value = values[key];
                            return (
                                <option
                                    key={key}
                                    value={key}
                                >
                                    { value }
                                </option>
                            )
                        })}
                    </select>
                )
        }
    }

}

DynamicFilters.propTypes = {
    fields: PropTypes.objectOf(PropTypes.string).isRequired,
    operators: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    values: PropTypes.objectOf(PropTypes.PropTypes.objectOf(PropTypes.string)),
    types: PropTypes.objectOf(PropTypes.PropTypes.string),
    onChange: PropTypes.func,
    customValueRenders: PropTypes.objectOf(PropTypes.func),
};

DynamicFilters.defaultProps = {
    operators: {},
    values: {},
    types: {},
    customValueRenders: {},
    onChange: () => {},
};

export default DynamicFilters;
