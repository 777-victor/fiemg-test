/* eslint-disable @typescript-eslint/no-shadow */
import httpStatus from 'http-status';
import * as bcrypt from 'bcrypt';
import { IUser } from '@models/interfaces/IUser';
import IUserService from '@services/contracts/IUserService.js';
import responseHandler from '@helpers/responseHandler';
import UserDao from '@dao/implementations/UserDao';
import { logger } from '@/src/helpers/logger';
import User from '@/src/models/User';

export default class UserService implements IUserService {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }
  createUser = async (userBodyReq: IUser) => {
    try {
      const userBody: IUser = userBodyReq;
      let message = 'User created successfully';

      if (await this.userDao.isEmailExists(userBody.email)) {
        message = 'Email already taken';
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      if (!userBody.password?.trim()) {
        message = 'Password is required!';
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      userBody.password = bcrypt.hashSync(userBody.password, 8);

      let userData = await this.userDao.create(userBody);

      if (!userData) {
        message = 'Registration Failed! Please Try again.';
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      userData = userData.toJSON();
      delete userData.password;

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        message,
        userData,
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        'Something went wrong!',
      );
    }
  };

  async updateUser(userBodyReq: IUser) {
    try {
      let message = 'User updated successfully';
      const userBody: IUser = userBodyReq;

      if (!userBody.id) {
        message = "'id' is required";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      const user: User | null = await this.userDao.findById(userBody.id);

      if (!user) {
        message = 'User not found';
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      if (userBody.password?.trim()) {
        userBody.password = bcrypt.hashSync(userBody.password, 8);
      } else {
        userBody.password = user.password;
      }

      const userUpdated = await this.userDao.updateById(userBody, user.id);

      if (!userUpdated) {
        message = 'Updated Failed! Please Try again.';
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      let userDTO = await this.userDao.findById(user.id);
      if (userDTO) {
        userDTO = userDTO.toJSON();
        delete userDTO.password;
        delete userDTO.deletedAt;
      }

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        message,
        userDTO,
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        'Something went wrong!',
      );
    }
  }

  delete = async (id: string) => {
    try {
      let message = 'User deleted successfully';

      const user: User | null = await this.userDao.findById(Number(id));
      if (!user) {
        message = 'User not found';
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      await this.userDao.deleteByWhere({ id: Number(id) });

      return responseHandler.returnSuccess(httpStatus.OK, message);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        'Something went wrong!',
      );
    }
  };

  getUserById = async (id: string) => {
    return await this.userDao.findById(Number(id));
  };
}
