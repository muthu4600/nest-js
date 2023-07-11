import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserDetails } from './users.input'
import { userType } from './users.commonType';
@Resolver()
export class UsersResolver {
  constructor(private UsersService: UsersService) { }

  @Query(returns => userType)
  async getAllUsers() {
    return await this.UsersService.getAllUsers();
  }

  @Query(returns => userType)
  async getUser(@Args('id', { type: () => String }) id: string) {
    return await this.UsersService.getUser(id);
  }

  @Mutation(returns => userType)
  async addUpdateUser(@Args('userDetails') userDetails: UserDetails) {
    return await this.UsersService.addUpdateUser(userDetails);
  }

  @Mutation(returns => userType)
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
    result {
      id
      email
      isActive
      refreshToken
      profile {
        userId
        profileId
        firstName
        lastName
        disPlayName
      }
    }
    token
    status
    errorMessage
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