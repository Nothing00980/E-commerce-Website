// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

// import { getDatabase,ref as dbref,set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// import { getStorage,ref,uploadBytes } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyAGFi4z6jmBRINsuRfWoizHRSrtNXvBbj8",
    authDomain: "ecom-f7b7d.firebaseapp.com",
    databaseURL: "https://ecom-f7b7d-default-rtdb.firebaseio.com",
    projectId: "ecom-f7b7d",
    storageBucket: "ecom-f7b7d.appspot.com",
    messagingSenderId: "440535699841",
    appId: "1:440535699841:web:a85a43872903b7f3f61880",
    measurementId: "G-7B1D6F2F9Q"
  };

  firebase.initializeApp(firebaseConfig);

  var databaseref = firebase.database().ref('Products');

//   const app = initializeApp(firebaseConfig);



//   const database = getDatabase(app);
//   const storage = getStorage(app);
  const dform = document.getElementById('dynamicform');


const temp = document.getElementById('temp');
const popup = document.getElementById('popup');
const body = document.body;
const clsbtn = document.getElementById('close-btn');
const submitbtn = document.getElementById('submit-btn');
let pname = document.getElementById('ProductName');
let pimage = document.getElementById('UploadImage');
let pdetails = document.getElementById('ProductDetails');
let sname = document.getElementById('SellerName');
let sphone = document.getElementById('SellerPhone');
let sadd = document.getElementById('SellerAddress');
let semail = document.getElementById('exampleInputEmail1')
let checkbox = document.getElementById('exampleCheck1');
let pprice = document.getElementById('ProductPrice');


let filename;
// todo file
let selectedFile;
let myurl;


let pnameval;
let pimageval;
let pdetailsval;
let snameval;
let sphoneval;
let saddval;
let semailval;
let checkboxval;
let ppriceval;

const file = document.getElementById('fileInput');

file.addEventListener('change',(event)=>{
    const fileInput = event.target;
    const selectedFileNameElement = document.getElementById('selectedFileName');

    // Check if a file is selected
    if (fileInput.files.length > 0) {
       selectedFile = fileInput.files[0];
       filename = selectedFile.name;

      // Check if the selected file has a valid image file extension
      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExtension = selectedFile.name.toLowerCase().slice(selectedFile.name.lastIndexOf('.'));
      
      if (allowedExtensions.includes(fileExtension)) {
        // Display the selected file name (optional)
        selectedFileNameElement.textContent = `Selected File: ${selectedFile.name}`;
        
        // You can handle the selected image file here
        // For example, you can upload it to a server or perform other operations
      } else {
        alert('Please select a valid image file with the extensions: jpg, jpeg, png.');
        fileInput.value = ''; // Clear the file input
        selectedFileNameElement.textContent = '';
        selectedFile=null; // Clear the display
      }
    }
})

// 



document.getElementById('sell-btn').addEventListener('click',()=>{
 

        body.style.overflow = 'hidden';
    
        // both ways we can do this
        temp.classList.add('active');
        popup.classList.add('deactive');

    

})


clsbtn.addEventListener('click',()=>{

    body.style.overflow = 'auto';
    
    // both ways we can do this
    temp.classList.remove('active')
    popup.classList.remove('deactive');
    
})

function writeUserData(productId, pname,pdetails,pprice,sellername,sellerphone,selleradd,selleremail) {

    const user = firebase.auth().currentUser;
    console.log(user.email);
  
//   const storageRef = ref(storage,filename);

    
    // uploadBytes(storageRef, selectedFile).then((snapshot) => {
    //     console.log('Uploaded a blob or file!');
    //   },(error)=>{
    //     console.log(error);
    // });

    if(user.email == selleremail){
        let storageref = firebase.storage().ref("images/"+filename);
        let upload = storageref.put(selectedFile);
        upload.on("state_changed",(snap)=>{
            // console.log(snap);
        },(error)=>{
            console.log(error);
        },
        async () => {
          // Upload completed successfully
          try {
            const downloadURL = await upload.snapshot.ref.getDownloadURL();
            console.log("File available at", downloadURL);
            myurl = downloadURL;
      
            // Now you can use `downloadURL` to display the image or store it in the database
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
          finally{
    
            setTimeout(() => {
            
                var prod =  databaseref.push();
                prod.set({
                    ProductId:productId,
                        ProductName:pname,
                        ProductImageUrl:myurl,
                        ProductPrice : pprice,
                        ProductDetails:pdetails,
        
                        SellerName:sellername,
                        SellerPhoneNumber:sellerphone,
                        SellerAddress:selleradd,
                        SellerEmail: selleremail,
            
                });
            
                document.querySelector('#alert').style.display = "block";
                // alert("Successful !!,Your ssoid and Password are sent by Email");
                setTimeout(() => {
                    
                    document.querySelector('#alert').style.display = "none";
                    dform.reset();
                    // location.replace("../login.html")
            
                }, 3000);
            }, 1000);
          }
        }
        );
    }
    else{
console.log("user email not defined please reconsider it");
document.querySelector('#alert2').style.display = "block";
setTimeout(()=>{
    document.querySelector('#alert2').style.display = "none";
    semail.value = "";

},2000)

    }

 
    // database.dbref('Products/').push({   ProductId:productId,
    //     ProductName:pname,
    //     ProductImageUrl:myurl,
    //     ProductDetails:pdetails,
    //     SellerName:sellername,
    //     SellerPhoneNumber:sellerphone,
    //     SellerAddress:selleradd,
    //     SellerEmail: selleremail,
    // })



    // set(dbref(database,'Products/' + productId),{
    //     ProductId:productId,
    //     ProductName:pname,
    //     ProductImageUrl:filename,
    //     ProductDetails:pdetails,
    //     SellerName:sellername,
    //     SellerPhoneNumber:sellerphone,
    //     SellerAddress:selleradd,
    //     SellerEmail: selleremail,
    // });
  }




  dform.addEventListener('submit',(event)=>{
    event.preventDefault();
    let unique = createUniqueCounter();
    let u = unique().toString()
    // console.log(unique().toString());
    pnameval = pname.value;
    pdetailsval = pdetails.value;
    snameval = sname.value;
    sphoneval = sphone.value;
    saddval = sadd.value;
    semailval = semail.value;
    checkboxval = checkbox.value;
    ppriceval = pprice.value;
 
    writeUserData(u,pnameval,pdetailsval,ppriceval,snameval,sphoneval,saddval,semailval);
  })



//   function Changeformvalues(){
   



//   }





  function createUniqueCounter() {
    let counter = 1;
  
    return function () {
      return counter++;
    };
  }