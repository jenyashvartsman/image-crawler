import * as cheerio from 'cheerio';
import { ImageDto, SearchEngineType } from '@image-crawler/dto';

const search = async (
  engine: SearchEngineType,
  query: string
): Promise<any> => {
  const searchEngineUrl = getEngineUrl(engine, query);
  const images = getImages(searchEngineUrl);
  return images;
};

const getEngineUrl = (engine: SearchEngineType, query: string): string => {
  switch (engine) {
    case 'google':
      return `https://www.google.com/search?q=cats&sca_esv=302ce67c0d679abb&hl=en&tbm=isch&sxsrf=ACQVn0_1RF-K1qlcNj7cjWpU1zp-Ti2KZg%3A1709404750391&source=hp&biw=1920&bih=911&ei=TnLjZaX6FYbbptQPjMKCuAQ&iflsig=ANes7DEAAAAAZeOAXvVPobCwM_v0bL1yLvL9kstojPBF&oq=${query}&gs_lp=EgNpbWciA2NhdCoCCAAyBBAjGCcyBBAjGCcyCBAAGIAEGLEDMgUQABiABDIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIOEAAYgAQYigUYsQMYgwEyCBAAGIAEGLEDMgUQABiABEjNDVC3AVisBXABeACQAQCYAT6gAa4BqgEBM7gBA8gBAPgBAYoCC2d3cy13aXotaW1nmAIEoAK9AagCCsICBxAjGOoCGCeYAwiSBwE0&sclient=img`;
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
