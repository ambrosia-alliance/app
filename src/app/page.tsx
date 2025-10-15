import { prisma } from '@/lib/prisma';
import SearchPage from './SearchPage';
import { Article } from '@/types';

export default async function Page() {
  const initialArticles: Article[] = await prisma.article.findMany({
    orderBy: { published_date: 'desc' },
  });

  return <SearchPage initialArticles={initialArticles} />;
}
