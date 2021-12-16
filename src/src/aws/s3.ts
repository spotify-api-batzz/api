import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getEnv, mustGetEnv } from "../util";
import { Readable } from "stream";
import { uniq } from "ramda";
import sharp from "sharp";
import { ConvertImageResponse } from "./types";

export class s3Handler {
  private imageFolder: string;
  private toFixFolder: string;
  private imageGroup?: string;
  private client: S3Client;

  constructor(imageGroup?: string) {
    this.imageFolder = mustGetEnv("S3_BUCKET");
    this.toFixFolder = getEnv("S3_TO_FIX_FOLDER", "toFix");
    this.client = new S3Client({ region: "eu-west-1" });
    this.imageGroup = imageGroup;
  }

  // Takes a name for an image (key for s3), checks if it exists in the 'toConvert' bucket
  // converts to regular thumbnail sizes (3 aspect ratios + original) and removes original 'toConvert' image
  // returns new randomly generated key for uploaded image, can specify folder to put into for more grouping
  public async convertImage(imageName: string): Promise<ConvertImageResponse> {
    const key = `${this.toFixFolder}/${imageName}`;
    console.log(key);
    const toFixImageResponse = await this.getS3Object(key);

    const newImageName = Buffer.from(Math.random().toString())
      .toString("base64")
      .substring(10, 5);

    const buffer = await streamToBuffer(toFixImageResponse.Body as Readable);

    const small = await resizeImage(buffer, 400);
    const medium = await resizeImage(buffer, 700);
    const large = await resizeImage(buffer, 1000);

    await this.uploadS3Object(
      small,
      fixKey(`resized/${this.imageGroup || ""}/${newImageName}-small.jpg`)
    );

    await this.uploadS3Object(
      medium,
      fixKey(`resized/${this.imageGroup || ""}/${newImageName}-medium.jpg`)
    );

    await this.uploadS3Object(
      large,
      fixKey(`resized/${this.imageGroup || ""}/${newImageName}-large.jpg`)
    );

    await this.uploadS3Object(
      buffer,
      fixKey(`resized/${this.imageGroup || ""}/${newImageName}.jpg`)
    );

    await this.deleteS3Object(key);

    return { newImageName };
  }

  private async getS3Object(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.imageFolder,
      Key: key,
    });
    return await this.client.send(command);
  }

  private async deleteS3Object(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.imageFolder,
      Key: key,
    });
    await this.client.send(command);
  }

  private async uploadS3Object(buffer: Buffer, key: string) {
    const command = new PutObjectCommand({
      Bucket: this.imageFolder,
      Key: key,
      Body: buffer,
    });
    await this.client.send(command);
  }
}

const resizeImage = async (image: Buffer, width: number) => {
  const sharpImage = sharp(image);
  const metadata = await sharpImage.metadata();
  if (metadata.width && metadata.width < width) {
    width = metadata.width;
  }
  return sharpImage.resize({ width }).toBuffer();
};

const fixKey = (key: string) => key.replace(/\/\//g, "/");

const streamToBuffer = (stream: Readable): Promise<Buffer> => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(uniq(chunks))));
  });
};
