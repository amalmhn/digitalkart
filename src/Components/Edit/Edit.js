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
  const [option, setOption] = useState(false);
  const [valid2, setValid2] = useState('');
  const [error, setError] = useState('');

  const {user} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  const history = useHistory()
  

  const date = new Date()

  const handleEdit=(e)=>{

    e.preventDefault()

    var nameRegex = /^[a-zA-Z0-9 ]{2,30}$/
    var priceRegex = /^[0-9]{2,10}$/
    var ramRegex = /^[a-zA-Z ]{2,20}$/
    var memoryRegex = /^[a-zA-Z0-9 ]{2,10}$/
    var brandRegex = /^[a-zA-Z]{2,20}$/
    var descriptionRegex = /^[a-zA-Z0-9 $&+,:;=?@#|'<>.^*()%!-]{2,250}$/

    if((name==="") ||(nameRegex.test(name)===false)){
      setNameError("Min 2 & max 30 characters without special characters")
      var nameError1 = true;
  }
  if((price==="")||(priceRegex.test(price)===false)){
    setPriceError("Min 2 & max 10 digits without spaces")
    var priceError1 = true;
}
if((ram==="")||(ramRegex.test(ram)===false)){
  setRamError("Min 2 & max 20 characters, Only alphabets")
  var ramError1 = true;
}
if((memory==="")||(memoryRegex.test(memory)===false)){
  setMemoryError("Memory must be min 2 & max 10 characters")
  var memoryError1 = true;
}
if((brand==="")||(brandRegex.test(brand)===false)){
  setBrandError("Min 2 & max 20 characters without spaces")
  var brandError1 = true;
}
if((description==="")||(descriptionRegex.test(description)===false)){
  setDescriptionError("Description must be min 2 & max 250 characters")
  var descError1 = true;
}

if(nameError1===true || priceError1===true || ramError1===true || memoryError1===true || brandError1===true || descError1===true){
  setValid("Invalid Details!")
}else{

    if(image){

      setOption(true);
      setValid2("Updating the details, please wait...")

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
                }).catch((error) => {
                  console.error(error.message);
                  setError(error.message)
              });
              })
            }) 
    }else{

      setOption(true);
      setValid2("Updating the details, please wait...")

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
        }).catch((error) => {
          console.error(error.message);
          setError(error.message)
      });
    }
   
  }
}
    return (
        <div>
        
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
              <br />
              {option ? "" : <span className="errorSpan"> {nameError}</span>}<br/>
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
              {option ? "" : <span className="errorSpan">{priceError}</span>}
              
              <br/>
              <label htmlFor="fname">Color</label>
              <br />
              <input className="input" type="text"
              
              onChange={(e)=>{setRam(e.target.value)}}
              id="ram" name="Price" 
              defaultValue={ram}
              />
              <br />
              {option ? "" : <span className="errorSpan">{ramError}</span>}
              
              <br/>
              <label htmlFor="fname">Memory</label>
              <br />
              <input className="input" type="text"
              
              onChange={(e)=>{setMemory(e.target.value)}}
              id="memory" name="Price" 
              defaultValue={memory}
              />
              <br />
              {option ? "" : <span className="errorSpan">{memoryError}</span>}
              
              <br/>
              <label htmlFor="fname">Brand</label>
              <br />
              <input className="input" type="text"
              
              onChange={(e)=>{setBrand(e.target.value)}}
              id="brand" name="Price" 
              defaultValue={brand}
              />
              <br />
              {option ? "" : <span className="errorSpan">{brandError}</span>}
              
            <br />
            <label htmlFor="fname">Description</label>
              <br />
              <input className="input" type="text"
              
              onChange={(e)=>{setDescription(e.target.value)}}
              id="desc" name="Price" 
              defaultValue={description}
              />
              <br />
              {option ? "" : <span className="errorSpan">{descriptionError}</span>}
              <br/>
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : postDetails.fields.url.stringValue}></img>
            
              <br />
              <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
              <br />
              <button onClick={handleEdit} className="uploadBtn btn btn-success">Upload and Submit</button>
              <div>
            {option ? <span className="loadingSpan"><strong>{valid2}</strong></span> :<span className="errorSpan">{valid}</span>}
            </div>
            <span className="errorSpan">{error}</span>
          </div> : <div className="userSpan">
            <br/><br/><br/><br/><br/><br/>
            <span><strong>Access only for Admin</strong></span>
            </div>}
            </div>
        </div>
    )
}

export default Create
