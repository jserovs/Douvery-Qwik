export const copyToClipboard = async (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};
