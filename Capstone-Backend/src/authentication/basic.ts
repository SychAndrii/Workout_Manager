import { strategy } from "./basic-auth";
import { authenticate } from "./basic-auth";

/** A class interface that contains functions that uses BasicAuth Strategy and Authentication method  */
export default class auth {
    static strat(): any {
        return strategy();
    }

    static authentication(): any {
        return authenticate();
    }
}
