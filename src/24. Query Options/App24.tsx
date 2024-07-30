import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { getPosts, postPost, postTodo } from './apis';
import { queryClient } from '../main';
import { todoQueries } from './QueryFactory';
import { useState } from 'react';

// query option
const postsQuery = {
  queryKey: ['posts'],
  queryFn: getPosts,
  staleTime: 5000,
};

// 1. query option을 선언해두면 react query의 모든 메서드에서 재사용할 수 있어서 편하다.
// useQuery(postsQuery)
// useSuspenseQuery(postsQuery)
// queryClient.prefetchQuery(postsQuery)
// useQueries({ queries: [postsQuery] });

// 2. queryOptions를 쓰자.
// Typescript의 구조적 타이핑 때문에 잘못된 속성으로 선언해도 에러가 나지않는다.
const postsQueryWithWrongProperty = {
  queryKey: ['posts'],
  queryFn: getPosts,
  stallTime: 5000,
};
const Component = () => {
  useQuery(postsQueryWithWrongProperty);
  return <></>;
};

// queryOptions 함수의 도움을 받아 타입 안정성을 높이자.
const postsQueryHelper = queryOptions({
  queryKey: ['posts'],
  queryFn: getPosts,
  stallTime: 5000, // 에러
});
const Component2 = () => {
  useQuery(postsQueryHelper);
  return <></>;
};

// 타입 안정성뿐만 아니라 타입 추론 도움도 받을 수 있다.
// const key = postsQueryHelper.queryKey;
// const data = queryClient.getQueryData(postsQuery.queryKey); // unknown으로 추론됨. 따라서 <Post[]> 제네릭 써야함.
// const data2 = queryClient.getQueryData(postsQueryHelper.queryKey); // Post[] | undefined로 바로 추론

/**
 * Query Factory 패턴과 queryOptions을 이용해 useQuery를 사용하는 예제
 * apis.ts, QueryFactory.ts 내부 todos 코드
 */
const App24 = () => {
  const [value, setValue] = useState('');
  const { data: todos } = useQuery(todoQueries.all()); // factory에서 선언한 queryOptions로 만든 쿼리 객체 이용해 useQuery 호출
  const { mutate: _postTodo } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todoQueries.all().queryKey }), // todoQueries에서 가져온 queryKey로 invalidate
  });

  const addTodo = () => {
    if (!value) return;
    _postTodo(value);
    setValue('');
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-10 border w-36"
          placeholder="새로운 투두 입력"
        />
        <button onClick={addTodo} className="p-2 text-gray-100 bg-blue-500 border">
          투두 추가하기
        </button>
      </div>
      {todos?.map((todo, index) => (
        <div key={index}>{todo}</div>
      ))}
    </>
  );
};

export default App24;
