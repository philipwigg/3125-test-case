import { S3 } from "aws-sdk"
import { Service } from 'typedi';

@Service()
export class S3Service {

  async writeFile(text: string, s3Key: string, bucketName: string): Promise<string | undefined> {

    const s3 = new S3({ logger: console })

    const response = await s3.putObject(
      {
        Bucket: bucketName,
        Key: s3Key,
        Body: text,
      },
      (err, data) => {
        if (err) {
          // tslint:disable-next-line:no-console
          console.log(`Error writing to bucket: '${bucketName}', with key: '${s3Key}': `, err);
        } else {
          // tslint:disable-next-line:no-console
          console.log(`Wrote file to bucket: '${bucketName}', with key: '${s3Key}', as versionId '${data.VersionId}'`);
        }
      },
    ).promise()

    const versionId = response.VersionId
    return versionId
  }

  async writeFile2(text: string, s3Key: string, bucketName: string): Promise<string | undefined> {

    const s3 = new S3({ logger: console })
    let versionId: string | undefined;

    try {
      const response = await s3.putObject({
        Bucket: bucketName,
        Key: s3Key,
        Body: text,
      }).promise();
      versionId = response.VersionId
      // tslint:disable-next-line:no-console
      console.log(`Wrote file to bucket: '${bucketName}', with key: '${s3Key}', as versionId '${versionId}'`);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }

    return versionId
  }
}
