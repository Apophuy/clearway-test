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
  id: string;
  data: string;
  position: Position;
}

export interface Annotation {
  pageId: number;
  items: AnnotationItem[];
  imageUrl: string;
}
