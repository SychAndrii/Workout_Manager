import { strategy } from "./cognito";
import { authenticate } from "./cognito";

/** A class interface that contains functions that uses Cognito Strategy and Authentication method  */
export default class auth {
    static strat(): any {
        return strategy();
    }

    static authentication(): any {
        return authenticate();
    }
}
