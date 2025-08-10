import { 
  Controller, 
  Post, 
  Delete, 
  Param, 
  UseInterceptors, 
  UploadedFile, 
  HttpException, 
  HttpStatus,
  Get,
  Res,
  Req
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { unlink, existsSync } from 'fs';
import { promisify } from 'util';
import type { Response, Request } from 'express';

const unlinkAsync = promisify(unlink);

@Controller('api/drive')
export class DriveController {
  
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './storage',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        // Optional: Add file type validation
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extName = allowedTypes.test(extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);
        
        if (mimeType && extName) {
          return cb(null, true);
        } else {
          cb(new HttpException('Only image files are allowed', HttpStatus.BAD_REQUEST), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      path: file.path,
      image_url: `${baseUrl}/api/drive/file/${file.filename}` // Returns full URL as image_url
    };
  }

  @Delete('delete/:filename')
  async deleteFile(@Param('filename') filename: string) {
    try {
      const filePath = join('./storage', filename);
      
      // Check if file exists
      if (!existsSync(filePath)) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }

      // Delete the file
      await unlinkAsync(filePath);
      
      return {
        message: 'File deleted successfully',
        filename: filename
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error deleting file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Serve files
  @Get('file/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const filePath = join('./storage', filename);
      
      if (!existsSync(filePath)) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }

      return res.sendFile(filePath, { root: '.' });
    } catch (error) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  // List all files
  @Get('files')
  async listFiles(@Req() req: Request) {
    try {
      const fs = require('fs');
      const files = fs.readdirSync('./storage');
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      return {
        files: files.map(filename => ({
          filename,
          image_url: `${baseUrl}/api/drive/file/${filename}` // Also using image_url here
        }))
      };
    } catch (error) {
      throw new HttpException('Error reading files', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
