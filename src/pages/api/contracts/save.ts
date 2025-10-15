import { getStore } from '@netlify/blobs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { contractAddress, deployerAddress, collectionName, chainId } = req.body;
  if (!contractAddress || !deployerAddress || !collectionName || !chainId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const store = getStore('contracts');
  const userKey = deployerAddress.toLowerCase();

  try {
    const existingContracts: any[] = (await store.get(userKey, { type: 'json' })) || [];

    if (!existingContracts.some(c => c.contractAddress === contractAddress)) {
      const newRecord = {
        contractAddress,
        collectionName,
        chainId,
        createdAt: Date.now(),
      };
      existingContracts.push(newRecord);

      await store.setJSON(userKey, existingContracts);
    }

    return res.status(200).json({ message: 'Contract saved' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}