import { useEffect, useState } from 'react';

import store from '../store';
import api from '../api';
import addSection from '../actions/addSection';

const useFetchSection = (entity, sectionType, section) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    api
      .get(`${entity}/by-${sectionType}/${section}`)
      .then(res => {
        const data = res.data._items.reduce(
          (acc, cur) => ({
            ...acc,
            [cur._uuid]: cur,
          }),
          {}
        );
        store.dispatch(addSection(entity, sectionType, section, data));
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [entity, sectionType, section]);
  return { loading, error };
};

export default useFetchSection;
