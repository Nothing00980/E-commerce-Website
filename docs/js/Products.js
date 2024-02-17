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


    // Reference to the "products" node in the database

    // Function to fetch data from Firebase and display it in the grid
    function displayProducts() {
      // Reference to the grid container
      const gridContainer = document.getElementById("innercontainer");

      // Listen for value changes in the "products" node
      databaseref.on("value", (snapshot) => {
        // Clear the existing content in the grid
        gridContainer.innerHTML = '';
        
        // Loop through each child in the snapshot
        snapshot.forEach((childSnapshot) => {
            const productData = childSnapshot.val();
            let article = `
            <div class="col-3" style="margin-right: 20px; margin-top: 20px;">
            <div class="card" style="width: 18rem; background-color: rgb(232, 234, 234); ">
               <img src="` + productData.ProductImageUrl + `" class="card-img-top" alt="..." style="width: 100%;height:200px">
               <div class="card-body">
                 <h5 class="card-title"> ` + productData.ProductName + `</h5>
                 <p style="margin:0px;" >` +productData.ProductDetails+`</p>
                 <p style="margin:0px;">` +productData.SellerName+`</p>
                 <p class="card-text" style="margin:0px;">` +productData.SellerPhoneNumber+`</p>
                 <p class="card-text" style="margin:0px;">` +productData.SellerAddress+`</p>
                 <p class="card-text" style="margin:0px;">` +productData.SellerEmail+`</p>
                 
                <div class="row justify-content-around" style="margin-top:10px;" >
                <div class="col-2" style="max-width:50%;"> 
                <h6 > Rs.` + productData.ProductPrice + `</h5>
                 </div>
                <div class="col-2" style="max-width:50%;"> 

                <a href="#" class="btn btn-primary">Buy</a>
                 </div>

                </div>

               </div>
             </div>
         </div>`;
         gridContainer.innerHTML +=article;

          // Create a grid item for each product
        //   const gridItem = document.createElement("div");
        //   gridItem.classList.add("grid-item");
        //   gridItem.textContent = `Product: ${productData.name}, Price: ${productData.price}`;

          // Append the grid item to the grid container
        //   gridContainer.appendChild(gridItem);
        });
      });
    }

    // Call the function to initially display products
    displayProducts();