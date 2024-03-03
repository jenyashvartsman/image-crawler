import * as cheerio from 'cheerio';
import { ImageDto } from '@image-crawler/dto';

const search = async (engine: string, query: string): Promise<any> => {
  const searchEngineUrl = getEngineUrl(engine, query);
  const images = getImages(searchEngineUrl);
  return images;
};

const getEngineUrl = (engine: string, query: string): string => {
  switch (engine) {
    case 'google':
      return `https://www.google.com/search?sca_esv=5fc34e200fc361ee&sxsrf=ACQVn0-CFizFMnupn_JVCB_OlhLS-w5aXA:1709493257776&q=${query}&tbm=isch&source=lnms&sa=X&ved=2ahUKEwi4nIDT5tiEAxXyGFkFHYD4AhUQ0pQJegQIExAB&biw=1920&bih=911`;
    case 'yahoo':
      return `https://images.search.yahoo.com/search/images;_ylt=AwrFGp44ZNplO5IKyQtXNyoA;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZAMEc2VjA3BpdnM-?p=${query}&fr2=piv-web&fr=yfp-t`;
    case 'bing':
      return `https://www.bing.com/images/search?q=${query}&qs=n&form=QBILPG&sp=-1&lq=0&pq=cats&sc=10-4&cvid=7E8F6940CE1A47748D813D1AEC77E001&ghsh=0&ghacc=0&first=1`;
    case 'duckduckgo':
      return `https://duckduckgo.com/?va=c&t=ha&q=${query}&iax=images&ia=images`;
    default:
      throw new Error(`Invalid search engine: ${engine}`);
  }
};

const getImages = async (engineUrl: string): Promise<ImageDto[]> => {
  const res = await fetch(engineUrl);
  const html = await res.text();

  const $ = cheerio.load(html);

  const images: ImageDto[] = [];
  $('img').each((_index, element) => {
    const imageUrl = $(element).attr('src');
    const imageAlt = $(element).attr('alt');

    if (imageUrl?.startsWith('https://')) {
      images.push({
        url: imageUrl,
        alt: imageAlt,
      });
    }
  });

  return images;
};

export { search };
