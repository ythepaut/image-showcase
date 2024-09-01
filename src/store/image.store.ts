import { create } from "zustand";
import { Image, ImageExif } from "../model/image";
import { getExif } from "../services/exif.service";
import { getAllImages } from "../services/image.service";


interface State {
  images: Image[] | null;
  exifs: { [key: string]: Partial<ImageExif> };
}

interface ImageStore {
  state: State;
  getImages: () => Promise<Image[] | null>;
  getExif: (image: Image) => Promise<Partial<ImageExif>>;
}

const initialState: State = {
  images: null,
  exifs: {}
};

const useImageStore = create<ImageStore>((set, get) => ({
  state: initialState,
  getImages: async () => {
    const { images } = get().state;
    if (images) return images;

    const fetchedImages = await getAllImages(process.env.imagesUrl ?? "");
    set(state => ({ state: { ...state.state, images: fetchedImages } }));
    return fetchedImages;
  },
  getExif: async (image: Image) => {
    const { exifs } = get().state;
    if (exifs[image.id]) return exifs[image.id];

    const exif = await getExif(image);
    set(state => ({ state: { ...state.state, exifs: { ...state.state.exifs, [image.id]: exif } } }));
    return exif;
  }
}));

export default useImageStore;
