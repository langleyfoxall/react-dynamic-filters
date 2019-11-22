import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DynamicFilters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: [],
        };

        this.addFilter = this.addFilter.bind(this);
    }

    componentDidMount() {

    }

    addFilter() {
        const { fields } = this.props;
        let { filters } = this.state;

        const field = fields[0];

        filters.push({
            id: this.nextFilterId(),
            field: field,
            operator: this.getDefaultOperatorForField(field),
            value: this.getDefaultValueForField(field),
            type: this.getTypeOfField(field),
        });

        this.setState({ filters });
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

        this.setState({ filters });
    }

    removeFilter(filterId, updatedData) {
        let { filters } = this.state;

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            if (filter.id === filterId) {
                filters.splice(i, 1);
                break;
            }
        }

        this.setState({ filters });
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
        return operators[field] ? operators[field] : ['='];
    }

    getValuesForField(field) {
        const { values } = this.props;
        return values[field] ? values[field] : {};
    }

    getTypeOfField(field) {
        const { types } = this.props;
        return types[field] ? types[field] : 'text';
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
            <div className={"dynamic-filters-container table-responsive"}>
                <table className={"table"}>
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
            <tr>
                <td colSpan={3}>
                    { (!filters.length ? 'No ' : filters.length) + ' ' + (filters.length === 1 ? 'filter' : 'filters') + ' applied' }
                </td>
                <td className={"text-right"}>
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
            <tr key={filter.id}>
                <td>
                    { this.renderFieldsDropdown(filter) }
                </td>
                <td>
                    { this.renderOperatorsDropdown(filter) }
                </td>
                <td>
                    { this.renderValueInput(filter) }
                </td>
                <td className={"text-right"}>
                    <div
                        className={"btn btn-secondary btn-remove-filter"}
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
                className={"form-control"}
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
                { fields.map((field) => {
                    return (
                        <option
                            key={field}
                            value={field}
                        >
                            { field }
                        </option>
                    )
                })}
            </select>
        );
    }

    renderOperatorsDropdown(filter) {
        return (
            <select
                value={filter.operator}
                className={"form-control"}
                onChange={(e) => {
                    this.updateFilter(filter.id, {operator: e.target.value})
                }}
            >
                { this.getOperatorsForField(filter.field).map((operator) => {
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
        switch (filter.type) {
            case 'text':
                return (
                    <input
                        value={filter.value}
                        className={"form-control"}
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
                        className={"form-control"}
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
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    operators: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    values: PropTypes.objectOf(PropTypes.PropTypes.objectOf(PropTypes.string)),
    types: PropTypes.objectOf(PropTypes.PropTypes.string),
    onChange: PropTypes.func,
};

DynamicFilters.defaultProps = {
    operators: {},
    values: {},
    types: {},
    onChange: () => {},
};

export default DynamicFilters;
