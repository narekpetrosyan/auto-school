import { FileValidator, Injectable } from '@nestjs/common';

interface FileValidatorOptions {
  fileType: RegExp;
}

@Injectable()
export class FileTypePipe extends FileValidator<FileValidatorOptions> {
  private fileTypeRegexp: RegExp;

  constructor(options: FileValidatorOptions) {
    super(options);
    this.fileTypeRegexp = options.fileType;
  }

  public buildErrorMessage(file: Express.Multer.File): string {
    return `Actual file '${file.originalname}' has unacceptable MIME type. List of acceptable types: ${this.fileTypeRegexp}.`;
  }

  isValid(file: Express.Multer.File): boolean {
    const actualMimeType = file.mimetype;

    return !!actualMimeType.match(this.fileTypeRegexp);
  }
}
