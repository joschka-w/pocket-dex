import { Enums } from '@/types/database';
import Image from 'next/image';
import { getColorImg } from '../constants/asset-maps';

// TODO = 'dragon' is missing, move to constants folder if complete
const replaceTable: Record<string, Enums<'color'>> = {
  '{G}': 'grass',
  '{R}': 'fire',
  '{W}': 'water',
  '{L}': 'lightning',
  '{P}': 'psychic',
  '{F}': 'fighting',
  '{D}': 'darkness',
  '{M}': 'metal',
  '{C}': 'colorless',
};

export function formatCardText(text: string) {
  const parts = text.split(/(\{[A-Z]\})/g);

  return (
    <>
      {parts.map((part, i) => {
        const color = replaceTable[part];

        if (color) {
          return (
            <Image
              src={getColorImg(color)}
              alt={color}
              key={`${text}-${i}`}
              className="inline aspect-square w-4 align-text-top"
            />
          );
        }

        return part;
      })}
    </>
  );
}
