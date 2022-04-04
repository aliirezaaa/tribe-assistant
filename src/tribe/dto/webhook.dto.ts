import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class WebhookDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;
}
