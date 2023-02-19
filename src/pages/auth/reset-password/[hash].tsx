import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/Buttons';
import { InputField } from '@/components/Fields';
import { InfoLayout, Meta } from '@/layouts';
import { ResetPasswordDto } from '@/types/dto';

export default function ResetPassword({ hash }: { hash: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading'
  );

  const { control, handleSubmit, reset, watch } = useForm<ResetPasswordDto>();

  async function onSubmit(formValues: ResetPasswordDto) {
    setLoading(true);

    await axios
      .post('/api/auth/reset/', {
        ...formValues,
        hash,
      })
      .then(() => {
        setStatus('success');
        reset();
      })
      .catch(() => setStatus('error'))
      .finally(() => setLoading(false));
  }

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
              href: '/forgot-password',
              label: 'Mot de passe oublié ?',
            }
          : {
              href: '/auth/login',
              label: 'Se connecter',
            }
      }
    >
      <Image
        src="/assets/icons/Reset password-cuate.svg"
        width={300}
        height={300}
        alt="Réinitialiser votre mot de passe"
      />
      {status === 'loading' && (
        <>
          <h1 className="mb-2 text-center text-3xl font-semibold text-gray-900">
            Réinitialiser votre mot de passe
          </h1>
          <p className="mb-2 text-center text-base">
            Saisissez votre nouveau mot de passe.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-y-4 text-start"
          >
            <InputField
              control={control}
              id="password"
              type="password"
              name="password"
              label="Nouveau mot de passe"
              readOnly={loading}
              required
              rules={{
                required: 'Le mot de passe est requis',
                minLength: {
                  value: 8,
                  message: 'Le mot de passe doit contenir 8 caractères',
                },
                maxLength: {
                  value: 64,
                  message:
                    'Le mot de passe doit contenir 64 caractères au maximum',
                },
              }}
            />

            <InputField
              control={control}
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              label="Confirmation du mot de passe"
              readOnly={loading}
              required
              rules={{
                required: 'La confirmation du mot de passe est requise',
                validate: (value) =>
                  value === watch('password') ||
                  'Les mots de passe ne correspondent pas',
              }}
            />

            <Button
              type="submit"
              variant="solid"
              color="rose"
              loading={loading}
              className="flex w-full items-center justify-center"
            >
              {loading ? 'En cours...' : 'Réinitialiser le mot de passe'}
            </Button>
          </form>
        </>
      )}
      {status === 'success' && (
        <>
          <h1 className="mb-2 text-center text-3xl font-semibold text-gray-900">
            Votre mot de passe a été réinitialisé
          </h1>
          <p className="mb-2 text-center text-base">
            Vous pouvez maintenant vous connecter avec votre nouveau mot de
            passe.
          </p>
        </>
      )}
      {status === 'error' && (
        <>
          <Image
            src="/assets/icons/Questions-bro.svg"
            width={300}
            height={300}
            alt="Une erreur s'est produite !"
          />
          <h1 className="mb-2 text-center text-3xl font-semibold text-gray-900">
            Une erreur est survenue !
          </h1>
          <p className="mb-2 text-center text-base">
            Le lien de réinitialisation du mot de passe a expiré ou est
            invalide.
          </p>
        </>
      )}
    </InfoLayout>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { hash } = query;

  if (!hash || hash.length < 64) return { props: { hash: null } };

  return {
    props: {
      hash: hash as string,
    },
  };
}
