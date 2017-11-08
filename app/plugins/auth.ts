import * as Hapi from 'hapi';
import * as HapiAuthJwt from 'hapi-auth-jwt2';
import { UserRoles } from '../entity/user/User.model';
import { configService } from '../services/configService';

// tslint:disable-next-line:no-empty-interface
export interface AuthPluginOptions { }

export interface AuthInfo {
  id: number;
  role: UserRoles;
}

const validate = (decoded: AuthInfo, _request: Hapi.Request, callback: Hapi.ServerMethodNext) => {
  if (!decoded || !decoded.id) {
    return callback(null, false);
  } else {
    return callback(null, true);
  }
};

const after = (server: Hapi.Server) => {
  server.auth.strategy('jwt', 'jwt', {
    key: configService.getJwtSecret(),
    tokenType: 'Bearer',
    urlKey: false,
    validateFunc: validate,
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.auth.default('jwt');
};

export const auth: Hapi.PluginRegistrationObject<AuthPluginOptions> = {
  register(server, _options, next) {
    server.register(HapiAuthJwt)
      .then(() => after(server))
      .then(() => {
        next();
      })
      .catch(next);
  },
};

auth.register.attributes = {
  name: 'Fefaq Auth Plugin',
  version: '1.0.0',
};
