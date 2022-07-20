const app = new Vue({
  el: "#app",
  data: {
    products: [],
    itemProduct: false,
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
  computed: {
    cartTotal() {
      let total = 0;
      total = this.cart.reduce((sum, item) => (sum += item.price), 0);
      return total;
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
          console.table(rjson);
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
      this.itemProduct.inventory--;
      const { id, name, price } = this.itemProduct;
      this.cart.push({ id, name, price });
    },
    removeItemOnCart() {
      this.cart.splice(0, 1);
    },
  },
  beforeCreate() {
    document.title = "Techno Project";
  },
  created() {
    this.fetchProducts();
  },
});
