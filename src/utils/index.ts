export const getCurrentPageId = (url: string): number | null => {
  const substr = '/viewer/view/';
  if (url.startsWith(substr)) {
    const pageId = url.replace(substr, '');
    return Number(pageId);
  }

  return null;
};
