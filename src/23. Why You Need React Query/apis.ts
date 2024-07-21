export interface Post {
  id: number;
  title: string;
}

export const getPost = async (id: number) => {
  if (id === 2) await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const getPostWithError = async (id: number) => {
  if (id === 2) await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  // if (!response.ok) return new Error('Failed to fetch');
  if (id === 2) throw new Error('Failed to fetch');

  return response.json();
};
