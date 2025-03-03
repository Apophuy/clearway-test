export const getCurrentPageId = (url: string): number | null => {
  const substr = '/viewer/view/';
  if (url.startsWith(substr)) {
    const pageId = url.replace(substr, '');
    return Number(pageId);
  }

  return null;
};

export const resize = (zoom: number) => {
  if (zoom > 1) {
    (zoom - 1) * 10 * 290;
  }
  return (zoom - 1) * 10 * 285;
};
