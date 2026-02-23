import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTasksDtos } from './CreateTasksDtos';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTasksDtos extends PartialType(CreateTasksDtos) {
    @ApiProperty({ 
        example: 'COMPLETE', 
        description: 'Status atual da tarefa',
        required: false,
        enum: ['PENDING', 'COMPLETE', 'IN_PROGRESS'] 
    })
    @IsOptional()
    @IsEnum(['PENDING', 'COMPLETE', 'IN_PROGRESS'], {
        message: 'O status deve ser um dos valores: PENDING, COMPLETE, IN_PROGRESS'
    })
    statusTasks?: string;
}