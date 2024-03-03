// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Grid } from '@mui/material';
import ImageCard from '../image-card/ImageCard';
import styles from './image-grid.module.scss';
import { ImageDto } from '@image-crawler/dto';

type ImageGridProps = {
  images: ImageDto[];
};

const ImageGrid = ({ images }: ImageGridProps) => {
  return (
    <Grid container spacing={3}>
      {images.map((image, index) => (
        <Grid item key={index} xs={12} md={4} lg={3}>
          <ImageCard image={image}></ImageCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageGrid;
