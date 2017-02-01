/**
 * Created by Rafael on 31.01.2017.
 */
/**
 * Created by Rafael on 31.01.2017.
 */
var Table = antd.Table;
var Button = antd.Button;
var Input = antd.Input;
var Icon = antd.Icon;

class ProductRow extends React.Component {
    rend() {
        var name = !this.props.product.delay ?
            this.props.product.routeTo :
            <span style={{color: 'red'}}>
        {this.props.product.routeTo}
      </span>;
        return {
            routeTo: name,
            routeFrom: this.props.product.routeFrom,
            flightTime: this.props.product.flightTime,
            boardName: this.props.product.boardName,
            airCompany: this.props.product.airCompany,
            delay: this.props.product.delay.toString()
        };
        /*(
         <tr>
         /!*<td>{this.props.id}</td>*!/
         <td>{name}</td>
         <td>{this.props.product.routeFrom}</td>
         <td>{this.props.product.flightTime}</td>
         <td>{this.props.product.boardName}</td>
         <td>{this.props.product.airCompany}</td>
         <td>{this.props.product.delay.toString()}</td>
         </tr>
         );*/
    }
}

class ProductTable extends React.Component {
    render() {
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
        //var lastCategory = null;
        this.props.products.forEach((product) => {
            if (product.routeTo.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!product.delay && this.props.inStockOnly) ||
                product.routeFrom.toLowerCase().indexOf(this.props.routeFrom.toLowerCase()) === -1) {
                return;
            }
            console.log("ROUTE: " + product.routeTo);
            /*if (product.category !== lastCategory) {
             rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
             }*/
            var name = !product.delay ?
                product.routeTo : <span style={{color: 'red'}}>{product.routeTo}</span>;
            rows.push({
                routeTo: name,
                routeFrom: product.routeFrom,
                flightTime: product.flightTime,
                boardName: product.boardName,
                airCompany: product.airCompany,
                delay: product.delay.toString()
            });
            //lastCategory = product.category;
        });
        return (
            /*<table>
             <thead>
             <tr>
             <th>Number</th>
             <th>RouteTo</th>
             <th>RouteFrom</th>
             <th>flightTime</th>
             <th>boardName</th>
             <th>airCompany</th>
             <th>Delay</th>
             </tr>
             </thead>
             <tbody>{rows}</tbody>
             </table>*/
            <Table columns={columns} dataSource={rows}/>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        //this.handleChange2 = this.handleChange2.bind(this);
        this.state = {
            routeTo: '',
            routeFrom: '',
            check:false
        };
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type ==='checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name] : value});
        this.props.onUserInput(
            this.state.routeTo,
            this.state.routeFrom,
            this.state.check
        );
    }
    /*handleChange2(e) {
        this.setState({routeFrom : e.target.value})
        this.props.onUserInput(
            this.state.routeTo,
            this.state.routeFrom,
            this.inStockOnlyInput.checked
        );
    }*/

    emitEmpty = () => {
        this.filterTextInput.focus();
        this.setState({routeTo : ''})
        this.props.onUserInput(
            this.state.routeTo,
            this.state.routeFrom,
            this.inStockOnlyInput.checked
        );
    };


    render() {
        const suffix = this.props.filterText ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        return (
            <form>
                <Input
                    name="routeTo"
                    id="routeTo"
                    type="text"
                    placeholder="Откуда..."
                    prefix={<Icon type="user" />}
                    suffix={suffix}
                    value={this.props.filterText}
                    ref={(node) => this.filterTextInput = node}
                    onChange={this.handleChange}
                />
                <Input
                    name="routeFrom"
                    type="text"
                    placeholder="Куда..."
                    value={this.props.routeFrom}
                    ref={(node) => this.routeFrom = node}
                    onChange={this.handleChange}
                />
                <p>
                    <input
                        name="check"
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        ref={(input) => this.inStockOnlyInput = input}
                        onChange={this.handleChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
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


var PRODUCTS = [
    /*{category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
     {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
     {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
     {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
     {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
     {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},*/
    {
        routeTo: 'Samara',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
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
        boardName: 'Boing',
        airCompany: 'Airoflot',
        delay: false
    },
    {
        routeTo: 'Moscow',
        routeFrom: 'Samara',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        routeTo: 'Berlin',
        routeFrom: 'St.Petersburg',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'St.Petersburg',
        routeFrom: 'Samara',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Kazan',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        routeTo: 'Saratov',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Sochi',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Penza',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        routeTo: 'Pskov',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Volgograg',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        routeTo: 'Kaluga',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Barnaul',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {routeTo: 'Ufa', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: true},
    {
        routeTo: 'Irkutsk',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Dubai',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'London',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: true
    },
    {
        routeTo: 'Paris',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'New-York',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Manchester',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Liverpool',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Barcelona',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: false
    },
    {
        routeTo: 'Madrid',
        routeFrom: 'Moscow',
        flightTime: '1:00',
        boardName: 'Boing',
        airCompany: 'DubaiAir',
        delay: true
    }
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('root')
);