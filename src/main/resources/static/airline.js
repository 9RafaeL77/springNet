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

 /*let airlineMap = new Map();
 function getAirline() {
 var request;
 if (window.XMLHttpRequest) {
 request = new XMLHttpRequest();
 } else {
 request = new ActiveXObject("Microsoft.XMLHTTP");
 }
 request.open('GET', 'http://localhost:8080//getAllAirline', false);
 request.onreadystatechange = function () {
 if ((request.readyState === 4) && (request.status === 200)) {
 var dataJson = JSON.parse(request.responseText);
 }
 dataJson.forEach((product) => {
 var isNew = false;
 var arr = {product,isNew};
 airlineMap.set(product.id, arr);
 })
 };
 request.send();
 }
 getAirline();*/

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
        this.props.products.delete(record.key);
        $.ajax({
            url: 'http://localhost:8080///deleteAirlineById',
            type: 'POST',
            data: 'id=' + record.key,
            dataType: 'json',
            success: {
                200: function () {
                    console.log("200onDeleteOfAirline");
                }
            }
        });
        this.forceUpdate();
    };
    handleAdd = () => {
        this.iterable += 1;
        var max;
        for (let key of this.props.products.keys()) {
            max = key;
        }
        var k = (+max + 1);
        const product = {
            id:k,
            name: 'Unknown' + (this.iterable)
        };
        var isNew = true;
        var arr = {product, isNew};
        this.props.products.set(product.id, arr);
        this.forceUpdate();
    };

    onApply = (index, record) => {
        this.keyArr.delete(record.key);
        var t = this;
        var apply = this.props.products.get(record.key);
        $.ajax({
            url: 'http://localhost:8080//saveAirline',
            type: 'POST',
            data: 'id='+apply.product.id+'&name='+apply.product.name,
            success: function (data) {
                var product = apply.product;//JSON.parse(city.responseText);
                var isNew = false;
                var arr = {product, isNew};
                t.props.products.set(record.key, arr);
                t.forceUpdate();
            },
            dataType: 'json',
            /*statusCode: {
                200: function () {
                    var product = apply.product;//JSON.parse(city.responseText);
                    var isNew = false;
                    var arr = {product, isNew};
                    t.props.products.set(record.key, arr);
                    t.forceUpdate();
                }
            }*/
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

class BoardSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    };

    getCities(value, self) {
        $.ajax({
            url: 'http://localhost:8080/getairlineNameContaining',
            type: 'POST',
            data: 'name=' + value,
            success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        dataAirlineName.push(<Option key={data[i]}>{data[i]}</Option>);
                    }
                    self.forceUpdate();
                    dataAirlineName.splice(0, dataAirlineName.length);
                },
            dataType: 'json',
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
            self.getCities(e, self);
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
                <BoardSearchBar
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

