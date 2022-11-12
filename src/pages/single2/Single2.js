import axios from "axios";
import "./single2.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import cors from "cors";
const Single2 = ({ item, onChange }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { setData, data, loading, error } = useFetch(
    `/properties/find/${path}`
  );

  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });

    if (typeof onChange === "function") {
      onChange(e.target.value);
    }
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div
          style={{
            padding: 14,
            float: "right",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <button
            style={{
              backgroundColor: "#008000",
              border: "none",
              padding: "12px",
              color: "#fff",
            }}
          >
            <Link to={`/properties/editproperties`} style={{ color: "#fff" }}>
              Edit Properties
            </Link>{" "}
          </button>
        </div>
        {loading ? (
          "Loading"
        ) : (
          <>
            <div className="item" key={data._id}>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> Name:</strong>

                  <input
                    placeholder="hi"
                    onChange={(e) => handle(e)}
                    value={data.name}
                    type="text"
                    name="name"
                  />
                </span>
                <br></br>
                <span className="itemValue"></span>
              </div>

              <div className="detailItem">
                <span className="itemKey">
                  <strong> Address:</strong>
                </span>
                <br></br>
                <input
                  placeholder="hi"
                  onChange={(e) => handle(e)}
                  value={data.address}
                  type="text"
                  name="address"
                />
              </div>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> City:</strong>
                </span>
                <br></br>
                <input
                  placeholder="hi"
                  onChange={(e) => handle(e)}
                  value={data.city}
                  type="text"
                  name="city"
                />
              </div>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> Distance:</strong>
                </span>
                <br></br>
                <input
                  placeholder="hi"
                  onChange={(e) => handle(e)}
                  value={data.distance}
                  type="text"
                  name="distance"
                />
              </div>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> Details:</strong>
                </span>
                <br></br>
                <input
                  placeholder="hi"
                  onChange={(e) => handle(e)}
                  value={data.detail}
                  type="text"
                  name="detail"
                />
              </div>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> Description:</strong>
                </span>
                <br></br>
                <input
                  placeholder="hi"
                  onChange={(e) => handle(e)}
                  value={data.desc}
                  type="text"
                  name="desc"
                />
              </div>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> Price:</strong>
                </span>
                <br></br>
                <input
                  placeholder="hi"
                  onChange={(e) => handle(e)}
                  value={data.cheapestPrice}
                  type="text"
                  name="cheapestPrice"
                />
              </div>

              <div className="detailItem">
                <span className="itemKey">
                  <strong> Featured:</strong>
                </span>
                <br></br>
                <input
                  placeholder="hi"
                  onChange={(e) => handle(e)}
                  value={data.featured}
                  type="text"
                  name="featured"
                />
              </div>
              <div>
                <button>Add</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Single2;
