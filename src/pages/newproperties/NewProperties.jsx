import "./newProperties.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { propertiesInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Modal from "../modal/Modal";

const NewProperties = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          setLoading(true);
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dftygokow/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newproperties = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post(
        "https://hybridhome-api.herokuapp.com/api/properties",
        newproperties
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add Property</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {propertiesInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <button onClick={handleClick} className="primaryBtn">
                {loading ? <>Loading..</> : <>Send</>}
              </button>
              {isOpen && <Modal setIsOpen={setIsOpen} />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProperties;
