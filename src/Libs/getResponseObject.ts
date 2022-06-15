import { APIGatewayProxyResult } from "aws-lambda";
import { IUser } from "../Interfaces/IUserData";

export const getResponseObject = (
  statusCode: number,
  message: string | IUser
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify({
      message
    })
  };
};
