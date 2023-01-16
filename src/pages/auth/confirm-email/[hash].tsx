import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { InfoLayout, Meta } from '@/layouts';
import api from '@/services/api';

export default function ConfirmEmail() {
  const router = useRouter();
  const { hash } = router.query;
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading'
  );

  async function handleConfirmEmail() {
    api
      .confirmEmail(hash as string)
      .then(() => {
        setStatus('success');
        setTimeout(() => {
          router.push('/auth/login');
        }, 8000);
      })
      .catch(() => {
        setStatus('error');
      });
  }

  useEffect(() => {
    if (hash) handleConfirmEmail();
  }, [hash]);

  return (
    <InfoLayout
      meta={
        <Meta
          title="Vérification email | Blood Donation App"
          description="Vérifiez votre boîte de réception pour confirmer votre adresse email."
        />
      }
    >
      <div className="flex max-w-xl flex-col px-5 text-center">
        {status === 'loading' && (
          <>
            <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
              <div
                className="mr-2 inline-block h-8 w-8 animate-spin rounded-full border-8 border-current border-t-transparent "
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
              Vérification email...
            </h1>
            <p className="text-center text-base">
              Veuillez patienter pendant que nous vérifions votre email.
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <ExclamationCircleIcon className="h-14 text-indigo-500" />
            <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
              Erreur
            </h1>
            <p className="text-center text-base">
              Une erreur s&apos;est produite lors de la vérification de votre
              email.
            </p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircleIcon className="h-14 text-indigo-500" />
            <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
              Vérification email
            </h1>
            <p className="text-center text-base">
              Votre email a été vérifié avec succès. Vous allez être redirigé
              vers la page de connexion.
            </p>
          </>
        )}
      </div>
    </InfoLayout>
  );
}
