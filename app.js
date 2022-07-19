const app = new Vue({
  el: "#app",
  data: {
    products: [],
    itemProduct: false,
    cartTotal: 0,
    cart: [],
  },
  filters: {
    formatPrice(value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    capitalizer(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    fetchProducts() {
      fetch("./api/produtos.json")
        .then((res) => res.json())
        .then((rjson) => {
          this.products = rjson;
        })
        .catch(function (error) {
          console.error(
            "There has been a problem with your fetch operation: " +
              error.message
          );
        });
    },
    fetchItemProduct(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then((response) => response.json())
        .then((rjson) => {
          this.itemProduct = rjson;
        })
        .catch(function (error) {
          console.error(
            "There has been a problem with your fetch operation: " +
              error.message
          );
        });
    },
    openModal(id) {
      this.fetchItemProduct(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    addItemInCart() {
      //
    },
  },
  beforeCreate() {
    document.title = "Techno Project";
  },
  created() {
    this.fetchProducts();
  },
});
