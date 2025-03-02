export interface Page {
  pageId: number;
  imageUrl: string;
}

export interface Data {
  docId: number;
  name: string;
  pages: Page[];
}
