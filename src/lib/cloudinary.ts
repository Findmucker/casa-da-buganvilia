import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: string, folder: string = "casa-da-buganvilia") {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });
  return {
    publicId: result.public_id,
    url: result.secure_url,
    width: result.width,
    height: result.height,
  };
}

export async function deleteImage(publicId: string) {
  await cloudinary.uploader.destroy(publicId);
}

export function getOptimizedUrl(publicId: string, width?: number, height?: number) {
  return cloudinary.url(publicId, {
    transformation: [
      { width, height, crop: "fill", gravity: "auto" },
      { quality: "auto", fetch_format: "auto" },
    ],
  });
}

export default cloudinary;
