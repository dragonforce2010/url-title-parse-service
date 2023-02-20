// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import cheerio from 'cheerio'

type Data = {
  websiteTitle: string
} | { error: string }

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors)
  const url = req.query.url as string;
  console.log('received a request with url:', url)
  if (!url) {
    res.status(400).send({ error: `bad request! url is not valid, url = ${url}` });
    return;
  }

  const resp = await fetch(url);
  const htmlText = await resp.text()
  const $ = cheerio.load(htmlText);
  const websiteTitle = $('head > title').text();
  console.log('successfully parsed title for url, title = ', websiteTitle)

  res.status(200).send({
    websiteTitle: websiteTitle,
  });
}
