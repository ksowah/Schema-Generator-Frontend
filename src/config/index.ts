import packageJson from "../../package.json";

interface Config {
  env: "production" | "staging" | "sandbox" | "test" | "development";
  apollo:{
    uri: string;
    name: string
    version: string
  };
  cookies: {
    domain: string | undefined;
    secure: boolean;
    sameSite: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" 
  };
  constants: {
    page: number;
    pageSize: number;
    dateFormat: string;
  };
}


const config: Config = {
  env: (process.env.NODE_ENV as any) ?? "development",
  apollo:{
    uri: process.env.NEXT_PUBLIC_APOLLO_URI ?? "http://localhost:4000/graphql",
    name: packageJson.name,
    version: packageJson.version
  },
  cookies: {
    domain: typeof window !== 'undefined' ? window.location.hostname : process.env.NEXT_PUBLIC_DOMAIN,
    secure: true,
    sameSite: "strict",
  },
  constants: {
    page: 1,
    pageSize: 10,
    dateFormat: "",
  },
};

export default config