// get total
let title = document.getElementById("title");

let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("create");
let mood = "create";
let temp;
function gettotal() {
  if (price.value != "") {
    let thetotal = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = thetotal;
    total.style.background = " rgb(4, 82, 30)";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}
// create product
let data;
if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

submit.onclick = function () {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (product.price != "" && product.category != "" && product.count < 100) {
    if (mood == "create") {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          data.push(product);
        }
      } else {
        data.push(product);
      }
      clearinput();
    } else {
      data[temp] = product;
      submit.innerHTML = "create";
      mood = "create";
      count.style.display = "block";
    }
  } else {
  }

  localStorage.setItem("product", JSON.stringify(data));

  showdata();
};
//  clear data
function clearinput() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// show data
function showdata() {
  gettotal();
  let tabel = "";
  for (let i = 0; i < data.length; i++) {
    tabel += `
     <tr>
     <td>${i}</td>
     <td>${data[i].title}</td>
     <td>${data[i].price}</td>
     <td>${data[i].taxes}</td>
     <td>${data[i].ads}</td>
     <td>${data[i].discount}</td>
     <td>${data[i].total}</td>
     <td>${data[i].category}</td>
     <td><button id="update" onclick="updatedata(${i})">update</button></td>
     <td><button id="del" onclick="deleteproduct(${i})">delete</button></td>
   </tr>`;
  }
  document.getElementById("tbody").innerHTML = tabel;
  let delall = document.getElementById("deleteall");
  if (data.length > 0) {
    delall.innerHTML = `
    <button id="deall" onclick="deleteall()"> delete all ${data.length}</button>`;
  } else {
    delall.innerHTML = "";
  }
}
showdata();

// delete

function deleteproduct(i) {
  data.splice(i, 1);

  localStorage.product = JSON.stringify(data);
  showdata();
}
function deleteall() {
  data.splice(0);
  localStorage.clear();
  showdata();
}

// update date
function updatedata(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  ads.value = data[i].ads;
  taxes.value = data[i].taxes;
  discount.value = data[i].discount;
  category.value = data[i].category;
  count.style.display = "none";
  gettotal();
  submit.innerHTML = "update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchmood = "title";
let search = document.getElementById("search");
function searchformood(id) {
  search.focus();
  if (id == "searchbytitle") {
    searchmood = "title";
  } else {
    searchmood = "category";
  }

  search.value = "";
  showdata();

  search.placeholder = "serach by " + searchmood;
}

function searchData(value) {
  let tabel = "";
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].title?.includes(value.toLowerCase()) ||
      data[i].category?.includes(value.toLowerCase())
    ) {
      tabel += `
      <tr>
      <td>${i}</td>
  <td>${data[i].title}</td>
  <td>${data[i].price}</td>
       <td>${data[i].taxes}</td>
   <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
      <td>${data[i].total}</td>
       <td>${data[i].category}</td>
     <td><button id="update" onclick="updatedata(${i})">update</button></td>
     <td><button id="del" onclick="deleteproduct(${i})">delete</button></td>
       </tr>`;
    }
  }

  document.getElementById("tbody").innerHTML = tabel;
}
