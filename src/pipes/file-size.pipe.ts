import { FileValidator, Injectable } from '@nestjs/common';

interface FileSizeValidatorOptions {
  maxSize?: number;
}

@Injectable()
export class FileSizePipe extends FileValidator<FileSizeValidatorOptions> {
  private maxSize: number = 1000000;

  constructor(options: FileSizeValidatorOptions) {
    super(options);
    if (options.maxSize) {
      this.maxSize = options.maxSize;
    }
  }

  public buildErrorMessage(file: Express.Multer.File): string {
    return `File '${file.originalname}' size is bigger than ${this.maxSize}.`;
  }

  isValid(file: Express.Multer.File): boolean {
    const actualSize = file.size;

    return actualSize <= this.maxSize;
  }
}
