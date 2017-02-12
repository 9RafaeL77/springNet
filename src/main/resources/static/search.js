/**
 * Created by Rafael on 31.01.2017.
 */
var Table = antd.Table;
var Icon = antd.Icon;
var Switch = antd.Switch;
var Select = antd.Select;
const Option = Select.Option;

class ProductTable extends React.Component {
    span(product) {
        if (!product.delay) {
            return {
                routeTo: product.routeTo,
                routeFrom: product.routeFrom,
                flightTime: product.flightTime,
                boardName: product.boardName,
                airCompany: product.airCompany,
                delay: product.delay.toString()
            };
        } else {
            return {
                routeTo: <span style={{color: 'red'}}>{product.routeTo}</span>,
                routeFrom: <span style={{color: 'red'}}>{product.routeFrom}</span>,
                flightTime: <span style={{color: 'red'}}>{product.flightTime}</span>,
                boardName: <span style={{color: 'red'}}>{product.boardName}</span>,
                airCompany: <span style={{color: 'red'}}>{product.airCompany}</span>,
                delay:  <span style={{color: 'red'}}>{product.delay.toString()}</span>
            };
        }
    }
    render() {
        var tag = '';
        if (this.props.filterText === '' && this.props.routeFrom === '') {
            tag = <p></p>;
        }
        else {
            const columns = [
                //{title: 'Number', dataIndex: 'number', key: 'number',},
                {title: 'RouteTo', dataIndex: 'routeTo', key: 'routeTo'},
                {title: 'RouteFrom', dataIndex: 'routeFrom', key: 'routeFrom'},
                {title: 'Flight Time', dataIndex: 'flightTime', key: 'flightTime'},
                {title: 'Board Name', dataIndex: 'boardName', key: 'boardName'},
                {title: 'Airline Company', dataIndex: 'airCompany', key: 'airCompany'},
                {title: 'Delay', dataIndex: 'delay', key: 'delay'}
            ];
            var rows = [];
            this.props.products.forEach((product) => {
                if (product.routeTo.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 ||
                    (!product.delay && this.props.inStockOnly) ||
                    (product.routeFrom.toLowerCase().indexOf(this.props.routeFrom.toLowerCase()) === -1)) {
                    return;
                }

                rows.push(this.span(product));
            });

            /* const rowSelection = {
             type: "checkbox",
             //selectedRowKeys: ['1','2','3'],
             onChange: (selectedRowKeys, selectedRows) => {
             console.log('selectedRowKeys: ', selectedRowKeys, '; selectedRows: ', selectedRows);
             },
             getCheckboxProps: (record) => {
             console.log('record: ', record);
             return true;
             },
             onSelect: (record, selected, selectedRows) => {
             console.log('record: ', record, ';\n selected: ', selected, ';\n selectedRows: '
             :
             selectedRows
             )
             ;
             },
             onSelectAll: (selected, selectedRows, changeRows) => {
             console.log('selected: ', selected, ';\n selectedRows: ', selectedRows, ';\n changeRows '
             :
             changeRows
             )
             ;
             }
             }
             */
            const pagination = {
                total: rows.length,
                // pageSizeOptions: ['5','10','50','100'],
                defaultPageSize: 5,
                // showSizeChanger: true,
                // showQuickJumper: true,
                // size: "small",
                /*onShowSizeChange: (current, pageSize) => {
                 console.log('Current: ', current, '; PageSize: ', pageSize);
                 },
                 onChange: (current) => {
                 console.log('Current: ', current);
                 },
                 showTotfl: (total, range) => {
                 console.log('Total: ', total, '; Range: ', range);
                 }*/
            };
            tag = <Table columns={columns}
                         dataSource={rows}
                         pagination={pagination}
            />;
        }
        return tag;
    }
}
var state = {
    routeTo: '',
    routeFrom: '',
    check: false
};
function setState(key, value) {
    if (key === 'routeTo') {
        state.routeTo = value;
    }
    if (key === 'routeFrom') {
        state.routeFrom = value;
    }
    if (key === 'check') {
        state.check = value;
    }
}
var dataCity = [];

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelect2 = this.handleSelect2.bind(this);
    };
    getCities(value, self, name) {
        $.ajax({
            type: 'GET',
            contentType: 'text/plain',
            url: "http://localhost:8080/getroute" + name + "Containing?city=" + value,
            dataType: 'application/json',
            statusCode: {
                200: function (city) {
                    var dataJson = JSON.parse(city.responseText);
                    for (var i = 0; i < dataJson.length; i++) {
                        dataCity.push(<Option key={dataJson[i]}>{dataJson[i]}</Option>);
                    }
                    self.forceUpdate();
                    dataCity.splice(0, dataCity.length);
                }
            }
        });
    }

    handleSelect(e) {
        if(e == undefined){
            e='';
        }
        dataCity.splice(0, dataCity.length);
        setState('routeTo', e);
        var self = this;
        if(e!=='') {
            var name = 'To'
            self.getCities(e, self, name);
        }
        self.props.onUserInput(
            state.routeTo,
            state.routeFrom,
            state.check
        );

    }
    handleSelect2(e) {
        if(e == undefined){
            e='';
        }
        dataCity.splice(0, dataCity.length);
        setState('routeFrom', e);
        var self = this;
        if(e!=='') {
            var name = 'From'
            self.getCities(e, self, name);
        }
        self.props.onUserInput(
            state.routeTo,
            state.routeFrom,
            state.check
        );

    }
    isCheck = (e) => {
        setState('check', e);
        this.props.onUserInput(
            state.routeTo,
            state.routeFrom,
            state.check
        );
    };
    render() {
        return (
            <form>
                <Select
                    combobox
                    value={this.props.filterText}
                    placeholder="input search text"
                    style={{width: 200}}
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    showSearch={true}
                    allowClear={true}
                    filterOption={false}
                    onChange={this.handleSelect}
                >
                    {dataCity}
                </Select>
                <Select
                    combobox
                    value={this.props.routeFrom}
                    placeholder="input search text"
                    style={{ width: 200 }}
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    showSearch={true}
                    allowClear={true}
                    filterOption={false}
                    onChange={this.handleSelect2}
                >
                    {dataCity}
                </Select>
                <Switch
                    onChange={this.isCheck}
                    checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
                {' '}
                Delay Airlines
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            routeFrom: '',
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
                <SearchBar
                    filterText={this.state.filterText}
                    routeFrom={this.state.routeFrom}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    routeFrom={this.state.routeFrom}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

var AIRLINES = [
    {
        routeTo: 'Samara',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Samara',
        routeFrom: 'St.Petersburg',
        flightTime: '1:00',
        boardName: '777',
        airCompany: 'Airoflot',
        delay: false
    },
    {
        routeTo: 'Samara',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'Airoflot',
        delay: false
    },
    {
        routeTo: 'Moscow',
        routeFrom: 'Samara',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        routeTo: 'Berlin',
        routeFrom: 'St.Petersburg',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'St.Petersburg',
        routeFrom: 'Samara',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Kazan',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        routeTo: 'Saratov',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Sochi',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Penza',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        routeTo: 'Pskov',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Volgograg',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        routeTo: 'Kaluga',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Barnaul',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {routeTo: 'Ufa', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: true},
    {
        routeTo: 'Irkutsk',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Dubai',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'London',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        routeTo: 'Paris',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'New York',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Manchester',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Liverpool',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Barcelona',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Madrid',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    }
];

ReactDOM.render(
    <FilterableProductTable products={AIRLINES}/>,
    document.getElementById('root')
);