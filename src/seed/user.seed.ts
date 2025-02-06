import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { RoleTypes } from '../auth/types/role';

const prisma = new PrismaClient();

const ADMIN_USER = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@email.com',
  password: bcrypt.hashSync('password', 10),
  role: RoleTypes.ADMIN,
};

async function main() {
  console.log('Seeding admin user...');
  await prisma.user.create({ data: ADMIN_USER });
}

main()
  .catch((e) => console.error(e))
  .finally(() => {
    void prisma.$disconnect();
  });
