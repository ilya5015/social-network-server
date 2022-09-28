import moment from "moment/moment.js";

export const formatMessage = (id, name, text) => {
  return {
    id,
    name,
    text,
    time: moment().format("h:mm a"),
  };
};
