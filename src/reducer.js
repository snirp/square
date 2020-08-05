import { combineReducers } from 'redux';

import { filterByValue } from './utils';

/** Rheocube API entities with standard reducers */
const standardEntities = [
  'organization',
  'project',
  'user',
  'userOrganization',
  'userProject',
  'fluid',
  'particle',
  'material',
  'sample',
  'state',
  'experiment',
  'postprocess',
  'projectCost',
  'experimentCost',
  'postprocessCost',
  'fluidSchema',
  'particleSchema',
  'materialSchema',
  'sampleSchema',
  'stateSchema',
  'experimentSchema',
];

/** Higher order function to create reducers for standard entities
 * Data is an object where the key is the _uuid, or version (in case of schema) */
const createStandardEntityReducer = entity => (
  state = {},
  { type, key, data, sectionType, section }
) => {
  switch (type) {
    case `add-${entity}`:
    case `edit-${entity}`:
      return {
        ...state,
        ...data,
      };
    case `add-${entity}-section`:
      return {
        ...filterByValue(state, val => val[sectionType] !== section),
        ...data,
      };
    case `add-${entity}-all`:
      return data;
    case `delete-${entity}`: {
      const { [key]: _, ...rest } = state;
      return rest;
    }
    default:
      return state;
  }
};

const currentUser = (state = null, action) => {
  switch (action.type) {
    case 'setCurrentUser':
      return action.id;
    case 'unsetCurrentUser':
      return null;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  currentUser,
  ...standardEntities.reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: createStandardEntityReducer(cur),
    }),
    {}
  ),
});

export default rootReducer;
