import { Amplify } from "aws-amplify";
import { ENV } from "../consts";

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: ENV.COGNITO_USER_POOL_ID!,
      userPoolClientId: ENV.COGNITO_CLIENT_ID!,
    },
  },
};

Amplify.configure(amplifyConfig, { ssr: true });

export default Amplify;
