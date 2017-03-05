/**
 * Created by Rafael on 13.02.2017.
 */

var Table = antd.Table;
var Icon = antd.Icon;
var Switch = antd.Switch;
var Select = antd.Select;
var Button = antd.Button;
var Popconfirm = antd.Popconfirm;
var Input = antd.Input;
var TimePicker = antd.TimePicker;
var moment = moment;
const Option = Select.Option;

class RouteEditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({value});
    };
    handleChangeDate = (time, timeString) => {
        if (this.props.onChange) {
            this.props.onChange(timeString, this.props.id);
        }
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
        if (this.props.id === 'flightTime') {
            return <TimePicker defaultValue={moment(this.props.time.flightTime, 'HH:mm:ss')}
                               onChange={this.handleChangeDate}/>;
        } else return (<div className="editable-cell">
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

class RouteTable extends React.Component {
    span(product) {
        return {
            key: product.id,
            routeTo: product.routeTo,
            routeFrom: product.routeFrom,
            flightTime: product.flightTime,
        };
    }

    rows = [];
    num = null;
    keyArrRoute = new Set();
    onCellChange = (index, text, record) => {
        return (value, id) => {
            this.keyArrRoute.add(record.key);
            var temp = this.props.products.get(record.key);
            if (id === 'routeTo') {
                temp.product.routeTo = value;
            }
            if (id === 'routeFrom') {
                temp.product.routeFrom = value;
            }
            if (id === 'flightTime') {
                temp.product.flightTime = value;
            }
            this.props.products.set(record.key, temp);
            this.forceUpdate();
        };
    };
    onDelete = (index, record) => {
        var t = this;
        $.ajax({
            url: '/deleteRouteById',
            type: 'POST',
            data: {id: record.key},
            dataType: 'text',
            success: function (data) {
                t.props.products.delete(record.key);
                t.forceUpdate();
                console.log(data);
            },
            error: function () {
                alert("Ощибка сервера! Проверьте корректность запроса или работоспособность сервера");
            }
        });

    };
    handleAdd = () => {
        var max;
        for (let key of this.props.products.keys()) {
            max = key;
        }
        var k = (+max + 1);
        const product = {
            id: k,
            routeTo: 'Unknown',
            routeFrom: 'Unknown',
            flightTime: '00:00:00',
        };
        var isNew = true;
        var arr = {product, isNew};
        this.props.products.set(k, arr);
        this.forceUpdate();
    };

    onApply = (index, record) => {
        var t = this;
        var apply = this.props.products.get(record.key);
        $.ajax({
            type: 'POST',
            url: "/saveRoute",
            data: {
                id: apply.product.id, routeFrom: apply.product.routeFrom,
                routeTo: apply.product.routeTo, routeTime: apply.product.flightTime
            },
            dataType: 'json',
            success: function () {
                t.keyArrRoute.delete(record.key);
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
                title: 'RouteFrom', dataIndex: 'routeFrom', key: 'routeFrom',
                render: (text, record, index) => (
                    <RouteEditableCell
                        value={text}
                        id="routeFrom"
                        onChange={this.onCellChange(index, 'routeFrom', record)}
                    />
                )
            },
            {
                title: 'RouteTo', dataIndex: 'routeTo', key: 'routeTo',
                render: (text, record, index) => (
                    <RouteEditableCell
                        value={text}
                        id="routeTo"
                        onChange={this.onCellChange(index, 'routeTo', record)}
                    />
                )
            },
            {
                title: 'Flight Time', dataIndex: 'flightTime', key: 'flightTime',
                render: (text, record, index) => (
                    <RouteEditableCell
                        value={text}
                        id="flightTime"
                        time={record}
                        onChange={this.onCellChange(index, 'flightTime', record)}
                    />
                )
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        this.props.products.size > 1 ? this.keyArrRoute.has(record.key) == false ?
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
            if ((value.product.routeTo.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 ||
                (value.product.routeFrom.toLowerCase().indexOf(this.props.routeFrom.toLowerCase()) === -1))
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

var routeState = {
    routeTo: '',
    routeFrom: '',
    check: false
};
function setRouteState(key, value) {
    if (key === 'routeTo') {
        routeState.routeTo = value;
    }
    if (key === 'routeFrom') {
        routeState.routeFrom = value;
    }
    if (key === 'check') {
        routeState.check = value;
    }
}
var dataCity = [];

class RouteSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectRouteTo = this.handleSelectRouteTo.bind(this);
        this.handleSelectRouteFrom = this.handleSelectRouteFrom.bind(this);
    };

    getRouteContain(value, self, name) {
        $.ajax({
            type: 'POST',
            url: "/getRoute" + name + "Containing",
            data: {name: value},
            dataType: 'json',
            success: function (city) {
               // var dataJson = JSON.parse(city.responseText);
                for (var i = 0; i < city.length; i++) {
                    dataCity.push(<Option key={city[i]}>{city[i]}</Option>);
                }
                self.forceUpdate();
                dataCity.splice(0, dataCity.length);
            },
            error: function () {
                alert("Ощибка сервера! Проверьте корректность запроса или работоспособность сервера");
            }
        });
    }

    handleSelectRouteTo(e) {
        if (e == undefined) {
            e = '';
        }
        dataCity.splice(0, dataCity.length);
        setRouteState('routeTo', e);
        var self = this;
        if (e !== '') {
            var name = 'To';
            self.getRouteContain(e, self, name);
        }
        self.props.onUserInput(
            routeState.routeTo,
            routeState.routeFrom,
            routeState.check
        );
    }

    handleSelectRouteFrom(e) {
        if (e == undefined) {
            e = '';
        }
        dataCity.splice(0, dataCity.length);
        setRouteState('routeFrom', e);
        var self = this;
        if (e !== '') {
            var name = 'From';
            self.getRouteContain(e, self, name);
        }
        self.props.onUserInput(
            routeState.routeTo,
            routeState.routeFrom,
            routeState.check
        );
    }

    isCheck = (e) => {
        setRouteState('check', e);
        this.props.onUserInput(
            routeState.routeTo,
            routeState.routeFrom,
            routeState.check
        );
    };

    render() {
        return (
            <form>
                <Select
                    combobox
                    value={this.props.routeFrom}
                    placeholder="Откуда..."
                    style={{width: 200}}
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    showSearch={true}
                    allowClear={true}
                    filterOption={false}
                    onChange={this.handleSelectRouteFrom}
                >
                    {dataCity}
                </Select>
                <Select
                    combobox
                    value={this.props.filterText}
                    placeholder="Куда..."
                    style={{width: 200}}
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    showSearch={true}
                    allowClear={true}
                    filterOption={false}
                    onChange={this.handleSelectRouteTo}
                >
                    {dataCity}
                </Select>
                <Switch
                    onChange={this.isCheck}
                    checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
                {' '}
            </form>
        );
    }
}

class FilterableRouteTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeFrom: '',
            filterText: '',
            inStockOnly: false
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(filterText, routeFrom, inStockOnly) {
        this.setState({
            filterText: filterText,
            routeFrom: routeFrom,
            inStockOnly: inStockOnly
        });
    }

    render() {
        return (
            <div>
                <RouteSearchBar
                    filterText={this.state.filterText}
                    routeFrom={this.state.routeFrom}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                />
                <RouteTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    routeFrom={this.state.routeFrom}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}
/*
 ReactDOM.render(
 <FilterableRouteTable products={map}/>,
 document.getElementById('root')
 );*/
