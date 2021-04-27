import socketIOClient from "socket.io-client";
import { SERVER } from './appconstants';

export default socketIOClient(SERVER); 