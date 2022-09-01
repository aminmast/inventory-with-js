import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category-btn");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description)
      return alert("Please fill in the desired field!");
    Storage.setCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    categoryTitle.value = "";
    categoryDescription.value = "";
  }

  setApp() {
    this.categories = Storage.getAllCategories();
  }

  createCategoriesList() {
    let result = `<option
    value=""
    class="rounded py-2 text-slate-700 hover:bg-slate-700 hover:text-white"
    selected > select a category </option>
    `;
    this.categories.forEach((category) => {
      result += `<option
      value=${category.id}
      class="rounded py-2 text-slate-700 hover:bg-slate-700 hover:text-white"
      title=${category.description}
    >
      ${category.title}
    </option>`;
    });
    document.querySelector("#category-list").innerHTML += result;
  }
}
export default new CategoryView();
