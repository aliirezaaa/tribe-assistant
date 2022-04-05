import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnalyzedPostDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
  @IsString()
  @IsNotEmpty()
  public webhookEventId: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsString()
  @IsNotEmpty()
  public category: string;

  @IsNumber()
  @IsNotEmpty()
  public categoryScore: number;

  @IsString()
  @IsNotEmpty()
  public sentiment: string;

  @IsNumber()
  @IsNotEmpty()
  public sentimentScore: number;

  @IsString()
  @IsNotEmpty()
  public authorName: string;
  @IsEmail()
  @IsNotEmpty()
  public authorEmail: string;
}
