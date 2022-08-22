import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import storage from "./firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './Addcontact.css';
// HERE ABOVE useHistory IS REPLACED WITH useNavigate 

function AddContact(props) {

    var imageurl = "";

    // values for dropdown

    const contype = [{
        val: "personal"
    },
    {
        val: "office"
    }];
    const [cont, setCont] = React.useState("select type");

    //function to set dropdown value
    const handleDropdownChange = (event) => {
        setCont(event.target.value);
        setUser({ ...User, contype: event.target.value})
    };



    const navigate = useNavigate();
    const [User, setUser] = useState({ name: "", phoneno: "", profilekey: "",contype:"", isWhatsup: false });

    // State to store uploaded file
    const [file, setFile] = useState("");

    // progress
    const [percent, setPercent] = useState(0);

    //state for checkbox
    const [isChecked, setIsChecked] = useState(false)

    //function to get whether checkbox is checked

    const checkHandler = () => {
        setIsChecked(!isChecked)
        setUser({
            ...User,
            isWhatsup: true
        })
    }






    const handleUpload = (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload an image first!");
            return;
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    console.log(imageurl);
                    imageurl = url;
                    setUser({ ...User, profilekey: imageurl })


                });
            }
        );
    };

    // function for handling the images
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    let add = (e) => {

        e.preventDefault();
        if (User.name === "" || User.phoneno === ""||User.contype===""||User.profilekey===""||User.isWhatsup==="") {
            alert("All fields are mandatory!!!");
            return
        }

        // THIS IS USED TO SHOW THE LIST DATA ON THE APP.JS FILE 
        props.addContactHandler(User);
        // THIS IS USED FOR WHEN THE ADD BUTTON IS PRESSED THE INPUT FILED AGAIN GETS EMPTY
        setUser({ name: "", phoneno: "", profilekey: "",contype:"", isWhatsup: false });
        //console.log(props);
        navigate('/');
    }

    return (
        <div className='ui main'>
            <h2>Add Contact</h2>
            <form className='ui form'>
                <div className='field'>
                    <label>Name</label>
                    <input type="text" name="Name" placeholder='Name' value={User.name} onChange={e => setUser({ ...User, name: e.target.value })} />
                </div>
                <div className='field'>
                    <label>Phone no</label>
                    <input type="text" name="phoneno" placeholder='phoneno' value={User.phoneno} onChange={e => setUser({ ...User, phoneno: e.target.value })} />
                </div>
                <div className="App">
                    <select placeholder='select contact type' value={cont} onChange={handleDropdownChange}>
                        {contype.map((item) =>
                            <option key={item.array}>{item.val}</option>
                        )};
                    </select>
                </div>
                <div className='checkbox'>
                    <input
                        type="checkbox"
                        id="checkbox"
                        checked={isChecked}
                        onChange={checkHandler}
                    />
                    <label htmlFor="checkbox">is Whatsup </label>
                    {/* <p>The checkbox is {isChecked ? "checked" : "unchecked"}</p> */}
                </div>

                <div className='field'>
                    <input type="file" onChange={handleChange} accept="/image/*" />
                    <button className="uploadbuttom" onClick={handleUpload}>Upload to Firebase</button>
                    <p>{percent} "% done"</p>
                </div>
                <button onClick={add} className='ui secondary button'>Add</button>
            </form>
        </div>
    )
}

export default AddContact
