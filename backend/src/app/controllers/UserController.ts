import type UserRepository from '../../database/repositories/UserRepository.js';

export default class UserController {
  private userRepository: UserRepository;

  public UserController(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}