import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { RoleEnum } from './entities/role.entity';
import { RolesRepository } from './repositories/roles.repository';
import { UsersRepository } from './repositories/users.repository';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository;
  let rolesRepository;
  let jwtService;

  const userCredentialsDto = {
    email: 'luca.bonini@email.com',
    password: 'Password1!',
    roles: [RoleEnum.ADMIN]
  }

  const mockUser = {
    email: 'luca.bonini@email.com',
    id: 'b22268e4-c65e-42ea-b06a-b32024e2ebf5',
    password: '$2b$10$.SGFE6p1CQJN4Ab0hLpaRuxOWSJvt5J1Es5522rTefkSKTFLVfY3S',
    roles: [
      {
        id: "baf18948-721e-49f5-aa7f-bed1a5415cb6",
        name: "admin"
      }
    ]
  }

  const mockJwtService = () => ({
    sign: jest.fn()
  })

  const mockUsersRepository = () => ({
    createUser: jest.fn(),
    findOne: jest.fn()
  });
  const mockRolesRepository = () => ({
    getByNames: jest.fn()
  });

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useFactory: mockJwtService },
        { provide: UsersRepository, useFactory: mockUsersRepository },
        { provide: RolesRepository, useFactory: mockRolesRepository }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    rolesRepository = module.get<RolesRepository>(RolesRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a new user and returns true', async () => {
      expect(rolesRepository.getByNames).not.toHaveBeenCalled();
      rolesRepository.getByNames.mockResolvedValue({
        id: "baf18948-721e-49f5-aa7f-bed1a5415cb6",
        name: "admin"
      });
      const result = await service.signUp(userCredentialsDto)
      expect(result).toBe(true)
    })
  })

  describe('signIn', () => {
    it('should sign in and return the access token', async () => {
      expect(usersRepository.findOne).not.toHaveBeenCalled();
      usersRepository.findOne.mockResolvedValue(mockUser);
      jwtService.sign.mockResolvedValue('asasasasasasasasasas')
      const result = await service.signIn(userCredentialsDto);
      expect(result).toEqual({accessToken: 'asasasasasasasasasas'});
    })
  })
});
