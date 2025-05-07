import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  synopsis: string;

  @ApiProperty()
  trailer_embed_url: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  image_cover: string;

  @ApiProperty()
  image_logo: string;
  
  @ApiProperty()
  top10: number;

  @ApiProperty()
  popular: boolean;
}
