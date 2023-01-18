import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

import { InfoLayout, Meta } from '@/layouts';

export default function NotFoundPage() {
  return (
    <InfoLayout
      meta={
        <Meta
          title="Page introuvable | Blood Donation App"
          description="Désolé, cette page n'existe pas, ou a été déplacée."
        />
      }
    >
      <ExclamationCircleIcon className="h-14 text-indigo-500" />
      <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
        Page introuvable
      </h1>
      <p className="text-center text-base">
        Désolé, cette page n&apos;existe pas, ou a été déplacée.
      </p>
    </InfoLayout>
  );
}
