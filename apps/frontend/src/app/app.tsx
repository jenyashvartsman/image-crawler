// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import styles from './app.module.scss';
import ImageGrid from './components/image-grid/ImageGrid';
import SearchQuery from './components/search-query/SearchQuery';
import { ImageDto } from '@image-crawler/dto';
import { searchImages } from './services/search.service';

const App = () => {
  const [images, setImages] = useState<ImageDto[]>([]);

  const handleSearch = async (query: string, engine: string) => {
    const images = await searchImages(engine, query);
    setImages(images);
  };

  return (
    <main className={styles.app}>
      <SearchQuery handleSearch={handleSearch} />
      <ImageGrid />
    </main>
  );
};

export default App;
