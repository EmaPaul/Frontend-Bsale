// back deployado
const database = "https://backend-bsale-ft1519sw4-emapaul.vercel.app";

/* PRODUCTOS*/
let urlProductos =`${database}/product`;

// hacemos la peticion a la api
const apiProduct = fetch(urlProductos);

/*IMAGEN POR SI ALGUN PRODUCTO NO TINE IMAGEN*/
let image = `./src/Img/Bsale.png`;

/*TRAYENDO PRODUCTOS*/
apiProduct.then(res => res.json())
.then(data=>{
  data.forEach(element => {
    document.getElementById("products").innerHTML+=
    `
    <div class="group-coso" class=${`group-${element.category}`} id=${element.id}>
        
        <img src=${element.url_image?element.url_image: image} width='200px' height='200px' alt=${element.name} />

        <div>
          ${element.name.toUpperCase()}
        </div>
        <div>
          Precio: ${`$ ${element.price}`}
        </div>
        <div>
          Descuento: ${`${element.discount}%`}
        </div> 
    </div>
    `
    
  })
}).catch(err=>console.log(err))


/*FILTRADO POR CATEGORIAS (BOTONES)*/

let urlCategorias=`${database}/category`

// hacemos la peticion a la api
const apiCategory = fetch(urlCategorias);

apiCategory.then(res=>res.json())
.then(data=>{
  data.forEach(element=>{
      document.getElementById("categories").innerHTML+=
      `
      <button class='cat_boton' id=${element.id} onclick="filtrarProductoCat(${element.id})">
        ${element.name.toUpperCase()}
      </button>
      
      `
  })
})
.catch((err) => console.log(err));

function filtrarProductoCat(value){
  let urlFilter=`${database}/product`;
  const apifilter=fetch(urlFilter)

  apifilter.then(res=>res.json())
  .then(data=>{
    localStorage.setItem("allProducts",JSON.stringify(data))
  if(value==="all"){
    document.getElementById("products").innerHTML = "";
    data.forEach(element => {
      document.getElementById("products").innerHTML+=
      `
      <div class="group-coso" class=${`group-${element.category}`} id=${element.id}>
          <img src=${element.url_image?element.url_image: image} width='200px' height='200px' alt=${element.name}/>
          <div>
              ${element.name}
          </div>
          <div>
          Precio: ${`$ ${element.price}`}
          </div>
          <div>
          Descuento: ${`${element.discount}%`}
          </div>
      </div>
      `
    })
  }else{
    let filterCat= data.filter(e=>e.category===value)
    document.getElementById("products").innerHTML=""
    filterCat.forEach((element) => {
      document.getElementById("products").innerHTML +=          
      
      `<div class="group-coso" class=${`group-${element.category}`} id=${element.id}>
        <img src=${element.url_image ? element.url_image : image} width='200px' height='200px' alt=${element.name}>
          <div>
            ${element.name.toUpperCase()}
          </div>
          <div>
            Precio: ${`$ ${element.price}`}
          </div>
          <div>
            Descuento:${`${element.discount}%`}
          </div>
      </div>`;
    })
    localStorage.setItem('allProducts', JSON.stringify(filterCat));
  }
  })
}

/*BARRA DE BUSQUEDA*/

function getValor(){

  const name= document.querySelector("input").value
  let urlBusqueda=`${database}/product?name=${name}`
  const apiBusqueda=fetch(urlBusqueda)

  apiBusqueda.then(res=>res.json())
  .then(data=>{
    localStorage.setItem('allProducts', JSON.stringify(data));
    let products=""
    for (let i = 0; i < data.length; i++) {
      products += 
      `
      <div class="group-coso" id=${data[i].category}>

        <img src=${data[i].url_image ? data[i].url_image : image} width='200px' height='200px' alt=${data[i].name}>
        <div>
          ${data[i].name.toUpperCase()}
        </div>
        <div>
          Precio: ${data[i].price}
        </div>
        <div>
        descuento: ${`${data[i].discount}%`}
      </div>
      </div>

      `
    }
      document.getElementById("products").innerHTML = products;
      document.querySelector("input").value = ""
  })
  .catch((err) => console.log(err))
}

