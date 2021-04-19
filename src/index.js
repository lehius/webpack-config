import "./styles/index.scss";
import {createLogger} from "./common";

const logger = createLogger('foo');

const foo = {
  field1: 2,
  field2: 1,
  field3: 4,
};
logger.log(`create foo: ${JSON.stringify(foo)}`);

const fooGa = {
  ...foo,
  field4: 3,
};

logger.log(`create fooGa: ${JSON.stringify(fooGa)}`);

console.dir(logger.getLogs());
