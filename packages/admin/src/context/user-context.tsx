import React from "react";
import { User } from "@/api/user";

export const UserContext: React.Context<{
  userInfo: User | undefined;
  refresh: any;
}> = React.createContext<{
  userInfo: User | undefined;
  refresh: undefined | (() => Promise<User | undefined>);
}>({
  userInfo: undefined,
  refresh: undefined,
});
