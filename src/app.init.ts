import { RolesRepository } from './modules/auth/repositories/roles.repository';
import * as roles from '../data/roles.json';
import { RoleEnum } from './modules/auth/entities/role.entity';

export async function seedDb(rolesRepository: RolesRepository) {
  const r = await rolesRepository.find();
  if (r.length == 0) {
    console.log('No ROLES found. INITIALIZING ... ');
    await Promise.all(
      roles.map(async (role) => {
        const ro = await rolesRepository.create({
          name: role.name as RoleEnum
        });
        await rolesRepository.save(ro);
      })
    );
    console.log('Roles initialized!');
  }
}
