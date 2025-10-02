import { Role } from '@/lib/types';

export const canCreate = (role: Role): boolean => {
  return role === 'admin' || role === 'operador';
};

export const canUpdate = (role: Role): boolean => {
  return role === 'admin' || role === 'operador';
};

export const canDelete = (role: Role): boolean => {
  return role === 'admin';
};

export const canViewSettings = (role: Role): boolean => {
  return role === 'admin';
};

export const canManageUsers = (role: Role): boolean => {
  return role === 'admin';
};

export const canManageTenants = (role: Role): boolean => {
  return role === 'admin';
};

export const isReadOnly = (role: Role): boolean => {
  return role === 'leitor';
};
