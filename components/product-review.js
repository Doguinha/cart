Vue.component("product-review", {
  template: `
    <form class='review-form' v-on:submit.prevent='onSubmit'>

        <p v-if='errors.length'>
            <b>Por favor, corrija os erros</b>
            <ul>
                <li v-for='error in errors'>
                    {{error}}
                </li>
            </ul>
        </p>
        <p>
            <label fon='name'>Name:</label>
            <input v-model='name' type='text' id='name'/>
        </p>
        <p>
            <label fon='name'>Review:</label>
            <textarea v-model='review' type='text' id='review'></textarea>
        </p>
        <p>
            <label for='rating'>Rating:</label>
            <select id='rating' v-model.number='rating'>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>
        <input type='submit' value='Submit' />
        </p> 
    </form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };
        globalEventDelivery.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) {
          this.errors.push("Informe o nome");
        }
        if (!this.review) {
          this.errors.push("Informe sua reavaliação");
        }
        if (!this.rating) {
          this.errors.push("Informe sua nota");
        }
      }
    },
  },
});
