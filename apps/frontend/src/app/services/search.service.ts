import { ImageDto } from '@image-crawler/dto';

const API_BASE_URL = 'http://localhost:3000';

const searchImages = async (
  engine: string,
  query: string
): Promise<ImageDto[]> => {
  const apiUrl = `${API_BASE_URL}/search/${engine}/${query}`;
  const res = await fetch(apiUrl);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
};

export { searchImages };
