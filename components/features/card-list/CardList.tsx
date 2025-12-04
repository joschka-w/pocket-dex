import fetchCards from '@/lib/data-fetching/fetchCards';
import Card from '@/components/common/card/Card';
import getFilterParamsFromUrl from '@/lib/utils/getFilterParamsFromUrl';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CardList({ searchParams }: Props) {
  const params = await searchParams;
  const filterParams = getFilterParamsFromUrl(params);

  const { data } = await fetchCards(filterParams);

  return (
    <ol className="grid grid-cols-4 gap-4">
      {data?.map(card => {
        return (
          <div key={card.id!}>
            <Card card={card} />
          </div>
        );
      })}
    </ol>
  );
}

export default CardList;
