import 'reflect-metadata';
import 'typeorm-typedi-extensions';

import { Container } from 'typedi';
import { db } from './db';
import { UserService } from './entity/user/User.service';
import { serverPromise } from './server';

const init = async () => {
  await db;
  const server = await serverPromise;
  await server.start();

  const userService = Container.get(UserService);
  await userService.removeAll();

  const user = await userService.addNew({
    emailAddress: 'michal@miszczyszyn.com',
    password: 'qwerty',
    role: 'admin'
  });

  user.password = 'qwerty123';
  await userService.update(user);

  const users = await userService.findAll();
  console.log(user, users);

  return server;
};

init()
  .then((server) => {
    console.log(`Server running at: ${server.info!.uri}`);
    console.log(server.info);
  })
  .catch((err) => console.error(err));
