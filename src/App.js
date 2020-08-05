import React from 'react';
import { useSelector } from 'react-redux';

import useFetchObject from './hooks/useFetchObject';
import useFetchSection from './hooks/useFetchSection';

const App = () => {
  const id = 'ce87155f-14b6-46ef-9287-227422024b2e';
  const { loading } = useFetchObject('project', id);
  useFetchSection('particle', 'project', id);
  useFetchSection('fluid', 'project', id);

  const project = useSelector(state => state.project[id]);
  const fluids = useSelector(state => Object.values(state.fluid).filter(val => val.project === id));

  return (
    <div>
      <p>project: {loading ? 'loading' : 'loaded'}</p>
      <h1>{project && project.name}</h1>
      {fluids.map(fluid => (
        <div key={fluid._uuid}>{fluid.name}</div>
      ))}
    </div>
  );
};

export default App;
