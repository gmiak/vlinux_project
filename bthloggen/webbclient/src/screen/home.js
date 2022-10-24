import { Component } from 'react';
import "../style/home.css";
import { Divider } from 'primereact/divider';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataScroller } from 'primereact/datascroller';

const docRoutes = require("../routes/routes");
const dbwebbValidator = false;

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docs: [],
            searchBarValueIP: "",
            searchBarValueURL: "",
            searchBarValueDAY: "",
            searchBarValueMONTH: "",
            searchBarValueTIME: "",
            searchBarValueDAYTIME: "",
            searchBarValueMONTHDAYTIME: "",
            url: docRoutes.getData(),
        };
    }

    async componentDidMount() {
        this.refreshDocList();
    }

    async refreshDocList() {
        fetch(this.state.url)
            .then((res) => res.json())
            .then((data) => this.setState(this.state.docs = data));
    }

    tableDocs(data) {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            {data.url}
                        </div>

                        <div className="col-3">
                            {data.ip}
                        </div>

                        <div className="col">
                            {data.day}
                        </div>

                        <div className="col">
                            {data.month}
                        </div>

                        <div className="col-3">
                            {data.time}
                        </div>
                    </div>
                </div>
            </>
        );
    }
    render() {
        return (
            <>
                <nav className="navbar bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">Bthloggen</span>
                    </div>
                </nav>
                <div className='filters'>
                    <h6>Filters</h6>
                    <Divider />
                    <div className='space'></div>
                    {/*search bar for using ipas key*/}
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <form onSubmit={async (event) => {
                                        event.preventDefault();
                                        await this.setState({
                                            url: docRoutes.getDataByIP(this.state.searchBarValueIP)
                                        });
                                        this.refreshDocList();
                                    }}>
                                        <label htmlFor="title">Search by ip </label>
                                        <p>
                                            <input type="text" className="\
                                            form-control" id="ex3" placeholder="3.55.39.167"
                                            value={this.state.searchBarValueIP}
                                            onChange={async (event) => {
                                                this.setState({
                                                    searchBarValueIP: event.target.value
                                                });
                                            }} />
                                        </p>
                                        <p><input type="submit" value="submit ip" /></p>
                                    </form>
                                </div>

                                <div className="col-6">
                                    <form onSubmit={async (event) => {
                                        event.preventDefault();
                                        await this.setState({
                                            url: docRoutes.
                                                getDataByUrl(this.state.searchBarValueURL)
                                        });
                                        this.refreshDocList();
                                    }}>
                                        <label htmlFor="title">Search by url </label>
                                        <p>
                                            <input type="text" className="\
                                            form-control" id="ex3" placeholder="http://www.bing.com"
                                            value={this.state.searchBarValueURL}
                                            onChange={async (event) => {
                                                this.setState({
                                                    searchBarValueURL: event.target.value
                                                });
                                            }} />
                                        </p>
                                        <p><input type="submit" value="submit url" /></p>
                                    </form>
                                </div>
                            </div>
                            <div className='space'></div>
                            <div className="row">
                                <div className="col-3">
                                    <form onSubmit={async (event) => {
                                        event.preventDefault();
                                        await this.setState({
                                            url: docRoutes.
                                                getDataByDay(this.state.searchBarValueDAY)
                                        });
                                        this.refreshDocList();
                                        console.log(this.state.searchBarValueDay);
                                    }}>
                                        <label htmlFor="title">Search by day </label>
                                        <p>
                                            <input type="text" className="\
                                            form-control" id="ex1" placeholder="12"
                                            value={this.state.searchBarValueDAY}
                                            onChange={async (event) => {
                                                this.setState({
                                                    searchBarValueDAY: event.target.value
                                                });
                                            }} />
                                        </p>
                                        <p><input type="submit" value="submit day" /></p>
                                    </form>
                                </div>

                                <div className="col-3">
                                    <form onSubmit={async (event) => {
                                        event.preventDefault();
                                        await this.setState({
                                            url: docRoutes.getDataByMonth(
                                                this.state.searchBarValueMONTH)
                                        });
                                        this.refreshDocList();
                                    }}>
                                        <label htmlFor="title">Search by month </label>
                                        <p>
                                            <input type="text" className="\
                                            form-control" id="ex1" placeholder="Aug"
                                            value={this.state.searchBarValueMONTH}
                                            onChange={async (event) => {
                                                this.setState({
                                                    searchBarValueMONTH: event.target.value
                                                });
                                            }} />
                                        </p>
                                        <p><input type="submit" value="submit month" /></p>
                                    </form>
                                </div>

                                <div className="col-3">
                                    <form onSubmit={async (event) => {
                                        event.preventDefault();
                                        await this.setState({
                                            url: docRoutes.
                                                getDataByTime(this.state.searchBarValueTIME)
                                        });
                                        this.refreshDocList();
                                    }}>
                                        <label htmlFor="title">Search by time </label>
                                        <p>
                                            <input type="text" className="\
                                            form-control" id="ex1" placeholder="13 or 13:37"
                                            value={
                                                this.state.searchBarValueTIME
                                            }
                                            onChange={async (event) => {
                                                this.setState({
                                                    searchBarValueTIME: event.target.value
                                                });
                                            }} />
                                        </p>
                                        <p><input type="submit" value="submit time" /></p>
                                    </form>
                                </div>
                            </div>
                            <div className='space'></div>
                            <div className="row">
                                <div className="col-6">
                                    <form onSubmit={async (event) => {
                                        event.preventDefault();
                                        await this.setState({
                                            url: docRoutes.
                                                getDataByDayTime(
                                                    this.state.searchBarValueDAYTIME)
                                        });
                                        this.refreshDocList();
                                    }}>
                                        <label htmlFor="title">Search by day/time </label>
                                        <p>
                                            <input type="text" className="\
                                            form-control" id="\
                                            ex3" placeholder="12&time=13 or 12&time=13:37"
                                            value={
                                                this.state.searchBarValueDAYTIME
                                            }
                                            onChange={async (event) => {
                                                this.setState({
                                                    searchBarValueDAYTIME: event.target.value
                                                });
                                            }} />
                                        </p>
                                        <p><input type="submit" value="submit day/time" /></p>
                                    </form>
                                </div>

                                <div className="col-6">
                                    <form onSubmit={async (event) => {
                                        event.preventDefault();
                                        await this.setState({
                                            url: docRoutes.getDataByMonthDayTime(
                                                this.state.searchBarValueMONTHDAYTIME
                                            )
                                        });
                                        this.refreshDocList();
                                    }}>
                                        <label htmlFor="title">Search by month/day/time </label>
                                        <p>
                                            <input type="text" className="\
                                            form-control" id="ex3" 
                                            placeholder="Aug&day=12&time=13 or Aug&day=13&time=13:37"
                                            value={this.state.searchBarValueMONTHDAYTIME}
                                            onChange={async (event) => {
                                                this.setState({
                                                    searchBarValueMONTHDAYTIME: event.target.value
                                                });
                                            }} />
                                        </p>
                                        <p><input type="submit" value="submit m/d/t" /></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='space'></div>
                    <Divider />
                </div>
                <div className='content bg-light'>
                    <div className="datascroller-demo">
                        <div className="card">
                            <DataScroller value={this.state.docs} className="\
                            sep" itemTemplate={this.tableDocs} rows={500} id="\
                            sep" inline scrollHeight="480px" header="Url Ip Day Month Time" />
                        </div>
                    </div>
                </div>
                <Divider />
                <footer>
                    <div className='footer'>
                        <p>Follow me on</p>
                        <a href='https://www.facebook.com/mr.gmiak.dv/'>
                            <i className="pi pi-facebook" ></i>
                        </a>
                        <a href='https://www.instagram.com/gmiak.dv/'>
                            <i className="pi pi-instagram" ></i>
                        </a>
                        <a href='https://twitter.com/gmiak_dv'>
                            <i className="pi pi-twitter" ></i>
                        </a>
                        <a href='https://github.com//gmiak'><i className="pi pi-github" ></i></a>
                        <p className='copyright'>2022 &copy; gmiak.dv, All rights reserved.</p>
                    </div>
                </footer></>
        );
    }
}
dbwebbValidator ? DataScroller() : console.log("Pass");
dbwebbValidator ? Divider() : console.log("Pass");
export default Home;