/*FILTRO ALFABETICO*/
function sortAlpha(){
  let sortAlpha = document.getElementById("sortAlpha")
  let optionSelected=sortAlpha.value;
  let data = JSON.parse(localStorage.getItem('allProducts'))
  document.getElementById("products").innerHTML = '';

  let reDatos;
  if(optionSelected === "A-Z"){
    reDatos=data.sort((a,b)=>{
      if(a.name.toUpperCase() < b.name.toUpperCase()){
        return -1;
      }else if(a.name.toUpperCase() > b.name.toUpperCase()){
        return 1;
      }else{
        return 0;
      }
    })
  }else if(optionSelected === "Z-A"){
    reDatos=data.sort((a,b)=>{
      if(a.name.toUpperCase() < b.name.toUpperCase()){
        return 1;
      }else if(a.name.toUpperCase() > b.name.toUpperCase()){
        return -1;
      }else{
        return 0;
      }
    })
  }else{
    data.forEach(element => {
      document.getElementById("products").innerHTML+=
      `
      <div class="group-coso" class=${`group-${element.category}`} id=${element.id}>
          <img src=${element.url_image?element.url_image: image} width='200px' height='200px' alt=${element.name}/>
          <div>
              ${element.name}
          </div>
          <div>
          Precio: ${`$ ${element.price}`}
          </div>
          <div>
          Descuento: ${`${element.discount}%`}
          </div>
      </div>
      `
    })
  }

  reDatos.forEach(element =>{
    document.getElementById("products").innerHTML+=
    `
    <div class="group-coso" class=${`group-${element.category}`} id=${element.id}>
        <img src=${element.url_image?element.url_image: image} width='200px' height='200px' alt=${element.name}/>
        <div>
            ${element.name}
        </div>
        <div>
        Precio: ${`$ ${element.price}`}
        </div>
        <div>
        Descuento: ${`${element.discount}%`}
        </div>
    </div>
    `
  })
}

/*FILTRO POR PRECIO*/

function sortPrice(){
  let sortAlpha = document.getElementById("sortPrice")
  let optionSelected=sortAlpha.value;
  let data = JSON.parse(localStorage.getItem('allProducts'))
  document.getElementById("products").innerHTML = '';

  let rePrecio;
  if(optionSelected === "hight"){
    rePrecio=data.sort((a,b)=>{
      if(a.price > b.price){
        return -1;
      }else if(a.price < b.price){
        return 1;
      }else{
        return 0;
      }
    })
  }else if(optionSelected === "low"){
    rePrecio=data.sort((a,b)=>{
      if(a.price > b.price){
        return 1;
      }else if(a.price < b.price){
        return -1;
      }else{
        return 0;
      }
    })
  }else{
    data.forEach(element => {
      document.getElementById("products").innerHTML+=
      `
      <div class="group-coso" class=${`group-${element.category}`} id=${element.id}>
          <img src=${element.url_image?element.url_image: image} width='200px' height='200px' alt=${element.name}/>
          <div>
              ${element.name}
          </div>
          <div>
          Precio: ${`$ ${element.price}`}
          </div>
          <div>
          Descuento: ${`${element.discount}%`}
          </div>
      </div>
      `
    })
  }
  rePrecio.forEach(element =>{
    document.getElementById("products").innerHTML+=
    `
    <div class="group-coso" class=${`group-${element.category}`} id=${element.id}>
        <img src=${element.url_image?element.url_image: image} width='200px' height='200px' alt=${element.name}/>
        <div>
            ${element.name}
        </div>
        <div>
          Precio: ${`$ ${element.price}`}
        </div>
        <div>
        Descuento: ${`${element.discount}%`}
        </div>
    </div>
    `
  })
}
