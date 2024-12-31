/* eslint-disable @typescript-eslint/no-explicit-any */
interface ENV {
  [key: string]: any;
}

const env: ENV = {
  baseGatewayUrl: process.env.REACT_APP_BASE_GATEWAY_URL
};

export default env;