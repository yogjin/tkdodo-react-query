export interface Post {
  id: number;
  title: string;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

const todos = ['운동하기', '요가하기'];

export const getTodos = (): Promise<string[]> => {
  return new Promise((resolve) => resolve(todos));
};

export const postTodo = async (newTodo: string) => {
  todos.push(newTodo);

  return new Promise((resolve) => resolve('post complete'));
};
