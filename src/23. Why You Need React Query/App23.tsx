import { useState } from 'react';
import { Post } from './Components/Post';
import { PostUsingIgnoreFlag } from './Components/Post';
import { PostWithLoading } from './Components/Post';
import { InitiateDataUndefined } from './Components/Post';
import { DataAndErrorAreNotReset } from './Components/Post';
import { DataAndErrorReset } from './Components/Post';
import { WithReactQuery } from './Components/Post';

export default function App23() {
  const [postId, setPostId] = useState(1);

  const goPost = (id: number) => {
    setPostId(id);
  };

  return (
    <div>
      <div>
        각 요청에 대한 응답이 순서대로 도착하지 않을 수도 있다. 즉 `category`를 `books` 에서
        `movies`로 변경했을때 `movies`에 대한 응답이 `books`에 대한 응답보다 먼저 도착하면,
        컴포넌트에 잘못된 데이터가 표시될 수 있다.
      </div>
      <h1 className="text-3xl">1. Race Condition 🏎</h1>
      <div className="flex-col flex gap-4">
        <div className="text-2xl">
          2번을 클릭하고 빠르게 1번을 클릭해보자. 내부 상태와 실제 포스트가 불일치한다.
        </div>
        <div className="flex gap-2">
          <button className="border p-2 bg-yellow-400" onClick={() => goPost(1)}>
            1번 포스트 fetch
          </button>
          <button className="border p-2 bg-yellow-400" onClick={() => goPost(2)}>
            2번 포스트 fetch (1초 더 걸림)
          </button>
        </div>
        <h1 className="text-2xl">내부 상태: {postId}번</h1>
        <div>
          <Post id={postId} />
        </div>
        <div>
          <PostUsingIgnoreFlag id={postId} />
        </div>
        <h1 className="text-3xl">2. Loading state 🕐</h1>
        <div>
          <PostWithLoading id={postId} />
        </div>
        <h1 className="text-3xl">3. Empty state 🗑️</h1>
        <div>
          <InitiateDataUndefined id={postId} />
        </div>
        <h1 className="text-3xl">4. Data & Error are not reset when category changes 🔄</h1>
        <div>
          <DataAndErrorAreNotReset id={postId} />
        </div>
        <div>
          <DataAndErrorReset id={postId} />
        </div>
        <h1 className="text-3xl">React query 사용</h1>
        <div>
          <WithReactQuery id={postId} />
        </div>
      </div>
    </div>
  );
}
