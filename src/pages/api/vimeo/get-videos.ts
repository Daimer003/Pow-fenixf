import type { NextApiRequest, NextApiResponse } from 'next'
import { Vimeo } from 'vimeo';

const { VIMEO_CLIENT_ID, VIMEO_CLIENT_SECRET, VIMEO_ACCESS_TOKEN } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const client = new Vimeo(
        VIMEO_CLIENT_ID as string,
        VIMEO_CLIENT_SECRET as string,
        VIMEO_ACCESS_TOKEN as string
    );
    client.request({
        method: 'GET',
        path: '/users/213637692/videos'
    }, async (error: any, body: any, status_code: any, headers: any) => {
        if (error) {
            res.status(status_code || 500).json({ error });
        } else {
            res.status(status_code || 200).json(body);
        }
    });

}