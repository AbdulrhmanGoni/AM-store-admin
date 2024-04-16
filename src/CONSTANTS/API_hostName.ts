let hostName = "http://localhost:7000";

if (import.meta.env.VITE_NODE_ENV === "production") {
    hostName = import.meta.env.VITE_SERVER_HOST_NAME;
}

export const host = `${hostName}/api`;
export const host_admin = `${host}/admin`;
export default host;