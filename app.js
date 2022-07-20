const app = new Vue({
  el: "#app",
  data: {
    products: [],
    itemProduct: false,
    cart: [],
    showCart: false,
    messageAlert: "",
    activeAlertCart: false,
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
  watch: {
    cart() {
      window.localStorage.cart = JSON.stringify(this.cart);
    },
    itemProduct() {
      document.title =
        `Techno Project - ${this.itemProduct.name}` || "Techno Project";
      const hash = this.itemProduct.id || " ";
      history.pushState(null, null, `#${hash}`);

      if (this.itemProduct) {
        this.inventoryCheck();
      }
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
      this.alert(`${name}`);
    },
    removeItemOnCart() {
      this.cart.splice(0, 1);
    },
    checkStorage() {
      if (window.localStorage.cart) {
        this.cart = JSON.parse(window.localStorage.cart);
      }
    },
    inventoryCheck() {
      const items = this.cart.filter(({ id }) => id === this.itemProduct.id);
      this.itemProduct.inventory -= items.length;
    },
    alert(message) {
      this.messageAlert = message;
      this.activeAlertCart = true;

      setTimeout(() => {
        this.activeAlertCart = false;
      }, 1500);
    },
    router() {
      const hash = document.location.hash;
      if (hash) {
        this.fetchItemProduct(hash.replace("#", ""));
      }
    },
  },
  beforeCreate() {
    document.title = "Techno Project";
  },
  created() {
    this.fetchProducts();
    this.router();
    this.checkStorage();
  },
});
