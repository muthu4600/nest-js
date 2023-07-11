import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { userType } from '../users/users.commonType';
import { AuthService } from './auth.service';
@Resolver()
export class AuthResolvers {
  constructor(private AuthService: AuthService) { }
  @Mutation(returns => userType)
  async userLogin(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @Context() cxt: any
  ) {
    const userData = await this.AuthService.userLogin(email, password);
    await cxt.res.cookie('id_token', userData.token);
    return userData;
  }
}

/*
Mutation UserLogin($email: String!, $password: String!) {
  userLogin(email: $email, password: $password) {
    status
    errorMessage
    token
  }
}
*/