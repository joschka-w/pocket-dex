import fetchCards from '@/lib/data-fetching/fetchCards';
import Image from 'next/image';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CardList({ searchParams }: Props) {
  const { data, error } = await fetchCards(searchParams); // ! Add proper error handling

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return (
    <ol className="bg-linear-to-b grid grid-cols-4 gap-4">
      {data?.map(card => {
        return (
          <div key={card.id!}>
            <Image src={card.image_path!} width={605} height={846} alt={`${card.name} Cover art`} />
          </div>
        );
      })}
    </ol>
  );
}

export default CardList;
