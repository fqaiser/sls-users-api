import { APIGatewayProxyEvent } from "aws-lambda";

export type APIGatewayProxyEventWithId = APIGatewayProxyEvent & {
  pathParameters: {
    id: number | null;
  };
};
