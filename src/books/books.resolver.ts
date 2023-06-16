import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Books } from './books';
import { BookDetails } from './books.input';

@Resolver()
export class BooksResolver {
    constructor(private BooksService: BooksService) { }

    @Query(returns => [Books])
    async getAllBooks() {
        return await this.BooksService.getAllBooks();
    }

    @Query(returns => Books)
    async getBookById(@Args('id', { type: () => Int }) id: number) {
        return await this.BooksService.getBookById(id);
    }

    @Mutation(returns => [Books])
    async addUpdateBook(@Args('bookdetails') bookdetails: BookDetails) {
        return await this.BooksService.addUpdateBook(bookdetails);
    }


    // query getAllBooks{
    //     getAllBooks{
    //       id
    //       title
    //       author
    //       description
    //     }
    //   }


    // query getBookById($id: Int!) {
    //     getBookById(id: $id) {
    //       id
    //       title
    //       author
    //       description
    //     }
    //   }


    // mutation addUpdateBook(
    //     $id: Int!
    //     $title: String!
    //     $author: String!
    //     $description: String!
    //   ) {
    //     addUpdateBook(
    //       bookdetails: {
    //         id: $id
    //         title: $title
    //         author: $author
    //         description: $description
    //       }
    //     ) {
    //       id
    //       title
    //       author
    //       description
    //     }
    //   }

}