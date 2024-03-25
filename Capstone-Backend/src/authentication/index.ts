import cognitoAuth from "./cog";
import basicAuth from "./basic";

export default (process.env.BLYAT == 'development') ? basicAuth : cognitoAuth;
