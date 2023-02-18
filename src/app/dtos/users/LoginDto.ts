import {UserDto} from './UserDto';

export interface LoginDto {
  loginStatus: string | null | undefined;
  logoutStatus: string | null | undefined;
  user: UserDto | null | undefined;
}
