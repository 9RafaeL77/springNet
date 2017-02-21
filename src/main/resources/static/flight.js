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

let flightMap = new Map();
 function getFlight() {
 var request;
 if (window.XMLHttpRequest) {
 request = new XMLHttpRequest();
 } else {
 request = new ActiveXObject("Microsoft.XMLHTTP");
 }
 request.open('GET', 'http://localhost:8080//getAllFlight', false);
 request.onreadystatechange = function () {
 if ((request.readyState === 4) && (request.status === 200)) {
 var dataJson = JSON.parse(request.responseText);
 }
 dataJson.forEach((product) => {
 var isNew = false;
 var arr = {product,isNew};
 flightMap.set(product.id, arr);
 })
 };
 request.send();
 }

 getFlight();

class FlightEditableCell extends React.Component {
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
            return <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                defaultValue={moment(this.props.time.flightTime, 'YYYY-MM-DD HH:mm:ss')}
                placeholder="Select Time"
                onChange={this.handleChangeDate}
            />;
            /*return <TimePicker defaultValue={moment(this.props.time.flightTime, 'HH:mm:ss')}
                               onChange={this.handleChangeDate}/>;*/
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

class FlightTable extends React.Component {
    span(product) {
        return {
            key: product.id,
            airline: product.airline,
            route: product.route,
            departureTime: product.departureTime,
            arrivalTime: product.arrivalTime,
            board: product.board,
            passengers: product.passengers
        };
    }

    rows = [];
    num = null;
    keyArrFlight = new Set();
    onCellChange = (index, text, record) => {
        return (value, id) => {
            this.keyArrFlight.add(record.key);
            var temp = this.props.products.get(record.key);
            if (id === 'airline') {
                temp.product.airline = value;
            }
            if (id === 'route') {
                temp.product.route = value;
            }
            if (id === 'departureTime') {
                temp.product.departureTime = value;
            }
            if (id === 'boardName') {
                temp.product.board = value;
            }
            this.props.products.set(record.key, temp);
            this.forceUpdate();
        };

    };
    onDelete = (index, record) => {
        this.props.products.delete(record.key);
        $.ajax({
            url: 'http://localhost:8080///deleteFlightById',
            type: 'POST',
            data: 'id=' + record.key,
            dataType: 'json',
            success: {
                200: function () {
                    console.log("200onDeleteOfRoute");
                }
            }
        });
        this.forceUpdate();
    };
    handleAdd = () => {
        var max;
        for (let key of this.props.products.keys()) {
            max = key;
        }
        var k = (+max + 1);
        const product = {
            id: k,
            airline: 1,
            route: 1,
            departureTime: '2017.02.22:12:45',
            arrivalTime: '2017.02.22:12:45',
            board: 1,
            passengers: '0'
        };
        var isNew = true;
        var arr = {product, isNew};
        this.props.products.set(k, arr);
        this.forceUpdate();
    };

