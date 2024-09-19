import React from "react";
import { useNavigate } from "react-router-dom";
import {Box} from "zmp-ui";
import "../../css/detailhome/newform.css"; 

const items = [
  {
    id: 1,
    image: "./images/newform/image-1.jpg",
    note: "App-Exclusive Drops",
    title: "SNEAKERS OF THE WEEK",
    text: "Shop"
  },
  {
    id: 2,
    image: "./images/newform/image-2.jpg",
    note: "",
    title: "PEGASUS 41",
    text: "Customise"
  },
  {
    id: 3,
    image: "./images/newform/image-3.jpg",
    note: "Just In",
    title: "PEGASUS 41 'PREQUEL'",
    text: "Exploe"
  },
];

const NewForm = () => {
  const navigate = useNavigate();

  const handleNewForm = () => {
    navigate("/home/newform");
  }
  return (
    <div className="new-form-page">
      <Box className="page-header-new-form">
        <div className="title-new-form">
          <img className="img-new-form" src="./images/icon/icon-new-form.png" alt="" />
          <h1 className="title-header-new-form">New Form Nike</h1>
        </div>
        <a href="#view-all" className="view-all">
          View All
        </a>
      </Box>
      <div className="item-body-new-form">
        {items.map((item) => (
          <div key={item.id} className="item-card-new-form" onClick={() => handleNewForm()}>
            <div className="item-content-new-form">
              { item.note != null ?<p className="item-note-new-form">{item.note}</p>
                                  : ""
              }
              <h2 className="item-title-new-form">{item.title}</h2>
              <button className="item-button-new-form">{item.text}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewForm;
