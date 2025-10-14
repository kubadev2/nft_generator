import { getStore } from '@netlify/blobs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { deployerAddress } = req.query;
  if (!deployerAddress || typeof deployerAddress !== 'string') {
    return res.status(400).json({ error: 'Deployer address is required' });
  }

  const store = getStore('contracts');
  const userKey = deployerAddress.toLowerCase();

  try {
    const userContracts = (await store.get(userKey, { type: 'json' })) || [];
    userContracts.sort((a: any, b: any) => b.createdAt - a.createdAt);
    
    return res.status(200).json(userContracts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}