import { User } from "./userModel";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
