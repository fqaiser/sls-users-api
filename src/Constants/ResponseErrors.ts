import { getResponseObject } from "../Libs/getResponseObject";

export const INTERNAL_SERVER_ERROR_RESPONSE = getResponseObject(
  500,
  "Internal Server Error"
);

export const BAD_REQUEST_RESPONSE = getResponseObject(400, "Bad Request");

export const USER_NOT_FOUND_RESPONSE = getResponseObject(404, "User Not Found");
