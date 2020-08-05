const addObjects = (entity, data) => ({
  type: `add-${entity}`,
  data,
});

export default addObjects;
