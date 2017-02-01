'use strict';

var _antd = antd;
var Tabs = _antd.Tabs;
var TabPane = _antd.Tabs.TabPane;
var Icon = _antd.Icon;
var Table = _antd.Table;
var div = 'div';
var DatePicker = _antd.DatePicker;
var name;
var Form = _antd.Form;
var Input = _antd.Input;
var Button = _antd.Button;
var Checkbox = _antd.Checkbox
var FormItem = _antd.Form.Item;
var hello= 'HELLO';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}


/*class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        //this.props = Form.props;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        if (this.state.value === hello) {
            this.setState({value : ''});
            event.preventDefault();
            alert(this.state.value);
    }else{
            this.setState({value : ''});
            event.preventDefault();
        }
    }

    render() {
        //var getFieldDecorator = this.props.form;
        return (
            /!*React.createElement('form', {onSubmit : this.handleSubmit}, React.createElement(
                'label','Name:',React.createElement(
                    'input',{type: 'text', value: this.state.value, placeholder: 'Input',onChange: this.handleChange})),
                React.createElement('input', {type: 'submit', value: 'Subm'})
                ),*!/
                React.createElement(
                    Form,
                    { onSubmit: this.handleSubmit, className: 'login-form' },
                    React.createElement(
                        FormItem,
                        null,
                        this.props.form.getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }]
                        })(React.createElement(Input, { addonBefore: React.createElement(Icon, { type: 'user' }), placeholder: 'Username' }))
                    ),
                    React.createElement(
                        FormItem,
                        null,
                        getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }]
                        })(React.createElement(Input, { addonBefore: React.createElement(Icon, { type: 'lock' }), type: 'password', placeholder: 'Password' }))
                    ))
            );
    }
}*/

/*var NormalLoginForm = _antd.Form.create()(React.createClass({
    displayName: 'NormalLoginForm',
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(function (err, values) {
            if (!err && values.userName === 'abc' && values.password === '123') {
                //console.log('Received values of form: ', values);
                alert('HELLO');
            }
        });
    },
    render: function render() {
        var getFieldDecorator = this.props.form.getFieldDecorator;

        return React.createElement(
            _antd.Form,
            {onSubmit: this.handleSubmit, className: 'login-form'},
            React.createElement(
                FormItem,
                null,
                getFieldDecorator('userName', {
                    rules: [{required: true, message: 'Please input your username!'}]
                })(React.createElement(_antd.Input, {
                    addonBefore: React.createElement(_antd.Icon, {type: 'user'}),
                    placeholder: 'Username'
                }))
            ),
            React.createElement(
                FormItem,
                null,
                getFieldDecorator('password', {
                    rules: [{required: true, message: 'Please input your Password!'}]
                })(React.createElement(_antd.Input, {
                    addonBefore: React.createElement(_antd.Icon, {type: 'lock'}),
                    type: 'password',
                    placeholder: 'Password'
                }))
            ),
            React.createElement(
                _antd.Button,
                { type: 'primary', htmlType: 'submit', className: 'login-form-button' },
                'Log in'
            )
        );
    }
}));

ReactDOM.render(
    React.createElement(NormalLoginForm, null),
    document.getElementById('root')
);*/


const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => React.createElement('a', {href: '#'}, text)
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) =>
        React.createElement('span', null, React.createElement('a', {href: '#'}, 'Action - ', record.name),
            React.createElement('span', {className: 'ant-divider'}),
            React.createElement('a', {href: '#'}, 'Delete'),
            React.createElement('span', {className: 'ant-divider'}),
            React.createElement('a', {href: '#', className: 'ant-dropdown-link'}, 'More actions ',
                React.createElement(Icon, {type: 'down'})
            ))
}
];



const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
},
    {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    }, {
        key: '5',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    }
    , {
        key: '6',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    }
    , {
        key: '7',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    }
    , {
        key: '8',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    },
    {
        key: '9',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    },
    {
        key: '10',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    },
    {
        key: '11',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    },
    {
        key: '12',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    }];

const pagination = {
    total: 3,
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
        console.log('Current: ', current, '; PageSize: ', pageSize);
    },
    onChange: (current) => {
        console.log('Current: ', current);
    },
};

/*/!*function callback(key) {
 console.log(key);
 }*!/*/

var user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

function onClic() {
    alert("HELLO!!");
}

var NormalLoginForm = _antd.Form.create()(React.createClass({
    displayName: 'NormalLoginForm',
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(function (err, values) {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    },
    render: function render() {
        var getFieldDecorator = this.props.form.getFieldDecorator;

        return React.createElement(
            _antd.Form,
            { onSubmit: this.handleSubmit, className: 'login-form' },
            React.createElement(
                FormItem,
                null,
                getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }]
                })(React.createElement(_antd.Input, { addonBefore: React.createElement(_antd.Icon, { type: 'user' }), placeholder: 'Username' }))
            ),
            React.createElement(
                FormItem,
                null,
                getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }]
                })(React.createElement(_antd.Input, { addonBefore: React.createElement(_antd.Icon, { type: 'lock' }), type: 'password', placeholder: 'Password' }))
            ),
            React.createElement(
                FormItem,
                null,
                getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true
                })(React.createElement(
                    _antd.Checkbox,
                    null,
                    'Remember me'
                )),
                React.createElement(
                    'a',
                    { className: 'login-form-forgot' },
                    'Forgot password'
                ),
                React.createElement(
                    _antd.Button,
                    { type: 'primary', htmlType: 'submit', className: 'login-form-button' },
                    'Log in'
                ),
                'Or ',
                React.createElement(
                    'a',
                    {onClick: onClic},
                    'register now!'
                )
            )
        );
    }
}));

var element = React.createElement(
    div,
    null,
    React.createElement(
        'h1',
        {className: 'greeting'},
        'Hello, ',
        formatName(user),
        '!'
    ),
    React.createElement(
        'form',
        null,
        React.createElement(
            'label',
            {id: 'label'},
            'Name: ',
            React.createElement('input', {type: 'text', name: 'name', value: 'input'})
        ),
        React.createElement('input', {
            id: 'input', type: 'submit', value: 'Submit', onClick: function () {
                alert("Hello!");
            }
        })
    ),
    React.createElement(
        Tabs, {id: 'tab',defaultActiveKey: '1', onChange: '{callback}'},
        React.createElement(
            TabPane, { tab: 'Tab 1', key: '1'},
            React.createElement(
                Table, {dataSource: data, columns: columns}
            )),
        React.createElement(
            TabPane, {tab: 'Tab 2', key: '2'},
            React.createElement(
                Table, {dataSource: data, columns: columns, pagination: {total: 1000, pageSize: 5}, style: {background:'#333'}}
            )
        ),
        React.createElement(
            TabPane, {tab: 'Tab 3', key: '3'},
            React.createElement(
                Table, {id:'tabPane', dataSource: data, columns: columns}
            )
        )),

    React.createElement(DatePicker, null)


);

//ReactDOM.render(React.createElement(NormalLoginForm, null), mountNode);

ReactDOM.render(element, document.getElementById('root'));
ReactDOM.render(React.createElement(NormalLoginForm, null), document.getElementById('label'));




