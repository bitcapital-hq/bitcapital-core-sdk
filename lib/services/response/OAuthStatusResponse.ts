export interface OAuthStatusResponseSchema {
  name: string;
  version: string;
  env: string;
  uptime: number;
}

export default class OAuthStatusResponse implements OAuthStatusResponseSchema{
  name: string;
  version: string;
  env: string;
  uptime: number;

  constructor(data: OAuthStatusResponseSchema) {
    this.name = data.name;
    this.version = data.version;
    this.env = data.env;
    this.uptime = data.uptime;
  }
}
