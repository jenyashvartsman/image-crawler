import { ImageDto } from '@image-crawler/dto';
import { Card, CardMedia } from '@mui/material';

type ImageCardProps = {
  image: ImageDto;
};

const ImageCard = ({ image }: ImageCardProps) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={image.alt || ''}
        height="250"
        image={image.url}
      />
    </Card>
  );
};

export default ImageCard;
