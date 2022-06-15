import { handler } from "../Lambdas/getUser";
import {
  eventWithoutPathParameters,
  eventWithPathParameters,
  validAPIGatewayProxyEvent
} from "./MockData/APIGatewayProxyEvent";
import {
  Callback,
  Context,
  APIGatewayProxyEvent,
  APIGatewayEvent
} from "aws-lambda";
import { APIGatewayProxyEventWithId } from "../Types/IAPIGatewayProxyEvent";
import axios from "axios";
import {
  BAD_REQUEST_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
  USER_NOT_FOUND_RESPONSE
} from "../Constants/ResponseErrors";
import { userApiResponse, userResponseObject } from "./MockData/apiResponses";

jest.mock("axios");

describe("getUser lambda tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("handler returns a 400 when invoked with an empty event", async () => {
    const response = await handler(
      {} as APIGatewayEvent,
      {} as Context,
      {} as Callback
    );

    expect(response).toEqual(BAD_REQUEST_RESPONSE);
  });

  test("handler returns a 400 when invoked with event without path parameter id", async () => {
    const response = await handler(
      validAPIGatewayProxyEvent as APIGatewayProxyEvent,
      {} as Context,
      {} as Callback
    );

    expect(response).toEqual(BAD_REQUEST_RESPONSE);
  });

  test("handler returns a 400 when invoked with event without path parameters id 2", async () => {
    const response = await handler(
      eventWithoutPathParameters as APIGatewayProxyEventWithId,
      {} as Context,
      {} as Callback
    );

    expect(response).toEqual(BAD_REQUEST_RESPONSE);
  });

  test("handler returns a 200 when invoked with event with path parameters", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: userApiResponse,
      status: 200
    });

    const response = await handler(
      eventWithPathParameters as APIGatewayProxyEventWithId,
      {} as Context,
      {} as Callback
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("baseUrl/api/users/2");
    expect(response).toBeTruthy();
    expect(response).toEqual(userResponseObject);
  });

  test("handler returns a 404 when no response is present", async () => {
    (axios.get as jest.Mock).mockResolvedValue(null);

    const response = await handler(
      eventWithPathParameters as APIGatewayProxyEventWithId,
      {} as Context,
      {} as Callback
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("baseUrl/api/users/2");
    expect(response).toEqual(USER_NOT_FOUND_RESPONSE);
  });

  test("handler returns a 500 when an error occurs", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Async error"));

    const response = await handler(
      eventWithPathParameters as APIGatewayProxyEventWithId,
      {} as Context,
      {} as Callback
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(response).toEqual(INTERNAL_SERVER_ERROR_RESPONSE);
  });
});
