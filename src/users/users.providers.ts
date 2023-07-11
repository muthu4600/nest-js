import { UserProfile } from 'src/Models/userProfile.entity';
import { User } from '../Models/user.entity';

export const usersProviders = [
    {
        provide: 'USER_REPOSITORY',
        useValue: User,
    },
    {
        provide: 'USER_PROFILE_REPOSITORY',
        useValue: UserProfile,
    }
];