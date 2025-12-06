import Link from 'next/link';

import fetchCards from '@/lib/data-fetching/fetchCards';
import getFilterParamsFromUrl from '@/lib/utils/getFilterParamsFromUrl';
import Card from '@/components/common/card/Card';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CardList({ searchParams }: Props) {
  const params = await searchParams;
  const filterParams = getFilterParamsFromUrl(params);

  const { data } = await fetchCards(filterParams);

  return (
    <ol className="grid grid-cols-5 gap-4">
      {data?.map(card => {
        return (
          <Link href={'#'} key={card.id!}>
            <Card card={card} />
          </Link>
        );
      })}
    </ol>
  );
}

export default CardList;
