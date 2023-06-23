import { UnAuthorizedError } from "../errors/errors.js";

const checkPermission = (requestUserId, userIdCheck) => {
  if (requestUserId === userIdCheck) return;
  throw new UnAuthorizedError("You have no permission to access this route.");
};

export default checkPermission;
