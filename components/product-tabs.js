Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: `
        <div>
            <span class='tab' 
                v-for="(tab, index) in tabs" 
                v-on:click="selectedTab = tab"
                v-bind:class='{activeTab: selectedTab === tab}'    
                v-bind:key='index'>
                {{tab}}
            </span>
            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if='reviews.length === 0'>There is no review</p>
                <ul v-else>
                    <li v-for='review in reviews'>
                    <p>{{review.name}}</p>
                    <p>{{review.rating}}</p>
                    <p>{{review.review}}</p>
                    </li>
                </ul>
            </div>
            <product-review v-show="selectedTab === 'Make a review'"></product-review>
        </div>
      `,
  data() {
    return {
      tabs: ["Reviews", "Make a review"],
      selectedTab: "Reviews",
    };
  },
  methods: {},
});
