import { Contract, ethers } from 'ethers';
import TATokenAbi from './TATokenAbi';
import { TransactionEvent } from './types';

const url =
  'wss://eth-goerli.g.alchemy.com/v2/8weDGpKHnBC5Eg2pDtcOcdxs_fA6-kFm';

export const transactionEvents: TransactionEvent[] = [];

const trackingTransfers = (): void => {
  const provider = new ethers.providers.WebSocketProvider(url);
  const contract = new Contract(
    '0xade4228f9DE91099928647397bA5114Ea85D7F81',
    TATokenAbi,
    provider,
  );

  contract.on(
    'Transfer',
    (from: string, to: string, amount: string, event: TransactionEvent) => {
      console.log(event);
      transactionEvents.unshift(event);
    },
  );

  provider._websocket.on('error', async () => {
    console.log(`Unable to connect to  retrying in 3s...`);
    setTimeout(trackingTransfers, 3000);
  });
  provider._websocket.on('close', async (code: number) => {
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 3s...`,
    );
    provider._websocket.terminate();
    setTimeout(trackingTransfers, 3000);
  });
};

export default trackingTransfers;
