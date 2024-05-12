export class ListMoviesDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly duration: number,
    readonly release_date: Date,
    readonly description: string,
    readonly gender: string,
  ) {}
}
