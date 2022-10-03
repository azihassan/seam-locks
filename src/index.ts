import Seam from "./client";
import LocksClient from "./locks";

const http = new Seam("", "");
const locks = new LocksClient(http);
