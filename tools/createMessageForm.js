import moment from "moment/moment.js";

export const formatMessage = (login, name, text) => {
  return {
    login,
    name,
    text,
    time: moment().format("h:mm a"),
  };
};
