import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './users.type';
import { UserDetails } from './users.input'
@Resolver()
export class UsersResolver {
    constructor(private UsersService: UsersService) { }

    @Query(returns => [Users])
    async getAllUsers() {
        return await this.UsersService.getAllUsers();
    }

    @Query(returns => Users)
    async getUser(@Args('id', { type: () => Int }) id: number) {
        return await this.UsersService.getUser(id);
    }

    @Mutation(returns => Users)
    async addUpdateUser(@Args('userDetails') userDetails: UserDetails) {
        return await this.UsersService.addUpdateUser(userDetails);
    }

    @Mutation(returns => [Users])
    async deleteUser(@Args('id', { type: () => Int }) id: number) {
        return await this.UsersService.delete(id);
    }
}

// Create or Update User
/*
mutation addUpdateUser(
  $id: Int
  $firstName: String
  $lastName: String
  $email: String
  $password: String
  $isActive: Boolean
) {
  addUpdateUser(
    userDetails: {
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      isActive: $isActive
    }
  ) {
    id
    firstName
    lastName
    email
  }
}

*/

// Delete user
/*
mutation deleteUser($id: Int!) {
  deleteUser(id: $id) {
    id
    firstName
    lastName
    isActive
  }
}
*/

// Get ALL Users
/*
query getAllUsers {
  getAllUsers {
    id
    firstName
    lastName
    isActive
  }
}
*/

// Get User
/*
query getUser($id: Int!) {
  getUser(id: $id) {
    id
    firstName
    lastName
    isActive
  }
}
*/