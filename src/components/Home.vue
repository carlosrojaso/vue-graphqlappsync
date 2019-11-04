<template>
  <div class="home">
    <div v-for="item in todos" v-bind:key="item.id">
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
import { components } from 'aws-amplify-vue';
import { ListTodosQuery } from "../graphql/queries";

export default {
  name: 'Home',
  data () {
    return {
      note: '',
      todos: [],
      filter: 'all',
      logger: {}
    }
  },
  components: {
    ...components
  },
  created() {
    this.logger = new this.$Amplify.Logger('NOTES_component')
    this.list();
  },
  computed: {
    listTodosQuery() {
      return this.$Amplify.graphqlOperation(ListTodosQuery);
    }
  },
  methods: {
    list() {
      this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(ListTodosQuery))
      .then((res) => {
        this.todos = res.data.listTodos.items;
        this.logger.info(`Todos successfully listed`, res);
        console.log(res);
      })
      .catch((e) => {
        this.logger.error(`Error listing Todos`, e);
        console.log(e);
      });
    },
  }
}
</script>