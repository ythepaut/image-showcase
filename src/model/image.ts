export interface Image {
  title: string;
  src: string;
  width: number;
  height: number;
}

interface Camera {
  brand: string;
  model: string;
  lens: string;
}

interface Exposure {
  shutterSpeed: number;
  aperture: number;
  iso: number;
  compensation: number;
}

export interface ImageExif {
  dimensions: number[];
  createDate: string;
  artist: string;

  focalLength: number;
  camera: Camera;
  exposure: Exposure;

  rawExif: any;
}
