# React Dynamic Filters

## Installation

To install React Dynamic Filters, add the following to the
`dependencies` section of your `package.json` file.

```
"@langleyfoxall/react-dynamic-filters": "git@github.com:langleyfoxall/react-dynamic-filters.git#v1.0.0"
```

Now simply run the following command from the root of your
project.

```bash
npm install
```

## Usage

See the following usage example.

```jsx
<DynamicFilters
    fields={{
        'name': 'Name',
        'status': 'Status',
        'id': 'ID',
        'email': 'Email address',
        'website': 'Website (URL)',
        'created_at': 'Created date',
        'last_logged_in': 'Last logged in',
        'preferred_contact_time': 'Preferred contact time',
        'approved': 'Product approved',
        'mouse_position': 'Mouse position',
    }}
    operators={{
        'approved': [],
        'mouse_position': ['is', 'is not'],
    }}
    types={{
        'status': 'dropdown',
        'id': 'number',
        'email': 'email',
        'website': 'url',
        'created_at': 'date',
        'last_logged_in': 'datetime',
        'preferred_contact_time': 'time',
        'approved': 'dropdown',
    }}
    values={{
        'status': {
            'open': 'Open',
            'closed': 'Closed',
        },
        'approved': {
            '1': 'Yes',
            '0': 'No',
        }
    }}
    customValueRenderers={{
        'mouse_position': (filter, updateFilter) => {
            return (
                <div
                    style={{ width: '200px', height: '200px', border: '1px solid '+(filter.operator === 'is not' ? '#ff0000' : '#ccc') }}
                    onMouseMove={(e) => {
                        updateFilter(filter.id, {value: e.clientX + ', ' + e.clientY})
                    }}
                >
                    {filter.value}
                </div>
            );
        }
    }}
    onChange={(filters) => {
        console.clear();
        console.log('Filters changed:');
        filters.forEach((filter) => {
            const { field, operator, value } = filter;
            console.log('* '+field + ' ' + operator + ' ' + value);
        });
    }}
/>
```
