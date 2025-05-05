import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@common/lib/contracts';

describe('UsersService', () => {
    let service: UsersService;
    let userRepository: Repository<UserEntity>;

    const mockUserRepository = {
        save: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should hash password and save user', async () => {
        const dto: CreateUserDto = {
            name: 'First name',
            password: 'plaintextpassword',
            confirmPassword: 'plaintextpassword',
        };

        const hashed = await bcrypt.hash(dto.password, 10);

        const savedUser = {
            id: 1,
            email: dto.name,
            password: hashed,
        };

        mockUserRepository.save.mockResolvedValueOnce(savedUser);
        mockUserRepository.save.mockResolvedValueOnce(savedUser);

        const result = await service.register(dto);

        expect(mockUserRepository.save).toHaveBeenCalledTimes(2);
        expect(mockUserRepository.save).toHaveBeenCalledWith({
            ...dto,
            password: expect.any(String),
        });

        expect(result).toEqual(savedUser);
        expect(await bcrypt.compare(dto.password, result.password)).toBe(true);
    });
});
