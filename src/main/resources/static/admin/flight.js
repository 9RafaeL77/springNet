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
var DatePicker = antd.DatePicker;
var moment = moment;
const Option = Select.Option;

class FlightEditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
        loading: []
    };
    arrayRoute = [];
    arrayAirline = [];
    arrayBoard = [];
    flagAir = true;
    flagBoard = true;
    flagRoute = true;

    getRes(url) {
        var t = this;
        var dataRes = [];
        $.ajax({
            type: 'GET',
            url: "/" + url,
            dataType: 'json',
            success: function (res) {
                for (var i = 0; i < res.length; i++) {
                    dataRes.push(<Option key={res[i].name}>{res[i].name}</Option>);
                }
                t.setState({loading: dataRes});
                if (url === 'getAllAirline') {
                    t.arrayAirline = res;
                    t.flagAir = false;
                }
                if (url === 'getAllBoard') {
                    t.arrayBoard = res;
                    t.flagBoard = false;
                }
            },
            error: function () {
                alert("ERROR!");
            }
        });
    };

    getRoute() {
        var t = this;
        var dataRes = [];
        $.ajax({
            type: 'GET',
            url: "/getAllRoute",
            dataType: 'json',
            success: function (res) {
                t.arrayRoute = res;
                for (var i = 0; i < res.length; i++) {
                    dataRes.push(<Option key={res[i].routeFrom + '-' + res[i].routeTo}>{res[i].routeFrom +
                    '-' + res[i].routeTo}</Option>);
                }
                t.setState({loading: dataRes});
                t.flagRoute = false;
            },
            error: function () {
                alert("ERROR!");
            }
        });
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
    handleChangeAirline = (value) => {
        var airline;
        for (var i = 0; i < this.arrayAirline.length; i++) {
            if (this.arrayAirline[i].name === value) {
                airline = this.arrayAirline[i];
                break;
            }
        }
        if (this.props.onChange) {
            this.props.onChange(airline, this.props.id);
        }
    };
    handleChangeBoard = (value) => {
        var board;
        for (var i = 0; i < this.arrayBoard.length; i++) {
            if (this.arrayBoard[i].name === value) {
                board = this.arrayBoard[i];
                break;
            }
        }
        if (this.props.onChange) {
            this.props.onChange(board, this.props.id);
        }
    };
    handleChangeRoute = (value) => {
        var route;
        for (var i = 0; i < this.arrayRoute.length; i++) {
            if ((this.arrayRoute[i].routeFrom + '-' + this.arrayRoute[i].routeTo) === value) {
                route = this.arrayRoute[i];
                break;
            }
        }
        if (this.props.onChange) {
            this.props.onChange(route, this.props.id);
        }
    };

    render() {
        const {value, editable} = this.state;
        var t = this;
        if (t.props.id === 'departureTime') {
            return <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                defaultValue={moment(t.props.time.departureTime, 'YYYY-MM-DD HH:mm:ss')}
                onChange={t.handleChangeDate}
            />;
        }
        if (t.props.id === 'airline') {
            if (t.flagAir) {
                t.getRes('getAllAirline');
            }
            return <Select defaultValue={t.props.airline.airline} style={{width: 120}} onChange={t.handleChangeAirline}>
                {t.state.loading}
            </Select>
        }
        if (t.props.id === 'board') {
            if (t.flagBoard) {
                t.getRes('getAllBoard');
            }
            return <Select defaultValue={t.props.board.board} style={{width: 120}} onChange={t.handleChangeBoard}>
                {t.state.loading}
            </Select>
        }
        if (t.props.id === 'route') {
            if (t.flagRoute) {
                t.getRoute();
            }
            return <Select defaultValue={t.props.route.route} style={{width: 150}} onChange={t.handleChangeRoute}>
                {t.state.loading}
            </Select>
        }
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

class FlightTable extends React.Component {
    span(product) {
        return {
            key: product.id,
            airline: product.airline.name,
            route: product.route.routeFrom + "-" + product.route.routeTo,
            departureTime: product.departureTime,
            arrivalTime: product.arrivalTime,
            board: product.board.name,
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
            if (id === 'board') {
                temp.product.board = value;
            }
            if (id === 'passengers') {
                temp.product.passengers = value;
            }
            this.props.products.set(record.key, temp);
            this.forceUpdate();
        };
    };
    onDelete = (index, record) => {
        this.props.products.delete(record.key);
        $.ajax({
            url: '/deleteFlightById',
            type: 'POST',
            data: 'id=' + record.key,
            dataType: 'json',
            success:  function () {
                    console.log("200onDeleteOfRoute");
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
            route: this.props.products.get(1).product.route,
            departureTime: '2017.02.22 12:45:00',
            arrivalTime: '2017.02.22 12:45:00',
            passengers: 0,
            board: this.props.products.get(1).product.board,
            airline: this.props.products.get(1).product.airline
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
            url: "/saveFlight",
            data: {id: apply.product.id, airlineId: apply.product.airline.id, routeId: apply.product.route.id,
                departureTime: apply.product.departureTime, boardId: apply.product.board.id, passengers: apply.product.passengers},
            dataType: 'json',
            success: function () {
                var product = apply.product;
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
                        airline={record}
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
                        route={record}
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
                        board={record}
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
            if ((value.product.airline.name.toLowerCase().indexOf(this.props.airName.toLowerCase()) === -1 ||
                (value.product.board.name.toLowerCase().indexOf(this.props.boardName.toLowerCase()) === -1))
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
    board: ''
};
function setFlightState(key, value) {
    if (key === 'airline') {
        flightState.airline = value;
    }
    if (key === 'board') {
        flightState.board = value;
    }
}

var dataRes = [];
class FlightSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectAirline = this.handleSelectAirline.bind(this);
        this.handleSelectBoard = this.handleSelectBoard.bind(this);
    };
    getRes(value, self, url) {
        $.ajax({
            type: 'POST',
            url: "/" + url,
            data: {name: value},
            dataType: 'json',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    dataRes.push(<Option key={result[i]}>{result[i]}</Option>);
                }
                self.forceUpdate();
                dataRes.splice(0, dataRes.length);
            },
            error: function () {
                alert("ERROR IN getRes");
            }
        });
    }

    handleSelectAirline(e) {
        if (e == undefined) {
            e = '';
        }
        //dataRes.splice(0, dataRes.length);
        setFlightState('airline', e);
        var self = this;
        if (e !== '') {
            var url = "getAirlineNameContaining";
            self.getRes(e, self, url);
        }
        self.props.onUserInput(
            flightState.airline,
            flightState.board
        );
    }

    handleSelectBoard(e) {
        if (e == undefined) {
            e = '';
        }
        //dataRes.splice(0, dataRes.length);
        setFlightState('board', e);
        var self = this;
        if (e !== '') {
            var url = "getBoardNameContaining";
            self.getRes(e, self, url);
        }
        self.props.onUserInput(
            flightState.airline,
            flightState.board
        );
    }

    render() {
        return (
            <form>
                <Select
                    combobox
                    value={this.props.boardName}
                    placeholder="Board..."
                    style={{width: 200}}
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    showSearch={true}
                    allowClear={true}
                    filterOption={false}
                    onChange={this.handleSelectBoard}
                >
                    {dataRes}
                </Select>
                <Select
                    combobox
                    value={this.props.airName}
                    placeholder="Airline..."
                    style={{width: 200}}
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    showSearch={true}
                    allowClear={true}
                    filterOption={false}
                    onChange={this.handleSelectAirline}
                >
                    {dataRes}
                </Select>
                {' '}
            </form>
        );
    }
}

class FilterableFlightTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardName: '',
            airName: ''
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(airName, boardName) {
        this.setState({
            airName: airName,
            boardName: boardName
        });
    }

    render() {
        return (
            <div>
                <FlightSearchBar
                    airName={this.state.airName}
                    boardName={this.state.boardName}
                    onUserInput={this.handleUserInput}
                />
                <FlightTable
                    products={this.props.products}
                    airName={this.state.airName}
                    boardName={this.state.boardName}
                />
            </div>
        );
    }
}
/*ReactDOM.render(
    <FilterableFlightTable products={flightMap}/>,
    document.getElementById('root')
);*/
