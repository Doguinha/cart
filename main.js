var globalEventDelivery = new Vue();
var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(productId) {
      this.cart.push(productId);
    },
  },
});
