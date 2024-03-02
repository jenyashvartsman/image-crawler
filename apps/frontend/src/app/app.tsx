// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import ImageGrid from './components/image-grid/ImageGrid';
import SearchQuery from './components/search-query/SearchQuery';

const App = () => {
  return (
    <main>
      <SearchQuery />
      <ImageGrid />
    </main>
  );
};

export default App;
