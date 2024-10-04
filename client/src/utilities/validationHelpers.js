export const isStateEmpty = (state) => {
  return Object.keys(state).some((key) => !state[key]);
};

export const mapValidationToState = (user, schema) => {
  const { error } = schema.validate(user);
  if (error) {
    return error.details
      .map((validObj) => {
        return { [validObj.context.key]: validObj.message };
      })
      .reduce((initialObject, currentObject) => {
        return { ...initialObject, ...currentObject };
      });
  }
  return null;
};
