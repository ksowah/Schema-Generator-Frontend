import config from "@/config";
import { makeVar } from "@apollo/client";
import Cookies from "js-cookie";


export const isLoggedInVar = makeVar<boolean>(
  Boolean(Cookies.get(`schema-creator-token`))
);
export const currentTokenVar = makeVar<string | undefined>(
  Cookies.get(`schema-creator-token`) || undefined
);
export const currentUserVar = makeVar<User | undefined>(
  JSON.parse(Cookies.get(`schema-creator-user`) ?? "{}") as User
);

export const setAuth = ({
  user,
  token,
}: {
  user: User;
  token: string;
}): void => {
  Cookies.set(`schema-creator-user`, JSON.stringify(user), {
    ...config.cookies,
    expires: 1,
  });
  Cookies.set(`schema-creator-token`, token, { ...config.cookies, expires: 1 });
  isLoggedInVar(true);
  currentUserVar(user);
  currentTokenVar(token);
};

export const setMe = (user: User): void => {
  Cookies.set(`schema-creator-user`, JSON.stringify(user), {
    ...config.cookies,
    expires: 1,
  });
  currentUserVar(user);
};

export const clearAuth = (): void => {
  isLoggedInVar(false);
  currentTokenVar(undefined);
  // TODO: handle extra checks for better user experience
  Object.keys(Cookies.get()).forEach((key) => {
    Cookies.remove(key, { ...config.cookies });
  });
};
