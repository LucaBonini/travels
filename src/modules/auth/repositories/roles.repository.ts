import { EntityRepository, Repository } from 'typeorm';
import { Role, RoleEnum } from '../entities/role.entity';

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {
  getByName(name: RoleEnum) {
    return this.findOne({ name });
  }
}
