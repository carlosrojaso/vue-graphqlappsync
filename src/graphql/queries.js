/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
    status
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      status
    }
    nextToken
  }
}
`;
export const ListTodosQuery = `query ListTodos {
  listTodos {
    items {
      id
      name
    }
  }
}`;
export const get = `query Get {
  get {
    id
    name
    description
    status
  }
}
`;
