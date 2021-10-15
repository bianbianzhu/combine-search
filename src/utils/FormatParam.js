export const isFalsy = (value) => (value === 0 ? false : !value);

//step 1
//{_id:"", incident_name: "adfadf"} => {incident_name: "adfadf"}
export const cleanEmptyParam = (param) => {
  const copiedParam = { ...param };
  Object.keys(copiedParam).forEach((key) => {
    if (isFalsy(copiedParam[key])) {
      delete copiedParam[key];
    }
  });
  return copiedParam;
};

//step 2
//{_id:"123", incident_name: "adfadf"}
export const paramAttributeNameChange = (param, currentName, newName) => {
  const copiedParam = { ...param };
  const valueOfnewName = copiedParam[currentName];

  if (isFalsy(valueOfnewName)) {
    console.log("check whether the old name is typed correctly OR the value is null");
  } else {
    copiedParam[newName] = valueOfnewName;
    delete copiedParam[currentName];
  }

  return copiedParam;
};
