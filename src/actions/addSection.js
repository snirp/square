const addSection = (entity, sectionType, section, data) => ({
  type: `add-${entity}-section`,
  sectionType,
  section,
  data,
});

export default addSection;
