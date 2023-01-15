import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { InfoLayout, Meta } from '@/layouts';
import api from '@/services/api';

export default function ConfirmEmail() {
  const router = useRouter();
  const { hash } = router.query;

  useEffect(() => {
    if (hash)
      api
        .confirmEmail(hash as string)
        .then(() => {})
        .catch(() => {});

    return () => {};
  });

  return (
    <InfoLayout
      meta={
        <Meta
          title="Vérification email | Blood Donation App"
          description="Vérifiez votre boîte de réception pour confirmer votre adresse email."
        />
      }
      nextLink={{
        label: 'Se connecter',
        href: '/auth/login',
      }}
    >
      <div className="max-w-xl px-5 text-center">
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Vérification email
        </h1>
        <p className="mb-2 text-lg text-zinc-500">
          Vérifiez votre boîte de réception pour confirmer votre adresse email.
        </p>
      </div>
    </InfoLayout>
  );
}
