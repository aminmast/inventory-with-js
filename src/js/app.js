import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  // categories loaded
  CategoryView.setApp();
  //   products loaded
  ProductView.setApp();
  //   create categories option
  CategoryView.createCategoriesList();
  //   create products list
  ProductView.createProductsList(ProductView.products);
});
