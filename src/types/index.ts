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
  data: string | File;
  position: Position;
}

export interface Annotation {
  pageId: number;
  items: AnnotationItem[];
}
