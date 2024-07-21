import { useState } from 'react';
import App23 from './23. Why You Need React Query/App23';

const postTitles = [
  '#1: Practical React Query',
  '#2: React Query Data Transformations',
  '#3: React Query Render Optimizations',
  '#4: Status Checks in React Query',
  '#5: Testing React Query',
  '#6: React Query and TypeScript',
  '#7: Using WebSockets with React Query',
  '#8: Effective React Query Keys, #8a: Leveraging the Query Function Context',
  '#9: Placeholder and Initial Data in React Query',
  '#10: React Query as a State Manager',
  '#11: React Query Error Handling',
  '#12: Mastering Mutations in React Query',
  '#13: Offline React Query',
  '#14: React Query and Forms',
  '#15: React Query FAQs',
  '#16: React Query meets React Router',
  '#17: Seeding the Query Cache',
  '#18: Inside React Query',
  '#19: Type-safe React Query',
  '#20: You Might Not Need React Query',
  '#21: Thinking in React Query',
  '#22: React Query and React Context',
  '#23: Why You Want React Query',
  '#24: The Query Options API',
  '#25: Automatic Query Invalidation after Mutations',
];

function App() {
  const [postId, setPostId] = useState(1);

  const showPost = () => {
    if (postId === 23) return <App23 />;
    return <div className="text-3xl text-red-500">번역 아직 안함</div>;
  };

  const renderNavigationList = () => {
    return (
      <div className="flex flex-col items-start text-xl">
        {postTitles.map((postTitle, index) => (
          <button onClick={() => setPostId(index + 1)}>{postTitle}</button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 pb-80">
      <h1 className="text-5xl">글을 선택해주세요</h1>
      {renderNavigationList()}
      <h2 className="text-4xl">보고있는 글: {postId}번</h2>
      {showPost()}
    </div>
  );
}

export default App;
