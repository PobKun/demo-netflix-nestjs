import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';

@ApiTags('movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'หนังทั้งหมด', type: [MovieDto] })
  async getMovies() {
    const response = await this.movieService.getAllMovies();
    if(!response.success) {
      throw new HttpException({message: "ERROR",data: response.data, errors: null}, HttpStatus.BAD_REQUEST)
    }
    throw new HttpException({message: "FOUND",data: response.data, errors: null}, HttpStatus.OK)
  }

  @Get('categories')
  @ApiResponse({ status: 200, description: 'หมวดหมู่ทั้งหมด', schema: { type: 'array', items: { type: 'string', }, }, }) 
  async getCategories() {
    const response = await this.movieService.getAllCategories();
    if(!response.success) {
      throw new HttpException({message: "ERROR",data: response.data, errors: null}, HttpStatus.BAD_REQUEST)
    }
    throw new HttpException({message: "FOUND",data: response.data, errors: null}, HttpStatus.OK)
  }
  

  @Get('id')
  @ApiQuery({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'ค้นหาหนังด้วย ID', type: MovieDto })
  async getById(@Query('id') id: number) {
    const response = await this.movieService.getMovieById(id);
    if(!response.success) {
      throw new HttpException({message: "ERROR",data: response.data, errors: null}, HttpStatus.BAD_REQUEST)
    }
    throw new HttpException({message: "FOUND",data: response.data, errors: null}, HttpStatus.OK)
  }

  @Get('search')
  @ApiQuery({ name: 'title', required: true, type: String })
  @ApiResponse({ status: 200, description: 'ค้นหาหนังด้ว Title', type: [MovieDto] })
  async search(@Query('title') title: string) {
    const response = await this.movieService.searchMovie(title);
    if(!response.success) {
      throw new HttpException({message: "ERROR",data: response.data, errors: null}, HttpStatus.BAD_REQUEST)
    }
    throw new HttpException({message: "FOUND",data: response.data, errors: null}, HttpStatus.OK)
  }

  @Get('popular')
  @ApiResponse({ status: 200, description: 'หนังยอดนิยม Popular', type: [MovieDto] })
  async getPopular() {
    const response = await this.movieService.getPopularMovies();
    if(!response.success) {
      throw new HttpException({message: "ERROR",data: response.data, errors: null}, HttpStatus.BAD_REQUEST)
    }
    throw new HttpException({message: "FOUND",data: response.data, errors: null}, HttpStatus.OK)
  }

  @Get('categorized')
  @ApiResponse({ status: 200, description: 'หนังทั้งหมดแบ่งตาม category + popular', schema: { type: 'object', properties: { popular: { type: 'array', items: { $ref: getSchemaPath(MovieDto) } }, series: { type: 'array', items: { $ref: getSchemaPath(MovieDto) } }, cartoon: { type: 'array', items: { $ref: getSchemaPath(MovieDto) } }, movie: { type: 'array', items: { $ref: getSchemaPath(MovieDto) } }, tvshow: { type: 'array', items: { $ref: getSchemaPath(MovieDto) } } } } })
  async getAllCategorized() {
    const response = await this.movieService.getAllMoviesCategorized();
    if(!response.success) {
      throw new HttpException({message: "ERROR",data: response.data, errors: null}, HttpStatus.BAD_REQUEST)
    }
    throw new HttpException({message: "FOUND",data: response.data, errors: null}, HttpStatus.OK)
  }
}
