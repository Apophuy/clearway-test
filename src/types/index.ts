export interface Page {
  pageId: number;
  imageUrl: string;
}

export interface Data {
  docId: number;
  name: string;
  pages: Page[];
}

export interface Position {
  x: number;
  y: number;
}

export interface AnnotationItem {
  itemId: string;
  data: string;
  type: 'image' | 'text';
  position: Position;
}

export interface AnnotationPage {
  pageId: number;
  items: AnnotationItem[];
}

export interface Annotation {
  docId: number;
  items: AnnotationPage[];
}
