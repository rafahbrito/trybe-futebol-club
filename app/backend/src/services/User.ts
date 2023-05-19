import { compareSync } from 'bcryptjs';
import HttpErrorGenerator from '../helpers/httpErrorGenerator';
import UserModel from '../database/models/User';
import { createToken } from '../auth/jwt';

export default class UserService {
  static async login(email: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user || !compareSync(password, user.password)) {
      throw new HttpErrorGenerator(401, 'Invalid email or password');
    }
    const token = createToken(email);
    return token;
  }

  static async userRole(email: string): Promise<string | null> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) throw new HttpErrorGenerator(404, 'User not found');
    return user?.dataValues.role;
  }
}
