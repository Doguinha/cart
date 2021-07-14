Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
    <div class="product">
        <div class="product-image">
          <img v-bind:src="image" v-bind:alt="description" />
        </div>
        <div class="product-info">
          <h1>{{title}}</h1>
          <p v-if="inStock > 10">In Stock</p>
          <p v-else-if="inStock <=10 && inStock > 0">Almost sold out!</p>
          <p v-else v-bind:class="{'out-of-stock': !inStock}">Out of Stock</p>
          <p>Shipping: {{shipping}}</p>
          <span v-show="description !== ''">{{description}}</span>
          <ul v-show="details.length > 0">
            <li v-for="detail in details">{{detail}}</li>
          </ul>
          <div
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            class="color-box"
            v-bind:style="{backgroundColor:variant.variantColor}"
            v-on:mouseover="updateProduct(index)"
          ></div>
          <button
            v-on:click="addToCart"
            v-bind:disabled="!inStock"
            v-bind:class="{disabledButton:!inStock}"
          >
            Add to cart
          </button>         
        </div>
        <div>
          <h2>Reviews</h2>
          <p v-show='reviews.length === 0'>There is no review</p>
          <ul>
            <li v-for='review in reviews'>
              <p>{{review.name}}</p>
              <p>{{review.rating}}</p>
              <p>{{review.review}}</p>
            </li>
          </ul>
        </div>
        <product-review v-on:review-submitted='addReview'></product-review>
      </div>
    `,
  data() {
    return {
      brand: "Vue Mastery",
      product: "socks",
      inventory: 1,
      selectedVariant: 0,
      description: "This socks is amazing",
      details: ["80% cotton", "20% polyester", "Gender-natural"],
      variants: [
        {
          variantId: 1,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green-onWhite.jpg",
          variantQuantity: 9,
        },
        {
          variantId: 2,
          variantColor: "blue",
          variantImage: "./assets/vmSocks-blue.jpg",
          variantQuantity: 0,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.cart = this.cart > 0 ? this.cart - 1 : this.cart;
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return "2.99";
    },
  },
});
