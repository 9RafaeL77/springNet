/**
 * Created by Rafael on 18.02.2017.
 */

var Select = antd.Select;
const Option = Select.Option;
var table = null;

//let resourceMap = new Map();
function getResource(url, t, callback) {
    let resourceMap = new Map();
    //resourceMap.clear();
    $.ajax({
        type: 'GET',
        contentType: 'text/plain',
        url: "http://localhost:8080//" + url,
        dataType: 'application/json',
        statusCode: {
            200: function (data) {
                var dataJson = JSON.parse(data.responseText);
                dataJson.forEach((product) => {
                    var isNew = false;
                    var arr = {product, isNew};
                    resourceMap.set(product.id, arr);
                });
                callback(resourceMap)

            }
        }
    })
}

/*let routeMap = new Map();
function getRoute() {
    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open('GET', 'http://localhost:8080//getAllRoute', false);
    request.onreadystatechange = function () {
        if ((request.readyState === 4) && (request.status === 200)) {
            var dataJson = JSON.parse(request.responseText);
        }
        dataJson.forEach((product) => {
            var isNew = false;
            var arr = {product, isNew};
            routeMap.set(product.id, arr);
        })
    };
    request.send();
}
getRoute();*/
/*
let airlineMap = new Map();
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
            var arr = {product, isNew};
            airlineMap.set(product.id, arr);
        })
    };
    request.send();
}
getAirline();

let BoardMap = new Map();
function getBoard() {
    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open('GET', 'http://localhost:8080//getAllBoard', false);
    request.onreadystatechange = function () {
        if ((request.readyState === 4) && (request.status === 200)) {
            var dataJson = JSON.parse(request.responseText);
        }
        dataJson.forEach((product) => {
            var isNew = false;
            var arr = {product, isNew};
            BoardMap.set(product.id, arr);
        })
    };
    request.send();
}
getBoard();*/

class SelectTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(filterText) {
        var t = this;
        if (filterText === "route") {
            getResource("getAllRoute",t, function (resourceMap) {
                table = <FilterableRouteTable products={resourceMap}/>;
                t.forceUpdate();
            });
            //table = <FilterableRouteTable products={resourceMap}/>;
            //this.forceUpdate();
        }
        if (filterText === "board") {
            getResource("getAllBoard",t, function (resourceMap) {
                table = <FilterableBoardTable products={resourceMap}/>;
                t.forceUpdate();
            });
        }
        if (filterText === "airline") {
            getResource("getAllAirline",t, function (resourceMap) {
                table = <FilterableAirlineTable products={resourceMap}/>;
                t.forceUpdate();
            });
        }
    }

    render() {
        return (
            <div>
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a table"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="route">Route</Option>
                    <Option value="board">Board</Option>
                    <Option value="airline">Airline</Option>
                </Select>
                {table}
            </div>
        );
    }
}

ReactDOM.render(
    <SelectTable/>
    , document.getElementById('root'));
