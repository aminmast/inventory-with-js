export default class Storage {
  // get categories
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    return savedCategories.sort((a, b) => {
      return new Date(a.createAt) > new Date(b.createAt) ? -1 : 1;
    });
  }
  // set gategory
  static setCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    if (existedItem) {
      // edite
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      // new
      categoryToSave.id = new Date().getTime();
      categoryToSave.createAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  // get products
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (sort === "newest") {
      return savedProducts.sort((a, b) => {
        return new Date(a.createAt) > new Date(b.createAt) ? -1 : 1;
      });
    } else if (sort === "oldest") {
      return savedProducts.sort((a, b) => {
        return new Date(a.createAt) > new Date(b.createAt) ? 1 : -1;
      });
    }
  }
  //   set product
  static setProduct(productToSave) {
    const savedProducts = Storage.getAllProducts();
    const existedItem = savedProducts.find((c) => c.id === productToSave.id);
    if (existedItem) {
      // edit
      existedItem.update = true;
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      // new
      productToSave.id = new Date().getTime();
      productToSave.createAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
  static deleteProduct(id) {
    const allProducts = Storage.getAllProducts();
    const deleteProduct = allProducts.filter((p) => p.id !== Number(id));
    localStorage.setItem("products", JSON.stringify(deleteProduct));
  }
}
