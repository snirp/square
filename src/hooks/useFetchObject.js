import { useEffect, useState } from 'react';

import store from '../store';
import api from '../api';
import addObjects from '../actions/addObjects';

const useFetchObject = (entity, id) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    api
      .get(`${entity}/${id}`)
      .then(res => {
        store.dispatch(addObjects(entity, { [res.data._uuid]: res.data }));
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [entity, id]);
  return { loading, error };
};

export default useFetchObject;
