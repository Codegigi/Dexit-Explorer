import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const fs = require('fs').promises;

export default function Fe() {
  const [filepath, setFilepath] = useState("");
  const [rarity, setRarity] = useState("");
  const [woID, setWoID] = useState("");
  const [collection_name, setCollection_name] = useState("");
  const [trait_name, setTrait_name] = useState("");

  const f1 = (Pfilepath, Prarity, PwoID, Pcollection_name, Ptrait_name) => {

    var Ffilepath = Pfilepath
    var Frarity = Prarity
    var FwoID = PwoID
    var Fcollection_name = Pcollection_name
    var Ftrait_name = Ptrait_name

    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    // data.append('filepath', fs.createReadStream(Ffilepath));
    // data.append('filepath', fs.createReadStream(picturePreview));
    data.append('rarity', Frarity);
    data.append('woID', FwoID);
    data.append('collection_name', Fcollection_name);
    data.append('trait_name', Ftrait_name);
    for (var i = 0; i < picturePreview.length; i++) {
        console.log("pictures", picturePreview[i]);
        data.append("filepath", picturePreview[i]);
      }
    var config = {
      method: 'post',
      url: 'http://192.168.1.56:4000/api/upload',
    //   headers: {
    //     ...data.getHeaders()
    //   },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  async function submitHandle() {

    f1(filepath, rarity, woID, collection_name, trait_name);

    // axios({
    //     method: 'post',
    //     url: 'http://192.168.1.56:4000/abcd',
    //     data: {
    //         a: a,
    //         b: b,
    //         c:c,
    //         d:d
    //     }
    //   }).then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });;

  }

  const [picturePreview, setpicturePreview] = useState([])

  function uploadPicture(e) {
    console.log("event: ", e.target.files)
  
  setpicturePreview(e.target.files)
  
    // setpicturePreview({
    //   /* contains the preview, if you want to show the picture to the user
    //     you can access it with this.state.currentPicture
    // */
    //   picturePreview: URL.createObjectURL(e.target.files[0]),
    //   /* this contains the file we want to send */
    //   pictureAsFile: e.target.files[0]
    // })
    console.log(picturePreview)
  };

  return (
    <div>
      <h1>Please enter details to hit the upload API endpoint</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="">woID</label>
          <input
            type="text"
            onChange={(e) => setWoID(e.target.value)}
            name=""
            id=""
          />
        </div>
        <div>
          <label htmlFor="">collection_name</label>
          <input
            type="text"
            onChange={(e) => setCollection_name(e.target.value)}
            name=""
            id=""
          />
        </div>
        <div>
          <label htmlFor="">trait_name</label>
          <input
            type="text"
            onChange={(e) => setTrait_name(e.target.value)}
            name=""
            id=""
          />
        </div>

        <div>
          <label htmlFor="">filepath</label>
          <input type="file" name="image" onChange={(e) => uploadPicture(e)} /> {/*change this with filepath and setFilepath*/}
        </div>

        <div>
          <label htmlFor="">rarity</label>
          <input
            type="text"
            onChange={(e) => setRarity(e.target.value)}
            name=""
            id=""
          />
        </div>

      </form>
      <button onClick={submitHandle}>Click to call upload API endpoint</button>
    </div>
  );
}