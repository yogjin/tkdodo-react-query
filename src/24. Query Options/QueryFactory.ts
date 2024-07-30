import { queryOptions } from '@tanstack/react-query';
import { getPost, getPosts, getTodos } from './apis';

export const postQueries = {
  all: () => queryOptions({ queryKey: ['posts'], queryFn: getPosts }),
  details: () => [...postQueries.all().queryKey, 'details'],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...postQueries.details(), id],
      queryFn: () => getPost(id),
      staleTime: 5000,
    }),
};

export const todoQueries = {
  all: () => queryOptions({ queryKey: ['todos'], queryFn: getTodos }),
};
