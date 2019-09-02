import React, { useState, useEffect, useCallback } from 'react';

import useHTTP from '../useHTTP';

const List = () => {
  const transformData = useCallback((r) => (r.map((d) => ({
    ...d,
    name: d.name.toUpperCase()
  }))), []);
  const [fetchOptions] = useState({ transformData });

  const { data, fetch } = useHTTP('http://jsonplaceholder.typicode.com/users', fetchOptions);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (<section>
    <h2>
      List&nbsp;
      <button
        type="button"
        onClick={() => {
          fetch();
        }}
      >
        fetch
      </button>
    </h2>
    <If condition={data}>
      <ul>
        <For each="user" of={data}>
          <li key={user.id}>{user.name}</li>
        </For>
      </ul>
    </If>
  </section>);
};

export default List;
