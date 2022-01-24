import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Rahul() {
  const [a, seta] = useState("");
  const [b, setb] = useState("");
  const [c, setc] = useState("");
  const [d, setd] = useState("");
  const[pictures,setpicturePreview]=useState([])

  useEffect(() => {
    return () => {};
  }, []);

  async function submitt() {
    console.log("datatta", pictures);
   
    const formData=new FormData();
    for (var i = 0; i < pictures.length; i++) {
        console.log("pictures",pictures[i])
        formData.append('filepath', pictures[i])
    }
formData.append("a",a)
    axios.post('http://192.168.1.56:4000/upload', formData)
    .then(res => {
        console.log("resss",res)

    })
    // axios({
    //     method: 'post',
    //     url: 'http://192.168.1.56:4000/upload',
    //     data: {
    //         // a: a,
    //         // b: b,
    //         // c:c,
    //         // d:d
    //         files:formData
    //     }
    //   }).then(function (response) {
    //     console.log("res",response);
    //   })
    //   .catch(function (error) {
    //     console.log("err",error);
    //   });;
    
  }

 function uploadPicture  (e) {
     console.log("eeeee",e.target.files)
    setpicturePreview(e.target.files)
    // console.log(picturePreview)
};
  return (
    <div>
      <h1>hello</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="">a</label>
          <input
            type="text"
            onChange={(e) => seta(e.target.value)}
            name=""
            id=""
          />
        </div>
        <div>
          <label htmlFor="">b</label>
          <input
            type="text"
            onChange={(e) => setb(e.target.value)}
            name=""
            id=""
          />
        </div>
        <div>
          <label htmlFor="">c</label>
          <input
            type="text"
            onChange={(e) => setc(e.target.value)}
            name=""
            id=""
          />
        </div>
        <div>
          <label htmlFor="">d</label>
          <input
            type="text"
            onChange={(e) => setd(e.target.value)}
            name=""
            id=""
          />
        </div>
        <div>
        <input type="file" name="image" onChange={(e)=>uploadPicture(e)}/>
        </div>
      </form>
      <button onClick={submitt}>click</button>
    </div>
  );
}
