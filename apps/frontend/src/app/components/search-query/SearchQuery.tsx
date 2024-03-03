import { useState } from 'react';
import styles from './search-query.module.scss';
import { TextField, Select, MenuItem, Grid, Button } from '@mui/material';

type SearchQueryProps = {
  handleSearch: (query: string, engine: string) => void;
};

const SearchQuery = ({ handleSearch }: SearchQueryProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchEngine, setSearchEngine] = useState<string>('yahoo');

  const searchEngines: { label: string; value: string }[] = [
    { label: 'Yahoo', value: 'yahoo' },
    { label: 'Google', value: 'google' },
    { label: 'Bing', value: 'bing' },
    { label: 'DuckDuckGo', value: 'duckduckgo' },
  ];

  return (
    <div className={styles.searchQuery}>
      <Grid container spacing={2}>
        {/* search */}
        <Grid item md={8} xs={12}>
          <TextField
            id="search"
            label="Search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* engine */}
        <Grid item md={2} xs={6}>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Engine"
            value={searchEngine}
            onChange={(e) => setSearchEngine(e.target.value)}
            fullWidth
          >
            {searchEngines.map((engine) => (
              <MenuItem key={engine.value} value={engine.value}>
                {engine.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item md={2} xs={6}>
          <Button
            variant="outlined"
            onClick={() => handleSearch(searchQuery, searchEngine)}
            fullWidth
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchQuery;
