import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';

import { InfoLayout, Meta } from '@/layouts';
import api from '@/lib/api';

export default function ConfirmEmail({ status }: { status: string }) {
  return (
    <InfoLayout
      meta={
        <Meta
          title="Vérification email | Blood Donation App"
          description="Vérifiez votre boîte de réception pour confirmer votre adresse email."
        />
      }
      nextLink={
        status === 'error'
          ? {
              href: '/auth/forgot-password',
              label: 'Mot de passe oublié ?',
            }
          : {
              href: '/auth/login',
              label: 'Se connecter',
            }
      }
    >
      <div className="flex max-w-xl flex-col px-5 text-center">
        {status === 'error' && (
          <>
            <Image
              src="/assets/icons/Questions-bro.svg"
              width={300}
              height={300}
              alt="Une erreur s'est produite lors de la vérification de votre email"
            />
            <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
              Erreur
            </h1>
            <p className="text-center text-base">
              Une erreur s&apos;est produite lors de la vérification de votre
              email. Le lien de vérification est invalide ou a expiré.
            </p>
          </>
        )}
        {status === 'success' && (
          <>
            <Image
              src="/assets/icons/Confirmed-cuate.svg"
              width={300}
              height={300}
              alt="Votre email a été vérifié avec succès. Vous pouvez maintenant vous connecter."
            />
            <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
              Vérification email
            </h1>
            <p className="text-center text-base">
              Votre email a été vérifié avec succès. Vous pouvez maintenant vous
              connecter.
            </p>
          </>
        )}
      </div>
    </InfoLayout>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { hash } = query;

  return api
    .confirmEmail(hash as string)
    .then(() => {
      return {
        props: {
          status: 'success',
        },
      };
    })
    .catch(() => {
      return {
        props: {
          status: 'error',
        },
      };
    });
}
