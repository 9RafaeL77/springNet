/**
 * Created by Rafael on 31.01.2017.
 */
/**
 * Created by Rafael on 31.01.2017.
 */
var Table = antd.Table;
var Input = antd.Input;
var Icon = antd.Icon;
var Switch = antd.Switch;

var Select = antd.Select;
const Option = Select.Option;




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
    }
}

class ProductTable extends React.Component {
    render() {
        var tag = '';
        if (this.props.filterText ===''){
            tag =  <div>ENTER</div>;
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
            //var lastCategory = null;

            this.props.products.forEach((product) => {
                if (product.routeTo.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!product.delay && this.props.inStockOnly) ||
                    product.routeFrom.toLowerCase().indexOf(this.props.routeFrom.toLowerCase()) === -1 ||
                    (this.props.filterText === '')) {
                    return;
                }
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

var stat = {
    routeTo: '',
    routeFrom: '',
    check: false
};

function setStat(key, value) {
    if (key === 'routeTo') {
        stat.routeTo = value;
    }
    if (key === 'routeFrom') {
        stat.routeFrom = value;
    }
    if (key === 'check') {
        stat.check = value;
    }
}


var dataCity = [];


var d = [];
var sel = '';

function setSel(e){
    sel = e;
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        var target = e.target;

        console.log("NAME: " + target.value);

        var value = (target.type === 'checkbox' ? target.checked : target.value);
        var name = target.name;
        setStat('routeTo', target.value);
        this.props.onUserInput(
            stat.routeTo,
            stat.routeFrom,
            stat.check
        );
        console.log("ROUTETO: " +stat.routeTo);
    }
    handleSelect(e){
        var data2 = [];
        console.log("CHANGE: " +e);
        console.log("LENGTH BEFORE: " +dataCity.length);
        dataCity.splice(0,dataCity.length);

        setSel(e);
        $.ajax({
            type: 'GET',
            contentType: 'text/plain',
            url: "http://localhost:8080/findCities?city=" + sel,
            dataType: 'application/json',
            statusCode: {
                200: function (city) {
                    /*JSON.parse(dataJson).response;*/
                    var dataJson = JSON.parse(city.responseText);

                    for(var i=0; i<dataJson.length; i++) {
                        console.log(i, dataJson[i]);
                        dataCity.push(<Option key={dataJson[i]}>{dataJson[i]}</Option>);
                        console.log("DATA " + dataCity[i]);
                        //data.map(d => <Option key={k}>{dataJson[k]}</Option>)
                    }
                    console.log("DATACITY " + {dataCity});
                }
            }
        });
        console.log("LENGTH after: " +dataCity.length);
}
    emitEmpty = () => {
        this.filterTextInput.focus();
        setStat('routeTo', '');
        this.props.onUserInput(
            stat.routeTo,
            stat.routeFrom,
            stat.check
        );
    };
    emitEmpty2 = () => {
        this.filterTextInput.focus();
        setStat('routeFrom', '');
        this.props.onUserInput(
            stat.routeTo,
            stat.routeFrom,
            stat.check
        );
    };
    isCheck = (e) => {
        setStat('check', e);
        this.props.onUserInput(
            stat.routeTo,
            stat.routeFrom,
            stat.check
        );
    };
    /*onSelect = (e) => {
        console.log("SELECT: "+e);
        setStat('routeTo', e);
        this.props.onUserInput(
            stat.routeTo,
            stat.routeFrom,
            stat.check
        );
    };*/


    render() {
        //const options = dataCity.map((temp) => <Option key={temp.value}>{temp.text}</Option>);

        console.log("SEL: " + sel);
        const suffix = this.props.filterText ?
            <Icon name="routeTo" type="close-circle" onClick={this.emitEmpty}/> : null;
        const suff = this.props.routeFrom ?
            <Icon name="routeFrom" type="close-circle" onClick={this.emitEmpty2}/> : null;
        return (
            <form>
                <p id="paragraph">
                    <Input
                        name="routeTo"
                        id="routeTo"
                        placeholder="Откуда..."
                        prefix={<Icon type="user"/>}
                        suffix={suffix}
                        value={this.props.filterText}
                        ref={(node) => this.filterTextInput = node}
                        onChange={this.handleChange}
                    />
                    <Select
                        combobox
                        value={sel}
                        placeholder="input search text"
                        style={{ width: 200 }}
                        defaultActiveFirstOption={false}
                        showArrow={true}
                        showSearch={true}
                        allowClear={true}
                        filterOption={false}
                        onChange={this.handleSelect}
                    >
                        {dataCity}
                    </Select>

                    <Input
                        name="routeFrom"
                        placeholder="Куда..."
                        prefix={<Icon type="user"/>}
                        suffix={suff}
                        value={this.props.routeFrom}
                        ref={(node) => this.routeFrom = node}
                        onChange={this.handleChange}
                    />
                    <Switch
                        onChange={this.isCheck}
                        checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>}/>
                    {' '}
                    Delay Airlines
                </p>
            </form>
        );
    }
}
{/*<Checkbox name="check" onChange={this.handleChange}>Delay Airlines</Checkbox>*/
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

var cities = [ 'ABA','Abeokuta','Abia','Abidjan',
    'Abobo','Abu Dhabi','Abu Ghurayb','Acapulco','Accra',
    'Ad Dammam','Ad Diwaniyah','Adalia','Adana','Addis Abeba',
    'Adelaide','Aden','Adiyaman','Agadair','Agadir',
    'Agra','Aguascalientes','Ahmadabad','Ahvaz','Aidin',
    'Ajmer','Akola','Al Basrah','Al Basrah Al Qadimah','Al Jadida',
    'Al Jazair','Al Kuwait','Al Mawsil Al Jadidah','Al Qahirah','Al Sharjah',
    'Al-sham','Albuquerque','Aleksandrovsk','Alep','Aleppo',
    'Alexandria','Algiers','Aligarh','Allahabad','Almaty',
    'Amagasaki','Amaravati','Amman','Amravati','Amritsar',
    'Amsterdam','An Najaf','Ananindeua','Ankara','Ansan',
    'Anshan','Antalya','Antananarivo','Antipolo','Antwerp',
    'Anyang','Aracaju','Arak','Arequipa','As Sulaymaniyah',
    'As Suways','Asanol','Asansol','Asgabat','Ash Shariqah',
    'Ashgabat','Asmara','Astrakhan','Astrida','Asuncion',
    'Athens','Aurangabad','Austin','Azadshahr','Azilal',
    'Bacolod','Bacolod City','Baghdad','Bahawalpur','Baile Atha Cliath',
    'Baku','Balikpapan','Baltimore','Bamako','Bandar Lampung',
    'Bandung','Bangalore','Bangkok','Bangui','Banjarmasin',
    'Baoding','Baoji','Baotou Shi','Barcelona','Bareli',
    'Barnaul','Barquisimeto','Barranquilla','Beijing Shi','Beira',
    'Beirut','Bejraburi','Bekasi','Belem','Belfast',
    'Belford Roxo','Belgaum','Belgrade','Belo Horizonte','Bengbu',
    'Benghazi','Benin','Benoni','Benxi','Berlin',
    'Bhatpara','Bhavnagar','Bhilai','Bhiwandi','Bhopal',
    'Bhubaneswar','Bikaner','Birmingham','Bishkek','Blantyre',
    'Bloemfontein','Boayan','Bogor','Bogota','Boksburg',
    'Bombay','Bor Sa`id','Bosna-sarai','Bouake','Brampton',
    'Brasilia','Brazzaville','Bremen','Brisbane','Bristol',
    'Bronx','Brooklyn','Brusa','Brussels','Bucaramanga',
    'Bucuresti','Budapest','Buenos Aires','Bulawayo','Burleigh School',
    'Bursa','Busan','Caesarea','Cagayan De Oro','Cagayan De Oro City',
    'Calabar','Calcutta','Calgary','Cali','Calicut',
    'Callao','Camayenne','Campinas','Campo Grande','Cancun',
    'Cangzhou','Cape Town','Caracas','Carrefour','Cartagena',
    'Casablanca','Ceara','Cebu','Cebu City','Central',
    'Chandaburi','Chandigarh','Changchun','Changde','Changsha',
    'Changwat Chachoengsao','Changwat Chaiyaphum','Changwat Chiang Mai','Changwat Chiang Rai','Changwat Chon Buri',
    'Changwat Chumphon','Changwat Kalasin','Changwat Krabi','Changwat Lampang','Changwat Loei',
    'Changwat Maha Sarakham','Changwat Nakhon Phanom','Changwat Nakhon Rat Sima','Changwat Nakhon Sawan','Changwat Nakhon Si Thammarat',
    'Changwat Nan','Changwat Nong Khai','Changwat Nonthaburi','Changwat Phatthalung','Changwat Phetchabun',
    'Changwat Phichit','Changwat Phitsanulok','Changwat Phra Nakhon Si Ayutthaya','Changwat Prachuap Khiri Khan','Changwat Rat Buri',
    'Changwat Roi Et','Changwat Sakon Nakhon','Changwat Samut Prakan','Changwat Sawankhalok','Changwat Songkhla',
    'Changwat Sukhothai','Changwat Suphan Buri','Changwat Surat Thani','Changwat Surin','Changwat Tak',
    'Changwat Trang','Changwat Uttaradit','Changwat Yala','Changwat Yasothon','Changzhou',
    'Charlotte','Cheboksary','Chelyabinsk','Cheng','Chengde',
    'Chengdu','Chiba','Chicago','Chiclayo','Chihuahua',
    'Chimahi','Chimalhuacan','Chisinau','Chittagong','Chitungwiza',
    'Chkalov','Chongqing','Chonju','Cibitoke','Ciudad De Montevideo',
    'Ciudad Guayana','Ciudad Juarez','Cleveland','Cluj','Cochabamba',
    'Coimbatore','Cologne','Colombo','Columbus','Constantine',
    'Constantinople','Contagem','Copenhagen','Cordoba','Cotonou',
    'Cuautitlan Izcalli','Cucuta','Cuiaba','Culiacan','Curitiba',
    'Cuttack','Da Huryee','Da Nang','Dadiangas','Daejeon',
    'Dagon','Dagu','Dakar','Dalian','Dallas',
    'Damascus','Dandong','Dang','Dar Es Salaam','Dasmarinas',
    'Datong','Davao','Davao City','Dehra Dun','Delhi',
    'Denver','Depok','Detroit','Dhaka','Dhanukha',
    'Diyarbakir','Djuschambe','Dongliao','Dortmund','Douala',
    'Dresden','Dubai','Dubayy','Dublin','Duisburg',
    'Duque De Caxias','Durango','Durban','Durgapur','Dusseldorf',
    'Ecatepec','Edessa','Edinburgh','Edmonton','Edo',
    'Eiko','El Mahalla El Kubra','El Paso','El-hodeidah','Elazig',
    'Enuga','Enugu','Erzerum','Esfahan','Eskisehir',
    'Essaouira','Essen','Eva Peron','Faisalabad','Faridabad',
    'Feira De Santana','Felicitas Julia','Fes','Fez','Fort Fureau',
    'Fort Worth','Foshan','Frankfurt','Frankfurt Am Main','Freetown',
    'Fresno','Fukuoka','Funabashi','Fushun','Fuxin',
    'Fuzhou','Gabouk','Gampheang Phet','Garoua','Gaziantep',
    'Gdansk','General Santos City','Geneve','Genoa','Genova',
    'Ghaziabad','Ghom','Gizeh','Glasgow','Goiania',
    'Gold Coast','Gomel','Gorakhpur','Goteborg','Grand Dakar',
    'Guadalajara','Guadalupe','Guangzhou','Guarulhos','Guatemala',
    'Guayaquil','Guilin','Guiyang','Gujranwala','Gulbarga',
    'Guntur','Guwahati','Gwalior','Ha Noi','Hachioji',
    'Hai Phong','Haikou','Hamadan','Hamah','Hamamatsu',
    'Hamburg','Hamhung','Hamilton','Hamitabat','Handan',
    'Hangzhou','Hanover','Haora','Harare','Harbin',
    'Hargeisa','Hargeysa','Havana','Hefei','Hegang',
    'Helsinki','Hengshui','Hengyang','Hermosillo','Himeji',
    'Hims','Hiroshima','Ho Chi Minh City','Hohhot','Hong Kong',
    'Houston','Huaibei','Huainan','Huaiyin','Hubli',
    'Hyderabad','Ibadan','Ichikawa','Ilorin','Indianapolis',
    'Indore','Ipoh','Iquitos','Irbil','Irkutsk',
    'Islamabad','Istanbul','Izhevsk','Izmir','Jabalpur',
    'Jaboatao','Jacksonville','Jaipur','Jaizan','Jakarta',
    'Jalandhar','Jammu','Jamnagar','Jamshedpur','Jerusalem',
    'Jhapa','Jiamusi','Jiangmen','Jiaojiang','Jiaozuo',
    'Jiaxing','Jibuti','Jiddah','Jilin','Jinan',
    'Jining','Joao Pessoa','Jodhpur','Johannesburg','Johor Bahru',
    'Joinville','Jos','Juarez','Juiz De Fora','Kabul',
    'Kaduna','Kagoshima','Kahriz','Kaifeng','Kailali',
    'Kaisaria','Kalat','Kaliningrad','Kalyan','Kampala',
    'Kananga','Kanazawa','Kano','Kanpur','Kansas City',
    'Kaohsiung','Karachi','Karaj','Kathmandu','Katmandu',
    'Katsina','Kawaguchi','Kawasaki','Kayseri','Kazan',
    'Kemerovo','Kerman','Kermanshah','Khabarovsk','Khabarovsk Vtoroy',
    'Kharkiv','Khartoum','Khemisset','Khenifra','Khouribga',
    'Khulna','Kiev','Kigale','Kigali','Kingston',
    'Kinshasa','Kirkuk','Kirov','Kisangani','Kitakyushu',
    'Klang','Kobe','Kocaeli','Kochi','Koeln',
    'Kolhapur','Konia','Konya','Kosovo','Kota',
    'Kota Kinabalu','Kousseri','Kowloon','Krakow','Krasnodar',
    'Krasnoyarsk','Kryvyy Rih','Kuala Lumpur','Kuching','Kumamoto',
    'Kumasi','Kunming','Kurashiki','Kwangju','Kyoto',
    'La Paz','La Plata','Lagos','Lahore','Lakhnau',
    'Langfang','Lanzhou','Larache','Las Pinas','Las Vegas',
    'Leeds','Leipzig','Leon','Leui','Liaoyang',
    'Libreville','Lilongwe','Lima','Lipetsk','Lisboa',
    'Liuzhou','Liverpool','Lobh Buri','Lodz','Lome',
    'London','Londrina','Long Beach','Lopez Mateos','Los Angeles',
    'Luancheng','Luanda','Lubumbashi','Ludhiana','Luoyang',
    'Lusaka','Lvov','Lyon','Maanshan','Maceio',
    'Madras','Madrid','Madurai','Maha Sarakam','Maiduguri',
    'Maisuru','Makasar','Makhachkala','Malaga','Malang',
    'Malatia','Malatya','Malegaon','Manado','Managua',
    'Manaus','Mandalay','Manila','Mansilingan','Maoming',
    'Maputo','Mar De Plata','Mar Del Plata','Maracaibo','Marrakech',
    'Marrakesh','Marseille','Mashhad','Matamoros','Matola',
    'Matsudo','Matsuyama','Mawlamyine','Mbuji-mayi','Mecca',
    'Medan','Medellin','Medina','Meerut','Meknes',
    'Melbourne','Memphis','Mendoza','Merida','Mersin',
    'Mesa','Mexicali','Mexico','Milan','Milwaukee',
    'Minsk','Mississauga','Mixco','Mogadishu','Mombasa',
    'Monrovia','Monterrey','Montevideo','Montreal','Moradabad',
    'Morelia','Moscow','Mosul','Mudanjiang','Multan',
    'Munich','Mwanza','Naberezhnyye Chelny','Naberezhnyye Morkvashi','Nagara Pathom',
    'Nagoya','Nagpur','Nairobi','Namangan','Nanchang',
    'Nanded','Nangi','Nanjing','Nanning','Nantong',
    'Naples','Napoli','Naradhivas','Nashville','Nasik',
    'Natal','Naucalpan','Neijiang','Nerima','New Orleans',
    'New Patna','New South Memphis','New York','Newcastle','Nezahualcoyotl',
    'Niamey','Niigata','Nikolaev','Ningbo','Nishinomiya',
    'Niteroi','Nizhniy Novgorod','North Kansas City','Nouakchott','Nova Iguacu',
    'Novokuznetsk','Novosibirsk','Nuremberg','Odesa','Ogun',
    'Oita','Okayama','Okene','Oklahoma City','Omdurman',
    'Omsk','Onicha','Onitsha','Orenburg','Orenburgskiy',
    'Orumiyeh','Osaka','Osasco','Oshogbo','Oslo',
    'Ottawa','Ouagadouga','Ouagadougou','Ouarzazate','Oyo',
    'Padang','Padumdhani','Palembang','Palermo','Panchiao',
    'Panshan','Panzhihua','Paris','Patna','Peking',
    'Penza','Pereira','Perm','Perth','Peshawar',
    'Pest','Petaling Jaya','Philadelphia','Phnom Penh','Phoenix',
    'Pietermaritzburg','Pimpri','Pingdingshan','Pointe-noire','Pontianak',
    'Port Elizabeth','Port Harcourt','Port-au-prince','Portland','Porto Alegre',
    'Poti','Poznan','Praha','Pretoria','Puebla',
    'Pune','Puyang','Pyongyang','Qingdao','Qinhuangdao',
    'Qiqihar','Qom','Quebec','Queretaro','Quetta',
    'Quezon','Quilmes','Quito','Rabat','Raipur',
    'Rajkot','Rajpur','Rajshahi','Ranchi','Rasht',
    'Rawalpindi','Recife','Reunion','Reynosa','Ribeirao Preto',
    'Riga','Rio De Janeiro','Riyadh','Rome','Rongcheng',
    'Rosario','Rostov-na-donu','Rotterdam','Rupandehi','Ryazan',
    'Sacramento','Safi','Sagamihara','Saharanpur','Saint Petersburg',
    'Sakai','Sale','Salta','Saltillo','Salvador',
    'Samara','San Antonio','San Diego','San Francisco','San Jose',
    'San Juan','San Luis Potosi','San Miguel De Tucuman','San Nicolas De Los Garza','San Pedro Sula',
    'San Salvador','Sanaa','Santa Cruz De La Sierra','Santa Fe','Santa Marta',
    'Santiago','Santiago De Cuba','Santo Andre','Santo Domingo','Sao Bernardo Do Campo',
    'Sao Goncalo','Sao Joao De Meriti','Sao Jose Dos Campos','Sao Luis','Sao Paulo',
    'Sapporo','Sar-e Pol','Saratov','Sargodha','Seattle',
    'Selam','Semarang','Sendai','Seoul','Settat',
    'Sevilla','Shah Alam','Shanghai','Shantou','Shaoguan',
    'Shaoyang','Sharjah','Shashi','Sheffield','Shenyang',
    'Shenzhen','Shihezi','Shiliguri','Shiraz','Shizuoka',
    'Sholapur','Sialkot','Singapore','Skopje','Sofia',
    'Sokoto','Songnam','Sorocaba','South Boston','Soweto',
    'Spetsgorodok','Srinagar','Stockholm','Stuttgart','Suigen',
    'Sultanah','Surabaya','Surakarta','Surat','Suwon',
    'Suzhou','Sydney','Tabriz','Taegu','Taejon',
    'Taguig','Taian','Taichung','Tainan','Taipei',
    'Taiyuan','Taizhou','Tandjile','Tanger','Tangerang',
    'Tanggu','Tangier','Tangshan','Taounate','Taroudannt',
    'Tashkent','Taza','Tbilisi','Tegucigalpa','Tehran',
    'Tembisa','Teresina','Thana','Thane','The Hague',
    'Thiruvananthapuram','Tianjin','Tijuana','Tipaza','Tiruchchirappalli',
    'Tirunelveli','Tlalnepantla','Tlaquepaque','Tokyo','Toluca',
    'Tolyatti','Tomsk','Torino','Toronto','Torreon',
    'Tripoli','Trujillo','Tucson','Tucuman','Tula',
    'Tunes','Turin','Tuxtla Gutierrez','Tyumen','Uberlandia',
    'Ufa','Uijongbu','Ujjain','Ulhasnagar','Ulyanovsk',
    'Umm Durman','Unguja Ukuu','Urfa','Urumqi','Ussuriyskiy',
    'Utsunomiya','Vadodara','Valencia','Vancouver','Varanasi',
    'Vaucluse','Veracruz','Vereeniging','Vijayawada','Vilnius',
    'Virginia Beach','Visakhapatnam','Vladivostok','Volgograd','Voronezh',
    'Wahran','Wahren','Warab','Warangal','Warri',
    'Warsaw','Washington','Welkom','Wenzhou','Wien',
    'Winnipeg','Wroclaw','Wuhan','Wuhu','Wuxi',
    'Xiamen','Xian','Xiangfan','Xianyang','Xingtai',
    'Xining','Xinxiang','Xinyang','Xuchang','Xuzhou',
    'Yancheng','Yangzhou','Yantai','Yaounde','Yaroslavl',
    'Yazd','Yekaterinburg','Yerevan','Yichang','Yinchuan',
    'Yingkou','Yogyakarta','Yokohama','Yokosuka','Yongkang',
    'Yono','Yueyang','Yunfu','Zagreb','Zahedan',
    'Zamboanga','Zamboanga City','Zapopan','Zaragoza','Zaria',
    'Zhangjiakou','Zhangzhou','Zhanjiang','Zhengzhou','Zhenjiang',
    'Zhuhai','Zhuzhou','Zibo','Zigong','Zunyi'];

var AIRLINES = [
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
    <FilterableProductTable products={AIRLINES}/>,
    document.getElementById('root')
);