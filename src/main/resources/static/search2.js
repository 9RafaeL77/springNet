/**
 * Created by Rafael on 31.01.2017.
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

class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    };
    handleChangeDate = (time,timeString) => {
        if (this.props.onChange) {
            this.props.onChange(timeString, this.props.id);
        }
    };
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value, this.props.id);
        }
    };
    edit = () => {
        this.setState({ editable: true });
    };
    render() {
        const { value, editable } = this.state;
        if (this.props.id === 'flightTime'){
            return <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} onChange={this.handleChangeDate} />;
        }else return (<div className="editable-cell">
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

class ProductTable extends React.Component {
    span(product) {
        if (!product.delay) {
            return {
                key: product.key,
                routeTo: product.routeTo,
                routeFrom: product.routeFrom,
                flightTime: product.flightTime,
                boardName: product.boardName,
                airCompany: product.airCompany,
                delay: product.delay.toString()
            };
        } else {
            return {
                key:product.key,
                routeTo: <span style={{color: 'red'}}>{product.routeTo}</span>,
                routeFrom: <span style={{color: 'red'}}>{product.routeFrom}</span>,
                flightTime: <span style={{color: 'red'}}>{product.flightTime}</span>,
                boardName: <span style={{color: 'red'}}>{product.boardName}</span>,
                airCompany: <span style={{color: 'red'}}>{product.airCompany}</span>,
                delay:  <span style={{color: 'red'}}>{product.delay.toString()}</span>
            };
        }
    }
    rows = [];

    onCellChange = (index) => {
        return (value, id) => {
            console.log("KEY: " + id);
            var temp = this.props.products.get(this.rows[index].key);
            if (id ==='routeTo') {
                temp.routeTo = value;
            }
            if (id ==='routeFrom') {
                temp.routeFrom = value;
            }
            if (id ==='flightTime') {
                temp.flightTime = value;
            }
            if (id ==='boardName') {
                temp.boardName = value;

            }
            if (id ==='airCompany') {
                temp.airCompany = value;
            }
            if (id ==='delay') {
                temp.delay = Boolean(value);
            }
            this.props.products.set(this.rows[index].key, temp);
        };
    };
    onDelete = (index) => {
        this.props.products.delete(this.rows[index].key);
        this.forceUpdate();
    };
    handleAdd = () => {
        var max;
        for(let key of this.props.products.keys()) {
            max = key;
        }
        var k = (+max+1)+'';
        const newData = {
            key:k,
            routeTo: 'Samara',
            routeFrom: 'Moscow',
            flightTime: '0:00',
            boardName: 'Boeing',
            airCompany: 'SAMARA',
            delay: false
        };
        this.props.products.set(k,newData);
        this.forceUpdate();
    };
    render() {
        var tag = '';
        if (this.props.filterText === '' && this.props.routeFrom === '') {
            tag = <p></p>;
        }
        else {
            const columns = [{
                title: 'RouteTo',
                dataIndex: 'routeTo',
                key: 'routeTo',
                width: '17%',
                render: (text, record, index) => (
                    <EditableCell
                        value={text}
                        id="routeTo"
                        onChange={this.onCellChange(index, 'routeTo', record)}
                    />
                )
            }, {title: 'RouteFrom', dataIndex: 'routeFrom', key: 'routeFrom',width: '17%',
                render: (text, record, index) => (
                    <EditableCell
                        value={text}
                        id="routeFrom"
                        onChange={this.onCellChange(index, 'routeFrom', record)}
                    />
                )},
                {title: 'Flight Time', dataIndex: 'flightTime', key: 'flightTime',width: '10%',
                    render: (text, record, index) => (
                        <EditableCell
                            value={text}
                            id="flightTime"
                            onChange={this.onCellChange(index, 'flightTime', record)}
                        />
                    )},
                {title: 'Board Name', dataIndex: 'boardName', key: 'boardName',width: '12%',
                    render: (text, record, index) => (
                        <EditableCell
                            value={text}
                            id="boardName"
                            onChange={this.onCellChange(index, 'boardName', record)}
                        />
                    )},
                {title: 'Airline Company', dataIndex: 'airCompany', key: 'airCompany',width: '14%',
                    render: (text, record, index) => (
                        <EditableCell
                            value={text}
                            id="airCompany"
                            onChange={this.onCellChange(index, 'airCompany', record)}
                        />
                    )},
                {title: 'Delay', dataIndex: 'delay', key: 'delay',width: '12%',
                    render: (text, record, index) => (
                        <EditableCell
                            value={text}
                            id="delay"
                            onChange={this.onCellChange(index, 'delay', record)}
                        />
                    )},
                {
                    title: 'operation',
                    dataIndex: 'operation',
                    render: (text, record, index) => {
                        return (
                            this.props.products.size > 1 ?
                                (
                                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
                                        <a href="#">Delete</a>
                                    </Popconfirm>
                                ) : null
                        );
                    },
                }];
            this.rows.splice(0, this.rows.length);
            this.props.products.forEach((value, key, product) => {
                if (value.routeTo.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 ||
                    (!value.delay && this.props.inStockOnly) ||
                    (value.routeFrom.toLowerCase().indexOf(this.props.routeFrom.toLowerCase()) === -1)) {
                    return;
                }

                this.rows.push(this.span(value));
            });
            const pagination = {
                defaultPageSize: 5
            };
            tag =<div><Button className="editable-add-btn" onClick={this.handleAdd}>Добавить</Button>
                    <Table bordered dataSource={this.rows} columns={columns} pagination={pagination}/></div>;
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
                        placeholder="Откуда..."
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
                     placeholder="Куда..."
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
let AIRLINES = new Map([
    ['0',  {
        key:'0',
        routeTo: 'Samara',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }],
    ['1',  {
        key:'1',
        routeTo: 'Samara',
        routeFrom: 'St.Petersburg',
        flightTime: '1:00',
        boardName: '777',
        airCompany: 'Airoflot',
        delay: false
    }],
    ['2',  {
        key:'2',
        routeTo: 'Samara',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'Airoflot',
        delay: false
    }],
    ['3', {
        key:'3',
        routeTo: 'Moscow',
        routeFrom: 'Samara',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    }],
    ['4',  {
        key:'4',
        routeTo: 'Berlin',
        routeFrom: 'St.Petersburg',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }],
    ['5',  {
        key:'5',
        routeTo: 'St.Petersburg',
        routeFrom: 'Samara',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }],
    ['6',  {
        key:'6',
        routeTo: 'Kazan',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    }],
    ['7',  {
        key:'7',
        routeTo: 'Saratov',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }],
    ['8',  {
        key:'8',
        routeTo: 'Sochi',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }],
    ['9',  {
        key:'9',
        routeTo: 'Penza',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    }],
    ['10',  {
        key:'10',
        routeTo: 'Pskov',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }],
    ['11',  {
        key:'11',
        routeTo: 'Volgograg',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    }],
    ['12',  {
        key:'12',
        routeTo: 'Kaluga',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }],
    ['13',  {
        key:'13',
        routeTo: 'Barnaul',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }],
    ['14',  {
        key:'14',
        routeTo: 'Ufa',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: true}],
    ['15',  {
        key:'15',
        routeTo: 'Irkutsk',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }],
    ['16',  {
        key:'16',
        routeTo: 'Dubai',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }],
    ['17',  {
        key:'17',
        routeTo: 'London',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    }],
    ['18',  {
        key:'18',
        routeTo: 'Paris',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    }]
]);
/*var AIRLINES = [
    {
        key:0,
        routeTo: 'Samara',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:1,
        routeTo: 'Samara',
        routeFrom: 'St.Petersburg',
        flightTime: '1:00',
        boardName: '777',
        airCompany: 'Airoflot',
        delay: false
    },
    {
        key:2,
        routeTo: 'Samara',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'Airoflot',
        delay: false
    },
    {
        key:3,
        routeTo: 'Moscow',
        routeFrom: 'Samara',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        key:4,
        routeTo: 'Berlin',
        routeFrom: 'St.Petersburg',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:5,
        routeTo: 'St.Petersburg',
        routeFrom: 'Samara',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:6,
        routeTo: 'Kazan',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        key:7,
        routeTo: 'Saratov',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:8,
        routeTo: 'Sochi',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:9,
        routeTo: 'Penza',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        key:10,
        routeTo: 'Pskov',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:11,
        routeTo: 'Volgograg',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        key:12,
        routeTo: 'Kaluga',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:13,
        routeTo: 'Barnaul',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {key:14, routeTo: 'Ufa', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: true},
    {
        key:15,
        routeTo: 'Irkutsk',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:16,
        routeTo: 'Dubai',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:17,
        routeTo: 'London',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        key:18,
        routeTo: 'Paris',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:19,
        routeTo: 'New York',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:20,
        routeTo: 'Manchester',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:21,
        routeTo: 'Liverpool',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:22,
        routeTo: 'Barcelona',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        key:23,
        routeTo: 'Madrid',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boeing',
        airCompany: 'DubaiAir',
        delay: true
    }
];*/

ReactDOM.render(
    <FilterableProductTable products={AIRLINES}/>,
    document.getElementById('root')
);