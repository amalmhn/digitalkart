import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Store/AuthContext';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { PostContext } from '../../Store/PostContext';
import './Edit.css'

function Create() {

  const {postDetails} = useContext(PostContext)

  const [name, setName] = useState(postDetails.fields.name.stringValue);
  const [category, setCategory] = useState(postDetails.fields.category.stringValue);
  const [price, setPrice] = useState(postDetails.fields.price.stringValue);
  const [ram, setRam] = useState(postDetails.fields.ram.stringValue);
  const [memory, setMemory] = useState(postDetails.fields.memory.stringValue);
  const [brand, setBrand] = useState(postDetails.fields.brand.stringValue);
  const [description, setDescription] = useState(postDetails.fields.description.stringValue);
  const [image, setImage] = useState(null);

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [ramError, setRamError] = useState('');
  const [memoryError, setMemoryError] = useState('');
  const [brandError, setBrandError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [valid, setValid] = useState('');


  const {user} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  const history = useHistory()
  

  const date = new Date()

  const handleEdit=(e)=>{

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
}else{

    if(image){
        firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
              ref.getDownloadURL().then((url)=>{
                firebase.firestore().collection('products').doc(postDetails.id).set({
                  name,
                  category,
                  price,
                  ram,
                  memory,
                  brand:brand.toUpperCase(),
                  description,
                  url,
                  userId:user.uid,
                  createdAt: postDetails.fields.createdAt.stringValue,
                  editedAt: date.toDateString()
                }).then(()=>{
                    history.push("/")
                    window.location.reload()
                })
              })
            }) 
    }else{
        firebase.firestore().collection('products').doc(postDetails.id).set({
            name,
            category,
            price,
            ram,
            memory,
            brand:brand.toUpperCase(),
            description,
            url:postDetails.fields.url.stringValue,
            userId:user.uid,
            createdAt: postDetails.fields.createdAt.stringValue,
            editedAt: date.toDateString()
          }).then(()=>{
            history.push("/")
            window.location.reload()
        })
    }
   
  }
}
    return (
        <div>
        
        
          {user && user.uid==="SjE0GeIdoUbvMpTV9PE5ugHqyaH3" ? <div className="centerDiv">
            
              <label htmlFor="fname">Name</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                onChange={(e)=>{setName(e.target.value)}}
                name="Name"
                defaultValue={name}
              />
              <br /><span className="errorSpan"> {nameError}</span><br/>
              <label htmlFor="fname">Category</label>
              <br /><span className="errorSpan"></span>
              <select name="category" className="categorySelect" 
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              defaultValue={category}
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
              
              onChange={(e)=>{setPrice(e.target.value)}}
              name="Price"
              defaultValue={price} />
              <br />
              <span className="errorSpan">{priceError}</span>
              
              <br/>
              <label htmlFor="fname">Color</label>
              <br />
              <input className="input" type="text"
              
              onChange={(e)=>{setRam(e.target.value)}}
              id="ram" name="Price" 
              defaultValue={ram}
              />
              <br />
              <span className="errorSpan">{ramError}</span>
              
              <br/>
              <label htmlFor="fname">Memory</label>
              <br />
              <input className="input" type="text"
              
              onChange={(e)=>{setMemory(e.target.value)}}
              id="memory" name="Price" 
              defaultValue={memory}
              />
              <br />
              <span className="errorSpan">{memoryError}</span>
              
              <br/>
              <label htmlFor="fname">Brand</label>
              <br />
              <input className="input" type="text"
              
              onChange={(e)=>{setBrand(e.target.value)}}
              id="brand" name="Price" 
              defaultValue={brand}
              />
              <br />
              <span className="errorSpan">{brandError}</span>
              
            <br />
            <label htmlFor="fname">Description</label>
              <br />
              <input className="input" type="text"
              
              onChange={(e)=>{setDescription(e.target.value)}}
              id="desc" name="Price" 
              defaultValue={description}
              />
              <br />
              <span className="errorSpan">{descriptionError}</span>
              <br/>
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : postDetails.fields.url.stringValue}></img>
            
              <br />
              <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
              <br />
              <button onClick={handleEdit} className="uploadBtn btn btn-success">Upload and Submit</button>
            <span className="errorSpan">{valid}</span>
          </div> : <div className="userSpan">
            <br/><br/><br/><br/><br/><br/>
            <span><strong>Access only for Admin</strong></span>
            </div>}
        
        </div>
    )
}

export default Create
