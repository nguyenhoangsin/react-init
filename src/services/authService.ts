import { redirect } from 'react-router-dom';
import localStorageUtils from '../utils/localStorageUtils';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}
export enum Permission {
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
  EDIT_USER = 'EDIT_USER',
  DELETE_POST = 'DELETE_POST',
}

interface User {
  isAuthenticated: boolean;
  isFirstLogin: boolean | null;
  username: string | null;
  role: UserRole | null;
  permissions: Permission[] | null;
}
interface AuthProvider extends User {
  signin(username: string): Promise<void>;
  signout(): Promise<void>;
  hasAllowedRoles(allowedRoles: UserRole[]): boolean;
  hasPermission(permission: Permission): boolean;
}

const AUTH_USER = 'AUTH_USER';
let user: User | null = localStorageUtils.getItem<User>(AUTH_USER);

export const authProvider: AuthProvider = {
  isAuthenticated: user ? user.isAuthenticated : false,
  isFirstLogin: user ? user.isFirstLogin : false,
  username: user ? user.username : null,
  role: user ? user.role : null,
  permissions: user ? user.permissions : null,
  async signin(username: string) {
    await new Promise((r) => setTimeout(r, 500));
    localStorageUtils.setItem(AUTH_USER, {
      isAuthenticated: true,
      username: username,
    });
    authProvider.isAuthenticated = true;
    authProvider.isFirstLogin = true;
    authProvider.username = username;
    authProvider.role = UserRole.ADMIN;
    authProvider.permissions = [];
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500));
    localStorageUtils.removeItem(AUTH_USER);
    user = null;
    authProvider.isAuthenticated = false;
    authProvider.isFirstLogin = null;
    authProvider.username = null;
    authProvider.role = null;
    authProvider.permissions = null;
  },
  hasAllowedRoles(allowedRoles: UserRole[]): boolean {
    if (authProvider.role && allowedRoles.includes(authProvider.role)) {
      return true;
    }

    return false;
  },
  hasPermission(permission: Permission): boolean {
    if (!authProvider.permissions) return false;

    return authProvider.permissions.includes(permission);
  },
};

export function authLoader() {
  if (authProvider.isFirstLogin) {
    return redirect('/change-password');
  }

  if (!authProvider.isAuthenticated) {
    return redirect('/login');
  }

  return null;
}

export function loginLoader() {
  if (authProvider.isFirstLogin) {
    return redirect('/change-password');
  }

  if (authProvider.isAuthenticated) {
    return redirect('/');
  }

  return null;
}

export function changePasswordLoader() {
  if (!authProvider.isAuthenticated) {
    return redirect('/login');
  }

  return null;
}

export default authProvider;
