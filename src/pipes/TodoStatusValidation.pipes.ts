/* eslint-disable prettier/prettier */

import {
  
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';



export class TodoStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    
  ];
  transform(value: any, ): any {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status.`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }
}
