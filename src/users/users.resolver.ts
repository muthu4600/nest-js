import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserDetails } from './users.input'
import { User } from 'src/Models/user.entity';
@Resolver()
export class UsersResolver {
  constructor(private UsersService: UsersService) { }

  @Query(returns => [User])
  async getAllUsers() {
    return await this.UsersService.getAllUsers();
  }

  @Query(returns => User)
  async getUser(@Args('id', { type: () => String }) id: string) {
    return await this.UsersService.getUser(id);
  }

  @Mutation(returns => User)
  async addUpdateUser(@Args('userDetails') userDetails: UserDetails) {
    return await this.UsersService.addUpdateUser(userDetails);
  }

  @Mutation(returns => [User])
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    return await this.UsersService.delete(id);
  }
}

// Create or Update User
/*
mutation addUpdateUser(
  $email: String!
  $password: String
  $firstName: String!
  $lastName: String!
) {
  addUpdateUser(
    userDetails: {
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    }
  ) {
    id
    email
    isActive
    profile {
      userId
      profileId
      firstName
      lastName
      disPlayName
    }
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
    email
    isActive
    profile {
      userId
      profileId
      firstName
      lastName
      disPlayName
    }
  }
}

*/

// Get User
/*
query getUser($id: String!) {
  getUser(id: $id) {
    id
    email
    isActive
    profile {
      userId
      profileId
      firstName
      lastName
      disPlayName
    }
  }
}
*/