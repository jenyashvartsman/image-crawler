// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import ImageGrid from './components/image-grid/ImageGrid';
import SearchQuery from './components/search-query/SearchQuery';
import useFetch from './hooks/useFetch';
import { ImageDto } from '@image-crawler/dto';

const App = () => {
  const { data } = useFetch<ImageDto[]>(
    'http://localhost:3000/search/yahoo/cats'
  );

  return (
    <main>
      <SearchQuery />
      <ImageGrid />
    </main>
  );
};

export default App;
