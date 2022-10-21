import React from 'react';
import "../style/home.css";
import { Divider } from 'primereact/divider';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { DataScroller } from 'primereact/datascroller';


function tableDocs(data) {
    return(
        <>
            <div class="container">
                <div class="row">
                    <div class="col-4">
                    {data.url}
                    </div>

                    <div class="col-3">
                    {data.ip}
                    </div>

                    <div class="col">
                    {data.day}
                    </div>

                    <div class="col">
                    {data.month}
                    </div>

                    <div class="col-3">
                    {data.time}
                    </div>
                </div>
            </div>
        </>
    )
}
const Home = () => {

    const [docs, setDocs] = React.useState([]);

    React.useEffect(() => {
        fetch("http://localhost:1337/data")
          .then((res) => res.json())
          .then((data) => setDocs(data));
    
      }, []);

    return (
        <>
            <nav class="navbar bg-light">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">Bthloggen</span>
                </div>
            </nav>

            
        
            <div className='content bg-light'>
                
                <div className="datascroller-demo">
                    <div className="card">
                        <DataScroller value={docs} itemTemplate={tableDocs} rows={500} inline scrollHeight="480px" header="Url Ip Day Month Time" />
                    </div>
                </div>
            </div>

            <Divider />

                <footer>
                    <div className='footer'>
                        <p>Follow me on</p>
                        <a href='https://www.facebook.com/mr.gmiak.dv/'><i className="pi pi-facebook" ></i></a>
                        <a href='https://www.instagram.com/gmiak.dv/'><i className="pi pi-instagram" ></i></a>
                        <a href='https://twitter.com/gmiak_dv'><i className="pi pi-twitter" ></i></a>
                        <a href='https://github.com//gmiak'><i className="pi pi-github" ></i></a>
                        <p className='copyright'>2022 &copy; gmiak.dv, All rights reserved.</p>
                    </div>
                </footer>
        
        </>
    );
}
export default Home;