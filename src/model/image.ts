export interface Image {
  id: string;
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
  dimensions: string;
  width: number;
  height: number;
  createDate: string;
  artist: string;

  focalLength: number;
  camera: Camera;
  exposure: Exposure;

  rawExif: any;
}
