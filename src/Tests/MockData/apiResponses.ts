import { getResponseObject } from "../../Libs/getResponseObject";

const user = {
  id: 2,
  email: "firstname.lastname@email.com",
  first_name: "FirstName",
  last_name: "LastName",
  avatar: "https://some-url.com/img/faces/some-image.jpg"
};

export const userApiResponse = {
  data: user,
  support: {
    url: "https://some-url.com",
    text: "Some text"
  }
};

export const userResponseObject = getResponseObject(200, user);
