import { EntityRepository, Repository } from 'typeorm';
import { Role, RoleEnum } from '../entities/role.entity';

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {
  getByNames(names: RoleEnum[]) {
    return this.find({
      where: [
        ...names.map((n) => ({
          name: n
        }))
      ]
    });
  }
}
