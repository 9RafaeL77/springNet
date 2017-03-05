/**
 * Created by Rafael on 13.02.2017.
 */
var Table = antd.Table;
var Switch = antd.Switch;
var Select = antd.Select;
var DatePicker = antd.DatePicker;
var moment = moment;
const Option = Select.Option;

class UserTable extends React.Component {
    span(product) {
        return {
            key: product.id,
            airline: product.airline.name,
            routeFrom: product.route.routeFrom,
            routeTo: product.route.routeTo,
            departureTime: product.departureTime,
            arrivalTime: product.arrivalTime,
            board: product.board.name,
        };
    }
    rows = [];
    num = null;
    render() {
        const columns = [
            {
                title: 'Route From', dataIndex: 'routeFrom', key: 'routeFrom',
            },
            {
                title: 'Route To', dataIndex: 'routeTo', key: 'routeTo',
            },
            {
                title: 'Airline', dataIndex: 'airline', key: 'airline',
            },

            {
                title: 'Departure Time', dataIndex: 'departureTime', key: 'departureTime',
            },
            {
                title: 'Arrival Time', dataIndex: 'arrivalTime', key: 'arrivalTime',
            },
            {
                title: 'Board', dataIndex: 'board', key: 'board',
            }
        ];
        this.rows.splice(0, this.rows.length);
        this.props.products.forEach((value, key, product) => {
            if (value.route.routeFrom.toLowerCase().indexOf(this.props.routeFrom.toLowerCase()) === -1 ||
                (value.route.routeTo.toLowerCase().indexOf(this.props.routeTo.toLowerCase()) === -1)
            )return;
            this.rows.push(this.span(value));
        });
        const pagination = {
            defaultPageSize: 5
        };
        return <Table bordered dataSource={this.rows} columns={columns} pagination={pagination}/>;
    }
}

var userState = {
    routeFrom: '',
    routeTo: ''
};
function setUserState(key, value) {
    if (key === 'routeFrom') {
        userState.routeFrom = value;
    }
    if (key === 'routeTo') {
        userState.routeTo = value;
    }
}

var dataCity = [];
class UserSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectRouteFrom = this.handleSelectRouteFrom.bind(this);
        this.handleSelectRouteTo = this.handleSelectRouteTo.bind(this);
    };

    getCities(value, self, name) {
        $.ajax({
            type: 'POST',
            url: "/getRoute" + name + "Containing",
            data: {name: value},
            dataType: 'json',
            success: function (city) {
                for (var i = 0; i < city.length; i++) {
                    dataCity.push(<Option key={city[i]}>{city[i]}</Option>);
                }
                self.forceUpdate();
                dataCity.splice(0, dataCity.length);
            }
        });
    }

    handleSelectRouteTo(e) {
        if (e == undefined) {
            e = '';
        }
        setUserState('routeTo', e);
        var self = this;
        if (e !== '') {
            var name = 'To';
            self.getCities(e, self, name);
        }
        self.props.onUserInput(
            userState.routeFrom,
            userState.routeTo,
        );
    }

    handleSelectRouteFrom(e) {
        if (e == undefined) {
            e = '';
        }
        setUserState('routeFrom', e);
        var self = this;
        if (e !== '') {
            var name = 'From';
            self.getCities(e, self, name);
        }
        self.props.onUserInput(
            userState.routeFrom,
            userState.routeTo,
        );
    }

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
                {' '}
                <Select
                    combobox
                    value={this.props.routeTo}
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
            </form>
        );
    }
}
class FilterableUserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeFrom: '',
            routeTo: '',
            arr: []
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    flag = true;
    getFlight() {
        var t = this;
        var resArray = [];
        $.ajax({
            type: 'GET',
            url: "/getAllFlight",
            dataType: 'json',
            success: function (data) {
                data.forEach((product) => {
                    resArray.push(product);
                });
                t.setState({arr: resArray});
                t.flag = false;
            },
            error: function () {
                alert("Сервер не отвечает. Проверьте работу сервера!");
            }
        })
    };

    handleUserInput(routeFrom, routeTo) {
        this.setState({
            routeFrom: routeFrom,
            routeTo: routeTo,
        });
    }

    render() {
        if (this.flag) {
            this.getFlight();
            return null;
        }
        return (
            <div>
                <UserSearchBar
                    routeFrom={this.state.routeFrom}
                    routeTo={this.state.routeTo}
                    onUserInput={this.handleUserInput}
                />
                <UserTable
                    products={this.state.arr}
                    routeFrom={this.state.routeFrom}
                    routeTo={this.state.routeTo}
                />
            </div>
        );
    }
}
ReactDOM.render(
    <FilterableUserTable />,
    document.getElementById('root')
);