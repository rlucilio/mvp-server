import { IsArray, IsNotEmpty } from 'class-validator';

export class QuestionsDto {
  @IsNotEmpty()
  @IsArray()
  questions: { question: string; answer: string }[];
}
