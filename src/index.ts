import AxiosClient from "./client";
import LocksClient from "./locks";

const http = new AxiosClient("", "");
const locks = new LocksClient(http);
