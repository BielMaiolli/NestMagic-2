import { IsArray, IsString, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class ImportDeckDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly commanderName: string;

  @IsArray()
  @ArrayMinSize(99)
  @ArrayMaxSize(99)
  readonly cards: string[];

  @IsArray()
  readonly colors: string[];

  @IsString()
  readonly userEmail: string;
}
