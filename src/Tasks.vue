<script>
import gql from 'graphql-tag'
import uuidV4 from 'uuid/v4'

const CreateTask = gql`
  mutation createTask($id: ID!, $name: String!, $completed: Boolean!) {
    createTask(
      input: {
        id: $id, name: $name, completed: $completed
      }
    ) {
      id
      name
      completed
    }
  }
`

const DeleteTask = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(
      input: {
        id: $id
      }
    ) {
      id
    }
  }
`

const ListTasks = gql`
  query listTasks {
    listTasks {
      items {
        id
        name
        completed
      }
    }
  }
`

const UpdateTask = gql`
  mutation updateTask($id: ID!, $name: String!, $completed: Boolean!) {
    updateTask(
      input: {
        id: $id
        name: $name
        completed: $completed
      }
    ) {
      id
      name
      completed
    }
  }
`

// In your component (Examples of queries & mutations)
export default {
  name: 'Tasks',
  methods: {
    toggleComplete(task) {
      const updatedTask = {
        ...task,
        completed: !task.completed
      }
      this.$apollo.mutate({
        mutation: UpdateTask,
        variables: updatedTask,
        update: (store, { data: { updateTask } }) => {
          const data = store.readQuery({ query: ListTasks })
          const index = data.listTasks.items.findIndex(item => item.id === updateTask.id)
          data.listTasks.items[index] = updateTask
          store.writeQuery({ query: ListTasks, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateTask: {
            __typename: 'Task',
            ...updatedTask
          }
        },
      })
      .then(data => console.log(data))
      .catch(error => console.error(error))
    },
    deleteTask(task) {
      this.$apollo.mutate({
        mutation: DeleteTask,
        variables: {
          id: task.id
        },
        update: (store, { data: { deleteTask } }) => {
          const data = store.readQuery({ query: ListTasks })
          data.listTasks.items = data.listTasks.items.filter(task => task.id !== deleteTask.id)
          store.writeQuery({ query: ListTasks, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteTask: {
            __typename: 'Task',
            ...task
          }
        },
      })
      .then(data => console.log(data))
      .catch(error => console.error(error))
    },
    createTask() {
      const taskname = this.taskname
      if ((taskname) === '') {
        alert('please create a task')
        return
      }
      this.taskname = ''
      const id = uuidV4()
      const task = {
        name: taskname,
        id,
        completed: false
      }
      this.$apollo.mutate({
        mutation: CreateTask,
        variables: task,
        update: (store, { data: { createTask } }) => {
          const data = store.readQuery({ query: ListTasks })
          data.listTasks.items.push(createTask)
          store.writeQuery({ query: ListTasks, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createTask: {
            __typename: 'Task',
            ...task
          }
        },
      })
      .then(data => console.log(data))
      .catch(error => console.error("error!!!: ", error))
    },
  },
  data () {
    return {
      taskname: '',
      tasks: []
    }
  },
  apollo: {
    tasks: {
      query: () => ListTasks,
      update: data => data.listTasks.items
    }
  },
}
</script>