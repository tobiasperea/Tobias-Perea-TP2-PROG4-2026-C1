import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { Multer } from 'multer';

@Injectable()
export class CloudinaryService {

    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }

    async subirImagen(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'lamorenoposting' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result!.secure_url);
                }
            );
            const stream = Readable.from(file.buffer);
            stream.pipe(uploadStream);
        });
    }
}