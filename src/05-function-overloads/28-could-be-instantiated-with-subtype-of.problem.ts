import { Equal, Expect } from "../helpers/type-utils";

const obj = {
  a: 1,
  b: 2,
  c: 3,
} as const;

type ObjKey = keyof typeof obj;






function getObjKey <>() {
  return obj[key];
};
function getObjKey <TKey extends ObjKey>(key: TKey = "a") {
  return obj[key];
};
function getObjKey<TKey extends ObjKey>(key: TKey = "b") {
  return obj[key];
};
function getObjKey<TKey extends ObjKey>(key: TKey = "c") {
  return obj[key];
};

const one = getObjKey("a");
const oneByDefault = getObjKey();
const two = getObjKey("b");
const three = getObjKey("c");

type tests = [
  Expect<Equal<typeof one, 1>>,
  Expect<Equal<typeof oneByDefault, 1>>,
  Expect<Equal<typeof two, 2>>,
  Expect<Equal<typeof three, 3>>,
];
