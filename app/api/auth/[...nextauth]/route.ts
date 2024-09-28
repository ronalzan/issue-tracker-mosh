import { handlers } from "@/auth";

//destructing assignment to extract specific properties from an object! And then we export the extracted properties
//this is a route handler that will listen the request made to endpoint such as /api/auth/......
export const { GET, POST } = handlers; 