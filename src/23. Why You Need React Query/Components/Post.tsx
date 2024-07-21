import { useEffect, useState } from 'react';
import { getPost, getPostWithError, Post as PostType } from '../apis';
import { useQuery } from '@tanstack/react-query';

interface Props {
  id: number;
}

// useEffect, fetch만 사용한 기본 형태
export function Post({ id }: Props) {
  const [data, setData] = useState<PostType>({ id: 0, title: '' });
  const [error, setError] = useState();

  useEffect(() => {
    getPost(id)
      .then((d) => setData(d))
      .catch((e) => setError(e));
  }, [id]);

  return (
    <>
      <div>경쟁상태 존재</div>
      <div>{data.title}</div>
    </>
  );
}

// + ignore flag 이용해 race condition 해결
export function PostUsingIgnoreFlag({ id }: Props) {
  const [data, setData] = useState<PostType>({ id: 0, title: '' });
  const [error, setError] = useState();

  useEffect(() => {
    let rerendered = false;
    getPost(id)
      .then((d) => {
        if (!rerendered) setData(d);
      })
      .catch((e) => {
        if (!rerendered) {
          setError(e);
        }
      });

    return () => {
      rerendered = true;
    };
  }, [id]);

  return (
    <>
      <div>rerendered flag 이용해 경쟁상태 해결</div>
      <div>{data.title}</div>
    </>
  );
}

// + 로딩 상태 핸들링
export function PostWithLoading({ id }: Props) {
  const [data, setData] = useState<PostType>({ id: 0, title: '' });
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let rerendered = false;

    setIsLoading(true);
    getPost(id)
      .then((d) => {
        if (!rerendered) setData(d);
      })
      .catch((e) => {
        if (!rerendered) {
          setError(e);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      rerendered = true;
    };
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div>+ 로딩 상태 핸들링</div>
      <div>{data.title}</div>
    </>
  );
}

// + data = undefined로 초기화
export function InitiateDataUndefined({ id }: Props) {
  const [data, setData] = useState<PostType>(); // undefined
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let rerendered = false;

    setIsLoading(true);
    getPost(id)
      .then((d) => {
        if (!rerendered) setData(d);
      })
      .catch((e) => {
        if (!rerendered) {
          setError(e);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      rerendered = true;
    };
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>no data</div>;

  return (
    <>
      <div>data undefined로 초기화</div>
      <div>{data.title}</div>
    </>
  );
}

// + data = undefined로 초기화
export function DataAndErrorAreNotReset({ id }: Props) {
  const [data, setData] = useState<PostType>(); // undefined
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let rerendered = false;

    setIsLoading(true);
    getPostWithError(id)
      .then((d) => {
        if (!rerendered) setData(d);
      })
      .catch((e) => {
        if (!rerendered) {
          setError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      rerendered = true;
    };
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>no data</div>;

  return (
    <>
      <div>서로 다른 요청으로 받은 error(fetch2)상태와 data(fetch1)상태가 중첩될 수 있다.</div>
      {error && <div>Error!!</div>}
      <div className="text-blue-600">data: {data.title}</div>
      <div className="text-red-600">error: {error ? 'true' : 'false'}</div>
    </>
  );
}

// data, error 상태를 초기화해서 이전 fetch 결과 흔적을 지운다.
export function DataAndErrorReset({ id }: Props) {
  const [data, setData] = useState<PostType>();
  const [error, setError] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let rerendered = false;

    setIsLoading(true);
    getPostWithError(id)
      .then((d) => {
        if (!rerendered) {
          setData(d);
          setError(false); // error 초기화
        }
      })
      .catch((e) => {
        if (!rerendered) {
          setError(true);
          setData(undefined); // data 초기화
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      rerendered = true;
    };
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  // if (!data) return <div>no data</div>;

  return (
    <>
      <div>다음 fetch 시 이전 fetch 결과 흔적인 data, error 상태를 초기화한다.</div>
      {error && <div>Error!!</div>}
      <div className="text-blue-600">data: {data?.title}</div>
      <div className="text-red-600">error: {error ? 'true' : 'false'}</div>
    </>
  );
}

// 위 기능들은 react query에 다 구현되어있다.
export function WithReactQuery({ id }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPostWithError(id),
  });

  if (isLoading) return <div>Loading...</div>;
  // if (!data) return <div>no data</div>;

  return (
    <>
      <div> 위 기능들은 react query에 다 구현되어있다.</div>
      {error && <div>Error!!</div>}
      <div className="text-blue-600">data: {data?.title}</div>
      <div className="text-red-600">error: {error ? 'true' : 'false'}</div>
    </>
  );
}
