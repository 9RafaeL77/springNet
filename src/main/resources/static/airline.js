/**
 * Created by Rafael on 20.02.2017.
 */
var Table = antd.Table;
var Icon = antd.Icon;
var Select = antd.Select;
var Button = antd.Button;
var Popconfirm = antd.Popconfirm;
var Input = antd.Input;
const Option = Select.Option;

class AirlineEditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({value});
    };
    check = () => {
        this.setState({editable: false});
        if (this.props.onChange) {
            this.props.onChange(this.state.value, this.props.id);
        }
    };
    edit = () => {
        this.setState({editable: true});
    };
    render() {
        const {value, editable} = this.state;
        return (<div className="editable-cell">
            {
                editable ?
                    <div className="editable-cell-input-wrapper">
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                        />
                        <Icon
                            type="check"
                            className="editable-cell-icon-check"
                            onClick={this.check}
                        />
                    </div>
                    :
                    <div className="editable-cell-text-wrapper">
                        {value || ' '}
                        <Icon
                            type="edit"
                            className="editable-cell-icon"
                            onClick={this.edit}
                        />
                    </div>
            }
        </div>);
    }
}

class AirlineTable extends React.Component {
    iterable = 0;
    span(product) {
        return {
            key: product.id,
            name: product.name
        };
    }
    rows = [];
    num = null;
    keyArr = new Set();
    onCellChange = (index, text, record) => {
        return (value, id) => {
            this.keyArr.add(record.key);
            var temp = this.props.products.get(record.key);
            if (id === 'name') {
                temp.product.name = value;
            }
            this.props.products.set(record.key, temp);
            this.forceUpdate();
        };
    };
    onDelete = (index, record) => {
        var t = this;
        $.ajax({
            url: '/deleteAirlineById',
            type: 'POST',
            data: {id: record.key},
            dataType: 'text',
            success: function (text) {
                t.props.products.delete(record.key);
                t.forceUpdate();
                console.log(text);
            },
            error: function () {
                alert("Сервер не отвечает. Проверьте работу сервера!");
            }
        });
    };
    handleAdd = () => {
        this.iterable += 1;
        var max;
        for (let key of this.props.products.keys()) {
            max = key;
        }
        var k = (+max + 1);
        const product = {
            id: k,
            name: 'Unknown' + (this.iterable)
        };
        var isNew = true;
        var arr = {product, isNew};
        this.props.products.set(product.id, arr);
        this.forceUpdate();
    };
    onApply = (index, record) => {
        var t = this;
        var apply = this.props.products.get(record.key);
        $.ajax({
            url: '/saveAirline',
            type: 'POST',
            data: {id: apply.product.id, name: apply.product.name},
            success: function () {
                t.keyArr.delete(record.key);
                var product = apply.product;
                var isNew = false;
                var arr = {product, isNew};
                t.props.products.set(record.key, arr);
                t.forceUpdate();
            },
            error: function () {
                alert("Ощибка сервера! Проверьте корректность запроса или работоспособность сервера");
            },
            dataType: 'json',
        });
    };

    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'key', key: 'key'
            },
            {
                title: 'Airline Company Name', dataIndex: 'name', key: 'name',
                render: (text, record, index) => (
                    <AirlineEditableCell
                        value={text}
                        id="name"
                        rec={record}
                        onChange={this.onCellChange(index, 'name', record)}
                    />
                )
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        this.props.products.size > 0 ? this.keyArr.has(record.key) == false ?
                                (
                                    <div>
                                        <Popconfirm title="Вы уверены?" onConfirm={() => this.onDelete(index, record)}>
                                            <Button type="danger">Удалить</Button>
                                        </Popconfirm>
                                        {'  '}
                                        <Button type="primary" disabled>Применить</Button>
                                    </div>
                                ) :
                                (<div>
                                    <Popconfirm title="Вы уверены?" onConfirm={() => this.onDelete(index, record)}>
                                        <Button type="danger">Удалить</Button>
                                    </Popconfirm>
                                    {'  '}
                                    <Button type="primary"
                                            onClick={() => this.onApply(index, record)}>Применить</Button>
                                </div>) : null);
                }
            }
        ];
        this.rows.splice(0, this.rows.length);
        this.props.products.forEach((value, key, product) => {
            if ((value.product.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1)
                && value.isNew == false) {
                return;
            }
            if (value.isNew == true) {
                this.rows.unshift(this.span(value.product));
            } else {
                this.rows.push(this.span(value.product));
            }
        });
        const pagination = {
            defaultPageSize: 5
        };
        return <div><Button className="editable-add-btn" onClick={this.handleAdd}>Добавить</Button>
            <Table bordered dataSource={this.rows} columns={columns} pagination={pagination}/></div>;
    }
}

var airlineState = {
    name: '',
};
function setAirlineState(key, value) {
    if (key === 'name') {
        airlineState.name = value;
    }
}
var dataAirlineName = [];

class AirlineSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    };

    getAirlineName(value, self) {
        dataAirlineName.splice(0, dataAirlineName.length);
        $.ajax({
            type: 'POST',
            url: '/getAirlineNameContaining',
            data: {name: value},
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    dataAirlineName.push(<Option key={data[i]}>{data[i]}</Option>);
                }
                self.forceUpdate();

            },
            error: function () {
                alert("Ощибка сервера! Проверьте корректность запроса или работоспособность сервера");
            }
        });
    }

    handleSelect(e) {
        if (e == undefined) {
            e = '';
        }
        dataAirlineName.splice(0, dataAirlineName.length);
        setAirlineState('name', e);
        var self = this;
        if (e !== '') {
            self.getAirlineName(e, self);
        }
        self.props.onUserInput(
            airlineState.name
        );
    }

    render() {
        return (
            <form>
                <Select
                    combobox
                    value={this.props.filterText}
                    placeholder="Название..."
                    style={{width: 200}}
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    showSearch={true}
                    allowClear={true}
                    filterOption={false}
                    onChange={this.handleSelect}
                >
                    {dataAirlineName}
                </Select>
            </form>
        );
    }
}

class FilterableAirlineTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: ''
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    render() {
        return (
            <div>
                <AirlineSearchBar
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput}
                />
                <AirlineTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}
/* ReactDOM.render(
 <FilterableAirlineTable products={airlineMap}/>,
 document.getElementById('root')
 );*/

