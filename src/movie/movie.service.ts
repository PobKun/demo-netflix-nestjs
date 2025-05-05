import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiResponseDto } from './dto/response.dto';
import { MovieDto } from './dto/movie.dto';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class MovieService {
  // private baseUrl = 'https://demo-movie-api.wareeasy.com';
  private baseUrl = 'http://localhost:3838';

  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getAllMovies(): Promise<ApiResponseDto<MovieDto[]>> {
    const lang = (I18nContext.current()) ? I18nContext.current()?.lang : 'en'
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/movies?lang=${lang}`);
    return res.data;
  }

  async getAllCategories(): Promise<ApiResponseDto<string[]>> {
    const lang = (I18nContext.current()) ? I18nContext.current()?.lang : 'en'
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/categories?lang=${lang}`);
    return res.data;
  }

  async getMovieById(id: number): Promise<ApiResponseDto<MovieDto | null>> {
    const lang = (I18nContext.current()) ? I18nContext.current()?.lang : 'en'
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/movies/id?id=${id}&lang=${lang}`);
    return res.data;
  }

  async searchMovie(title: string): Promise<ApiResponseDto<MovieDto[] | null>> {
    const lang = (I18nContext.current()) ? I18nContext.current()?.lang : 'en'
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/movies/search?title=${title}&lang=${lang}`);
    return res.data;
  }

  async getPopularMovies(): Promise<ApiResponseDto<MovieDto[]>> {
    const lang = (I18nContext.current()) ? I18nContext.current()?.lang : 'en'
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/movies/popular?lang=${lang}`);
    return res.data;
  }

  async getAllMoviesCategorized(): Promise<ApiResponseDto<Record<string, MovieDto[]>>> {
    const lang = (I18nContext.current()) ? I18nContext.current()?.lang : 'en'
    const res = await this.httpService.axiosRef.get(`${this.baseUrl}/movies/categories?lang=${lang}`);
    return res.data;
  }
}
