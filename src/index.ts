import express from "express"
import { S3Service } from './s3Service';

const app = express()
const PORT = 8080;
const HOST = '0.0.0.0';

const s3Service = new S3Service()

app.get('/', (req, res) => {
  res.send('Healthy!')
})

app.get('/test1', async (req, res) => {
  const versionId = await s3Service.writeFile("Test1", "Test1.txt", "testcase3215-us");
  res.send(versionId)
})

app.get('/test2', async (req, res) => {
  const versionId = await s3Service.writeFile2("Test2", "Test2.txt", "testcase3215-us");
  res.send(versionId)
})

// tslint:disable-next-line:no-console
app.listen(PORT, HOST, () => console.log(`Example app listening at http://${HOST}:${PORT}`))