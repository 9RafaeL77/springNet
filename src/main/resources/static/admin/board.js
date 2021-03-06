/**
 * Created by Rafael on 18.02.2017.
 */
var Table = antd.Table;
var Icon = antd.Icon;
var Select = antd.Select;
var Button = antd.Button;
var Popconfirm = antd.Popconfirm;
var Input = antd.Input;
const Option = Select.Option;

class BoardEditableCell extends React.Component {
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

class BoardTable extends React.Component {
    iterable = 0;
    span(product) {
        return {
            key: product.id,
            name: product.name,
            capacity: product.capacity,
            economy: product.economy,
            business: product.business,
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
            if (id === 'capacity') {
                temp.product.capacity = value;
            }
            if (id === 'economy') {
                temp.product.economy = value;
            }
            if (id === 'business') {
                temp.product.business = value;
            }
            this.props.products.set(record.key, temp);
            this.forceUpdate();
        };

    };
    onDelete = (index, record) => {
        var t = this;
        $.ajax({
            type: 'POST',
            url: "/deleteBoardById",
            data: {boardId: record.key},
            dataType: 'text',
            success: function (data) {
                t.props.products.delete(record.key);
                console.log(data);
                t.forceUpdate();
            },
            error: function () {
                alert("Ощибка сервера! Проверьте корректность запроса или работоспособность сервера");
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
            name: 'Unknown' + (this.iterable),
            capacity: 0,
            economy: 0,
            business: 0,
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
            type: 'POST',
            url: "/saveBoard",
            data: {boardId: apply.product.id, name: apply.product.name, capacity: apply.product.capacity,
                economy: apply.product.economy, business: apply.product.business},
            dataType: 'json',
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
            }
        });
    };

    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'key', key: 'key'
            },
            {
                title: 'Board name', dataIndex: 'name', key: 'name',
                render: (text, record, index) => (
                    <BoardEditableCell
                        value={text}
                        id="name"
                        rec={record}
                        onChange={this.onCellChange(index, 'name', record)}
                    />
                )
            },
            {
                title: 'Capacity', dataIndex: 'capacity', key: 'capacity',
                render: (text, record, index) => (
                    <BoardEditableCell
                        value={text}
                        id="capacity"
                        onChange={this.onCellChange(index, 'capacity', record)}
                    />
                )
            },
            {
                title: 'Economy', dataIndex: 'economy', key: 'economy',
                render: (text, record, index) => (
                    <BoardEditableCell
                        value={text}
                        id="economy"
                        onChange={this.onCellChange(index, 'economy', record)}
                    />
                )
            },
            {
                title: 'Business', dataIndex: 'business', key: 'business',
                render: (text, record, index) => (
                    <BoardEditableCell
                        value={text}
                        id="business"
                        time={record}
                        onChange={this.onCellChange(index, 'business', record)}
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

var boardState = {
    name: '',
};
function setBoardState(key, value) {
    if (key === 'name') {
        boardState.name = value;
    }
}
var dataBoardName = [];

class BoardSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    };

    getBoardName(value, self) {
        $.ajax({
            type: 'POST',
            url: "/getBoardNameContaining",
            data: {name: value},
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    dataBoardName.push(<Option key={data[i]}>{data[i]}</Option>);
                }
                self.forceUpdate();
                dataBoardName.splice(0, dataBoardName.length);
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
        dataBoardName.splice(0, dataBoardName.length);
        setBoardState('name', e);
        var self = this;
        if (e !== '') {
            self.getBoardName(e, self);
        }
        self.props.onUserInput(
            boardState.name
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
                    {dataBoardName}
                </Select>
            </form>
        );
    }
}

class FilterableBoardTable extends React.Component {
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
                <BoardSearchBar
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput}
                />
                <BoardTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}
/*
 ReactDOM.render(
 <FilterableBoardTable products={map}/>,
 document.getElementById('root')
 );
 */
