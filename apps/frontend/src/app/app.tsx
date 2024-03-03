import { useState } from 'react';
import styles from './app.module.scss';
import ImageGrid from './components/image-grid/ImageGrid';
import SearchQuery from './components/search-query/SearchQuery';
import { ImageDto } from '@image-crawler/dto';
import { searchImages } from './services/search.service';
import Loading from './components/loading/Loading';
import NoResults from './components/no-results/NoResults';
import FirstSearch from './components/first-search/FirstSearch';

const App = () => {
  const [images, setImages] = useState<ImageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstSearch, setFirstSearch] = useState<boolean>(true);

  const handleSearch = async (query: string, engine: string) => {
    setFirstSearch(false);
    setLoading(true);
    const images = await searchImages(engine, query);
    setImages(images);
    setLoading(false);
  };

  const layout = () => {
    if (loading) {
      return <Loading />;
    } else {
      if (firstSearch) {
        return <FirstSearch />;
      } else {
        return images.length ? <ImageGrid images={images} /> : <NoResults />;
      }
    }
  };

  return (
    <main className={styles.app}>
      <SearchQuery handleSearch={handleSearch} />
      {layout()}
    </main>
  );
};

export default App;
