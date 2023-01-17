import { Equal, Expect } from "../helpers/type-utils";

const makeStatus = <TStatuses extends string[]>(statuses: TStatuses) => {
  return statuses;
};

const statuses = makeStatus(["INFO", "DEBUG", "ERROR", "WARNING"]);

type tests = [
  Expect<Equal<typeof statuses, Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">>>
];



// pass
In the first example, the function makeStatus is defined with a type parameter TStatuses that extends string. When the function is called with the argument ["INFO", "DEBUG", "ERROR", "WARNING"], the type parameter is inferred to be "INFO" | "DEBUG" | "ERROR" | "WARNING", and the return type of the function is therefore Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">. In this case, the test passes because the type of statuses is indeed Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">.
// fail
In the second example, the function makeStatus is defined with a type parameter TStatuses that extends string[]. When the function is called with the argument ["INFO", "DEBUG", "ERROR", "WARNING"], the type parameter is inferred to be ["INFO", "DEBUG", "ERROR", "WARNING"], and the return type of the function is therefore string[], not Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">. This cause the test to fail because the type of statuses is not Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">.