    onApply = (index, record) => {
        this.keyArrFlight.delete(record.key);
        var t = this;
        var apply = this.props.products.get(record.key);
        $.ajax({
            type: 'POST',
            url: "http://localhost:8080//saveFlight",
            data: "id=" + apply.product.id + "&airlineId=" + apply.product.airline +
            "&routeId=" + apply.product.route + "&departureTime=" + apply.product.departureTime +
            "&boardId=" + apply.product.boardId + "&passengers=" + apply.product.passengers,
            dataType: 'application/json',
            success: function (city) {
                    var product = apply.product;//JSON.parse(city.responseText);
                    var isNew = false;
                    var arr = {product, isNew};
                    t.props.products.set(record.key, arr);
                    t.forceUpdate();
                }
        });
    };

    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'key', key: 'key'
            },
            {
                title: 'Airline', dataIndex: 'airline', key: 'airline',
                render: (text, record, index) => (
                    <FlightEditableCell
                        value={text}
                        id="airline"
                        onChange={this.onCellChange(index, 'airline', record)}
                    />
                )
            },
            {
                title: 'Route', dataIndex: 'route', key: 'route',
                render: (text, record, index) => (
                    <FlightEditableCell
                        value={text}
                        id="route"
                        onChange={this.onCellChange(index, 'route', record)}
                    />
                )
            },
            {
                title: 'Departure Time', dataIndex: 'departureTime', key: 'departureTime',
                render: (text, record, index) => (
                    <FlightEditableCell
                        value={text}
                        id="departureTime"
                        time={record}
                        onChange={this.onCellChange(index, 'departureTime', record)}
                    />
                )
            },
            {
                title: 'Arrival Time', dataIndex: 'arrivalTime', key: 'arrivalTime',
            },
            {
                title: 'Board', dataIndex: 'board', key: 'board',
                render: (text, record, index) => (
                    <FlightEditableCell
                        value={text}
                        id="board"
                        time={record}
                        onChange={this.onCellChange(index, 'board', record)}
                    />
                )
            },
            {
                title: 'Passengers', dataIndex: 'passengers', key: 'passengers',
                render: (text, record, index) => (
                    <FlightEditableCell
                        value={text}
                        id="passengers"
                        time={record}
                        onChange={this.onCellChange(index, 'passengers', record)}
                    />
                )
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        this.props.products.size > 1 ? this.keyArrFlight.has(record.key) == false ?
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
            if ((value.product.airline.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 ||
                (value.product.board.toLowerCase().indexOf(this.props.routeFrom.toLowerCase()) === -1))
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

var flightState = {
    airline: '',
    board: '',
    check: false
};
function setFlightState(key, value) {
    if (key === 'airline') {
        flightState.airline = value;
    }
    if (key === 'board') {
        flightState.board = value;
    }
    if (key === 'check') {
        flightState.check = value;
    }
}
var dataRes = [];

class FlightSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelect2 = this.handleSelect2.bind(this);
    };

    getRes(value, self, url) {
        $.ajax({
            type: 'POST',
            url: "http://localhost:8080//" + url,
            data: "name=" + value,
            dataType: 'application/json',
            success: function (city) {
                    var dataJson = JSON.parse(city.responseText);
                    for (var i = 0; i < dataJson.length; i++) {
                        dataRes.push(<Option key={dataJson[i]}>{dataJson[i]}</Option>);
                    }
                    self.forceUpdate();
                    dataRes.splice(0, dataRes.length);
                }
        });
    }

    handleSelect(e) {
        if (e == undefined) {
            e = '';
        }
        dataRes.splice(0, dataRes.length);
        setFlightState('airline', e);
        var self = this;
        if (e !== '') {
            var url = "getairlineNameContaining";
            self.getRes(e, self, url);
        }
        self.props.onUserInput(
            flightState.airline,
            flightState.board,
            flightState.check
        );
    }

    handleSelect2(e) {
        if (e == undefined) {
            e = '';
        }
        dataRes.splice(0, dataRes.length);
        setFlightState('board', e);
        var self = this;
        if (e !== '') {
            var url = "getboardNameContaining";
            self.getRes(e, self, url);
        }
        self.props.onUserInput(
            flightState.airline,
            flightState.board,
            flightState.check
        );
    }

    isCheck = (e) => {
        setFlightState('check', e);
        this.props.onUserInput(
            flightState.airline,
            flightState.board,
            flightState.check
        );
    };

    render() {
        return (
            <form>
                <Select
                    combobox
                    value={this.props.routeFrom}
                    placeholder="Board..."
                    style={{width: 200}}
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    showSearch={true}
                    allowClear={true}
                    filterOption={false}
                    onChange={this.handleSelect2}
                >
                    {dataRes}
                </Select>
                <Select
                    combobox
                    value={this.props.filterText}
                    placeholder="Airline..."
                    style={{width: 200}}
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    showSearch={true}
                    allowClear={true}
                    filterOption={false}
                    onChange={this.handleSelect}
                >
                    {dataRes}
                </Select>
                <Switch
                    onChange={this.isCheck}
                    checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
                {' '}
            </form>
        );
    }
}

class FilterableFlightTable extends React.Component {
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
                <FlightSearchBar
                    filterText={this.state.filterText}
                    routeFrom={this.state.routeFrom}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                />
                <FlightTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    routeFrom={this.state.routeFrom}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}
 ReactDOM.render(
 <FilterableFlightTable products={flightMap}/>,
 document.getElementById('root')
 );
