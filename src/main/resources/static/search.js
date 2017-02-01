/**
 * Created by Rafael on 31.01.2017.
 */

class ProductRow extends React.Component {
    render() {
        var name = !this.props.product.delay ?
            this.props.product.routeTo :
            <span style={{color: 'red'}}>
        {this.props.product.routeTo}
      </span>;
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{name}</td>
                <td>{this.props.product.routeFrom}</td>
                <td>{this.props.product.flightTime}</td>
                <td>{this.props.product.boardName}</td>
                <td>{this.props.product.airCompany}</td>
                <td>{this.props.product.delay.toString()}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        var rows = [];
        var id = 0;
        //var lastCategory = null;
        this.props.products.forEach((product) => {
            if (product.routeTo.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!product.delay && this.props.inStockOnly)) {
                id++;
                return;
            }
            /*if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }*/
            rows.push(<ProductRow product={product} key={product.routeTo} id={id} />);
            //lastCategory = product.category;
        });
        return (
            <table>
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
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            this.filterTextInput.value,
            this.inStockOnlyInput.checked
        );
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref={(input) => this.filterTextInput = input}
                    onChange={this.handleChange}
                />
                <p>
                    <input
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
            inStockOnly: false
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    }

    render() {
        return (
            <div className="cl">
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
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
    {routeTo: 'Samara', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Moscow', routeFrom: 'Samara', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: true},
    {routeTo: 'Berlin', routeFrom: 'St.Petersburg', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'St.Petersburg', routeFrom: 'Samara', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Kazan', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: true},
    {routeTo: 'Saratov', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Sochi', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Penza', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: true},
    {routeTo: 'Pskov', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Volgograg', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: true},
    {routeTo: 'Kaluga', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Barnaul', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Ufa', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: true},
    {routeTo: 'Irkutsk', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Dubai', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'London', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: true},
    {routeTo: 'Paris', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'New-York', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Manchester', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Liverpool', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Barcelona', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: false},
    {routeTo: 'Madrid', routeFrom: 'Moscow', flightTime: '1:00', boardName: 'Boing', airCompany: 'DubaiAir', delay: true},
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);