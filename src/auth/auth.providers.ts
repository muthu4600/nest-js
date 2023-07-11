import { User } from "src/Models/user.entity";
import { UserProfile } from "src/Models/userProfile.entity";


export const authProviders = [
    {
        provide: 'USER_REPOSITORY',
        useValue: User,
    },
    {
        provide: 'USER_PROFILE_REPOSITORY',
        useValue: UserProfile,
    }
];