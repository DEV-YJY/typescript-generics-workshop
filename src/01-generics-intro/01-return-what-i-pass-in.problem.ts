import { Equal, Expect } from "../helpers/type-utils";

// defined with the const keyword
const returnWhatIPassIn = <T>(t: T) => {
  return t;
};

// defined with the function keyword
// function returnWhatIPassIn<T>(t: T) {
//   return t
// }

const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn("matt");

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];
