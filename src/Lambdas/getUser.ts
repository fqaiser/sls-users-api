import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from "aws-lambda";
import axios, { AxiosResponse } from "axios";
import {
  BAD_REQUEST_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
  USER_NOT_FOUND_RESPONSE
} from "../Constants/ResponseErrors";

import { IUser, IUserData } from "../Interfaces/IUserData";
import { getResponseObject } from "../Libs/getResponseObject";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    console.error("Internal Server Error");
    return INTERNAL_SERVER_ERROR_RESPONSE;
  }

  if (!event.pathParameters || !event.pathParameters.id) {
    return BAD_REQUEST_RESPONSE;
  }

  const url = `${baseUrl}/api/users/${event.pathParameters?.id}`;

  let response: AxiosResponse<IUserData>;

  try {
    response = await axios.get(url);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status) {
      return USER_NOT_FOUND_RESPONSE;
    }
    console.error("Internal Server Error");
    return INTERNAL_SERVER_ERROR_RESPONSE;
  }

  if (!response || !response.data) {
    return USER_NOT_FOUND_RESPONSE;
  }

  const responseUser: IUserData = response.data;

  return getResponseObject(200, {
    id: responseUser.data.id,
    email: responseUser.data.email,
    first_name: responseUser.data.first_name,
    last_name: responseUser.data.last_name,
    avatar: responseUser.data.avatar
  } as IUser);
};
