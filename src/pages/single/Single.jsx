import "./single.scss";
import { Link } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";
import {useLocation} from "react-router-dom"
const Single = ({item}) => {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/users/${path}`);

  return (
  
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
       <div style={{padding: 14, float: "right", marginTop: 20, marginBottom: 20}}>
        <button style={{backgroundColor: "#008000", border: "none", padding: "12px", color: "#fff"}}>
          <Link to={`/users/edit`}  style={{color: "#fff"}}>Edit</Link> </button>
       </div>
                {loading ? (
       "Loading"
     ) : (
       <>
        
         
                     <div className="item" key={data._id}>
                <div className="detailItem">
                  <span className="itemKey"><strong> Name:</strong></span>
                  <br></br>
                  <span className="itemValue">{data.username}</span>
                </div>
            
              <div className="detailItem">
                  <span className="itemKey"><strong> Email:</strong></span>
                  <br></br>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"><strong> Phone:</strong></span>
                  <br></br>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"><strong> City:</strong></span>
                  <br></br>
                  <span className="itemValue">{data.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"><strong> Country:</strong></span>
                  <br></br>
                  <span className="itemValue">{data.country}</span>
                </div>
               
           </div>
    
      </>
     )}
</div>
</div>
  
 );
};

export default Single;
