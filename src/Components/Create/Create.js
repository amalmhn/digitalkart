import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Store/AuthContext';
import { FirebaseContext } from '../../Store/FirebaseContext';
import './Create.css'

function Create() {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [ram, setRam] = useState('');
  const [memory, setMemory] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [ramError, setRamError] = useState('');
  const [memoryError, setMemoryError] = useState('');
  const [brandError, setBrandError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [valid, setValid] = useState('');
  const [valid2, setValid2] = useState('');
  const [option, setOption] = useState(false);

  const {user} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  const history = useHistory()

  const date = new Date()



  const handleSubmit=(e)=>{

    e.preventDefault()

    if((name==="")){
      setNameError("Field should not be empty")
      var nameError1 = true;
  }
  if((price==="")){
    setPriceError("Field should not be empty")
    var priceError1 = true;
}
if((ram==="")){
  setRamError("Field should not be empty")
  var ramError1 = true;
}
if((memory==="")){
  setMemoryError("Field should not be empty")
  var memoryError1 = true;
}
if((brand==="")){
  setBrandError("Field should not be empty")
  var brandError1 = true;
}
if((description==="")){
  setDescriptionError("Field should not be empty")
  var descError1 = true;
}

if(nameError1===true || priceError1===true || ramError1===true || memoryError1===true || brandError1===true || descError1===true){
  setValid("Invalid Details!")
  setInterval(function(){ window.location.reload() }, 3000);
}else{

    setOption(true);
    setValid2("Submitting the product details, please wait...")
    
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          ram,
          memory,
          brand:brand.toUpperCase(),
          description,
          url,
          userId:user.uid,
          createdAt: date.toDateString(),
          
        }).then(()=>{
          history.push("/")
          window.location.reload()
        })
        
      })
    })
  }
}
    return (
        <div>
        
        
          {user && user.uid==="SjE0GeIdoUbvMpTV9PE5ugHqyaH3" ? <div className="centerDiv1">
            
              <label htmlFor="fname">Name</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                name="Name"
                required
              />
              <br /><span className="errorSpan"> {nameError}</span><br/>
              <label htmlFor="fname">Category</label>
              <br /><span className="errorSpan"></span>
              <select name="category" className="categorySelect" 
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              >
                <option value="Select an option">Select an option</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Smartwatches">Smartwatches</option>
              </select>
              <br /> <br/>
              <label htmlFor="fname">Price</label>
              <br />
              <input className="input" type="number" id="price"
              value={price}
              onChange={(e)=>{setPrice(e.target.value)}}
              name="Price" />
              <br />
              <span className="errorSpan">{priceError}</span>
              
              <br/>
              <label htmlFor="fname">Color</label>
              <br />
              <input className="input" type="text"
              value={ram}
              onChange={(e)=>{setRam(e.target.value)}}
              id="ram" name="Price" />
              <br />
              <span className="errorSpan">{ramError}</span>
              
              <br/>
              <label htmlFor="fname">Memory</label>
              <br />
              <input className="input" type="text"
              value={memory}
              onChange={(e)=>{setMemory(e.target.value)}}
              id="memory" name="Price" />
              <br />
              <span className="errorSpan">{memoryError}</span>
              
              <br/>
              <label htmlFor="fname">Brand</label>
              <br />
              <input className="input" type="text"
              value={brand}
              onChange={(e)=>{setBrand(e.target.value)}}
              id="brand" name="Price" />
              <br />
              <span className="errorSpan">{brandError}</span>
              
            <br />
            <label htmlFor="fname">Description</label>
              <br />
              <input className="input" type="text"
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
              id="desc" name="Price" />
              <br />
              <span className="errorSpan">{descriptionError}</span>
              <br/>
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
            
              <br />
              <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
              <br />
              <button onClick={handleSubmit} className="uploadBtn btn btn-success">Upload and Submit</button>
            
            {option ? <span className="loadingSpan"><strong>{valid2}</strong></span> :<span className="errorSpan">{valid}</span>}
          </div> : <div className="userSpanCreate">
            <br/><br/><br/><br/><br/>
            <span><strong>Access only for Admin</strong></span>
            <br/><br/><br/><br/><br/>
            </div>}
        
        </div>
    )
}

export default Create
