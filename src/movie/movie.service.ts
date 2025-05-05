import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiResponseDto } from './dto/response.dto';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  // private baseUrl = 'https://demo-movie-api.wareeasy.com';
  private baseUrl = 'http://localhost:3838';

  constructor(private readonly httpService: HttpService) {}

  async getAllMovies(): Promise<ApiResponseDto<MovieDto[]>> {
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/movies`);
    return res.data;
  }

  async getAllCategories(): Promise<ApiResponseDto<string[]>> {
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/categories`);
    return res.data;
  }

  async getMovieById(id: number): Promise<ApiResponseDto<MovieDto | null>> {
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/movies/id?id=${id}`);
    return res.data;
  }

  async searchMovie(title: string): Promise<ApiResponseDto<MovieDto[] | null>> {
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/movies/search?title=${title}`);
    return res.data;
  }

  async getPopularMovies(): Promise<ApiResponseDto<MovieDto[]>> {
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/movies/popular`);
    return res.data;
  }

  async getAllMoviesCategorized(): Promise<ApiResponseDto<Record<string, MovieDto[]>>> {
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/movies/categories`);
    return res.data;
  }
}
