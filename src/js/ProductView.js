import Storage from "./Storage.js";

const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#category-list");
const addNewProductBtn = document.querySelector("#add-new-product-btn");
const searchInput = document.querySelector("#search-input");
const productsNumber = document.querySelector("#products-number");
const selectedSort = document.querySelector("#sort-products");
const cancelNewCategoryBtn = document.querySelector("#cancel-new-category-btn");
const cancelUpadateProductBtn = document.querySelector(
  "#cancel-update-product-btn"
);
const updateProductBtn = document.querySelector("#update-product-btn");

class ProductView {
  constructor() {
    productCategory.addEventListener("change", (e) =>
      this.toggleFormCategory(e)
    );
    cancelNewCategoryBtn.addEventListener("click", (e) =>
      this.toggleFormCategory(e)
    );
    searchInput.addEventListener("input", (e) => this.searchProduct(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    addNewProductBtn.addEventListener("click", (e) => {
      this.addNewProduct(e);
    });
    cancelUpadateProductBtn.addEventListener("click", (e) =>
      this.cancelUpdateProduct(e)
    );
    updateProductBtn.addEventListener("click", (e) => this.updateProduct(e));

    this.products = [];
    this.updateProductId = "";
  }

  addNewProduct(e, id = "") {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;

    if (!title || !quantity || !category)
      return alert("Please fill in the desired field!");
    if (category === "newCategory")
      return alert("select another option for create new product!");
    Storage.setProduct({ id, title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    productTitle.value = "";
    productQuantity.value = "";
    productCategory.value = "";
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  createProductsList(products) {
    let result = "";

    products.forEach((product) => {
      const options = {
        year: "numeric",
        month: "long",
        weekday: "long",
        day: "numeric",
      };
      const categoryTitle = Storage.getAllCategories().find(
        (c) => c.id == product.category
      );
      result += `
      <div class="flex justify-between items-center my-5 bg-blue-100 p-2 rounded">
      <span class="text-slate-700">${product.title}</span>
      <span class="text-slate-600 text-sm">${product.update ? "(update)" : ''}</span>
      <div class="flex justify-center items-center gap-x-4">
        <span class="text-sm text-slate-700">${new Date().toLocaleDateString(
          "fa-IR",
          options
        )}</span>
        <span
          class="text-sm bg-transparent px-2 border-slate-700 border-2 rounded-full text-slate-700"
          >${categoryTitle.title}</span>
        <span
          class="text-sm w-10 h-10 text-white bg-slate-700 rounded-full p-2 flex justify-center items-center"
          >${product.quantity}</span>
        <button class="delete-product-btn w-7 h-7 p-2 bg-cover bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAACzklEQVR4nO2az0tUURTHP+e9mTSphQtLRYOKAmlRULRRg1YhRjv/jtpEP2jRolW0aNn/4CZKlFklmAhB0LbMhVk4ZmBhZjM932kxSkYxzvTOu17pfjazue/7zv1yzrvn3rkQCAQCgUAg8J8iLl6yfKW/O1G5gzIItO0Q0RopU4VE7nWUphbzji13A5YvDXYlRX0B9DT56EKcFs4fGp8s5xHXFoU8xQGSIrf5NfnXCgv1xgscAU4CvUmU3AKu5hlf7gZA2g8Cwlxna9cpGR3dqDdaR0bi8vriG+CYQH/e0UV5vwCVls3fjztNHqA2RpZqz7A/3+BcGOA5DX8E54cH2ovCM4HTeQaUFYFX64XCxaOPJz83Mr7hDGgl6vN98gAKZ9qSal+j4xvOAAUpXx68LqLH/y00N6jK286xqQcCutuxBAKBgPdk3gzNDg21HIhWr1kE0yxf04MPT0xMVLJoZDagtjwOrEH+betvCD86zz5vlbukWWQyt8ICqvA+q07TKEtZJw9GewGBdxY6TaGYnBNYbYbcGyCYnBbtWQMEjzJAROue8uSBqvqTASK7UAJE/mTAhqbuM0DUHwOg6jwDIvGoBLqfvvwGfLLQahSNiz5lAOB4JUiKlSULHTMDHDdDK72jM+sWQmYGqMulUG2aILAsAY3cGWC0AoBpCaTOSkCI/MsAQZ0ZYNUDgKEBVYcGgIcG9JybWQSqVnr1UB8/gpuHEx+s9OoRGe0DalqWOFoKNfYwA8BdM5R8T/zMgNSNAZWe0syKlZhtCWj96y9GlC3/+NyLJWB6c8zWAM2/F7A6C9zC1IA4lnlLvb+hRqfBW5ga0PFkehXhi6Xmn4i/GQCAMmeuuZ00Nc0ycwMUKVlrbmMj1qKpvrkBlUJ8X2HWWhcA0ZvWV2dzuSs8PzzQvi/iBioXQA9nlKsCs6CPusamxy3iCwQCgUAgEAgAPwEb0Nf+nkKeKgAAAABJRU5ErkJggg==')]" 
        data-product-id=${product.id}
        >
        </button>
        <button class="edit-product-btn w-7 h-7 p-2 bg-cover bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABv0lEQVRoge2YvU7DMBRGv1sQMxMjA2rYmBqJkTeAp0ClzBU/U9MJEOyBt+ARWCtaBsZmY6MTG2JozeCmqpw02ImT64qc8dr39nyy4kQFamr+N8QtsEzraXxIgroQOAJhG8AHCTw3NjfuB6d7n2k9zgTww/EFiG4ANNQ1AiYzEsej9v4gZY0fP4wCEHpZewiY/Ag6eO80J8v1RNqq0ZEHAAHsbBG6ap09gBniRK2wBxh2vAACfc3tu2qBPQBgFOJLLVQewA+jwA+jQK1rhSDxopYqDbB4YAm9HCGms2njQS1WFiBx25iGIHH9dt4cJcq2RdPIuioJuHs9867UeusxuiTgdr4pGLa91JMpPYDWPS/QH3a8xGnEJ5S2FlNqAN2X1Fwk9SQ0+srBRH5JxjhEKQHyyMeYhrB+CxWRBwBB+DbZb/UEispn3TarWyzBIS/bLMAlL1sLwikv2wvALS9H5MQFeTkmB67Iy1GGuCQvxxngmrwcqYmL8nKsBq7Ky9F/4LK8HJ+B6/LyJ1awDvJA1uf0GsgDZfwrUaE8YDtAxfKAzQAM8oCtAEzygI0AjPJA0QDM8kCRAA7I19TU1PDzCwhOykQaWlLQAAAAAElFTkSuQmCC')]" 
        data-product-id=${product.id}
        >
        </button>
      </div>
    </div>
      `;
    });

    document.querySelector("#products-list").innerHTML = result;
    productsNumber.textContent = this.products.length;
    // select delete product button
    const deleteProductBtn = [
      ...document.querySelectorAll(".delete-product-btn"),
    ];
    deleteProductBtn.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProduct(e));
    });
    // select edit product button
    const editProductBtn = [...document.querySelectorAll(".edit-product-btn")];
    editProductBtn.forEach((item) => {
      item.addEventListener("click", (e) => this.editProduct(e));
    });
  }

  searchProduct(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }

  sortProducts(e) {
    const sortValue = e.target.value;
    this.products = Storage.getAllProducts(sortValue);
    this.createProductsList(this.products);
  }

  toggleFormCategory(e) {
    e.preventDefault();
    const value = e.target.value;
    if (value === "newCategory") {
      document.querySelector("#category-list").value = "";
      document.querySelector("#category-form").classList.remove("hidden");
    } else if (value === "cancel-new-category") {
      document.querySelector("#category-form").classList.add("hidden");
    }
  }
  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
  editProduct(e) {
    const productId = Number(e.target.dataset.productId);
    this.updateProductId = productId;
    const product = Storage.getAllProducts().find((p) => p.id === productId);
    productTitle.value = product.title;
    productQuantity.value = product.quantity;
    productCategory.value = product.category;
    document.querySelector("#update-btns-section").classList.remove("hidden");
    addNewProductBtn.classList.add("hidden");
  }
  cancelUpdateProduct(e) {
    e.preventDefault();
    document.querySelector("#update-btns-section").classList.add("hidden");
    addNewProductBtn.classList.remove("hidden");
    productTitle.value = "";
    productQuantity.value = "";
    productCategory.value = "";
    this.updateProductId = "";
  }
  updateProduct(e) {
    this.addNewProduct(e, this.updateProductId);
    document.querySelector("#update-btns-section").classList.add("hidden");
    addNewProductBtn.classList.remove("hidden");
    this.updateProductId = "";
  }
}

export default new ProductView();
