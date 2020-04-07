export function calcEnumType(e: any) {
  const obj = [];
  for (const item in e) {
    if (+item >= 0) {
      obj.push({value: +item, text: e[item]});
    }
  }
  return obj;
}

export function calcEnumTypeString(e: any) {
  const obj = [];
  for (const item in e) {
    if (+item >= 0) {
      obj.push({value: e[item], text: e[item]});
    }
  }
  return obj;
}

export class NotNullObj {
  constructor(data) {
    const obj  = {};
    Object.keys(data).forEach(x => {
      if (data[x]) {
        obj[x] = data[x];
      }
    });
    return obj;
  }
}
