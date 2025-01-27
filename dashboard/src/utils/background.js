const backgroundUrls = [
  "https://assets.lummi.ai/assets/QmQmrCQi6eCGU5ubU7JMJ7UQEQ2ydxPYz2eEEanmcvxPRk?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmSVNov4SdnZPuvZ78bCLSanq2wp5yr7EtHrMxT3SBrUQ2?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmQY1PXhBwJZFq7CeGavKk8tdQ3Tno2xjuwVGGWuQ8yPfK?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmQ1mGz48us8DSSQymSdwPKmAGKraoCVKFo8cxQH9aWZEH?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmPcKmvU6terF7EUDbcB4jNJS8YwVX5diFQJt1xmTxPVdS?auto=format&w=1500",
];

export const getBackgroundUrl = (id) => {
  let hash = 0;
  for (let i = 0; i < id?.length; i++) {
    const char = id.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const index = Math.abs(hash) % backgroundUrls.length;
  return backgroundUrls[index];
};
