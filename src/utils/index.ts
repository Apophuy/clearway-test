export const getCurrentDocId = (url: string): number | null => {
  const substr = '/viewer/view/';
  if (url.startsWith(substr)) {
    const docId = url.replace(substr, '');
    return Number(docId);
  }

  return null;
};

export const resize = (zoom: number) => {
  if (zoom > 1) {
    (zoom - 1) * 10 * 290;
  }
  return (zoom - 1) * 10 * 285;
};
