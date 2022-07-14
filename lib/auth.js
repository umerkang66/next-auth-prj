import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
  return await hash(password, 12);
}

export async function verify(password, hashedPassword) {
  return await compare(password, hashedPassword);
}
