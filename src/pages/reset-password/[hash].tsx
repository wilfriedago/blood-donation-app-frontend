import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components';
import { ResetPasswordDto } from '@/interfaces/dto';
import { InfoLayout, Meta } from '@/layouts';
import api from '@/services/api';

export default function ResetPassword({ hash }: { hash: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading'
  );

  useEffect(() => {
    if (!hash) setStatus('error');

    return () => {
      setLoading(false);
      setStatus('loading');
    };
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordDto>();

  async function onSubmit(formValues: ResetPasswordDto) {
    setLoading(true);

    api
      .resetPassword(formValues.password, hash as string)
      .then(() => {
        setLoading(false);
        setStatus('success');

        setTimeout(() => {
          router.push('/auth/login');
        }, 10000);
      })
      .catch(() => {
        setLoading(false);
        setStatus('error');
      });
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
      {status === 'loading' && (
        <>
          <h1 className="mb-2 text-center text-3xl font-semibold text-gray-900">
            Réinitialiser votre mot de passe
          </h1>
          <p className="mb-2 text-center text-base">
            Saisissez votre nouveau mot de passe.
          </p>
          <div className="mb-0 bg-white p-4 py-6 shadow-md sm:rounded-lg sm:px-10">
            <form
              action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
              className="w-full"
            >
              <div>
                <label
                  htmlFor="password"
                  className="block text-start text-sm font-medium text-gray-700"
                >
                  Nouveau mot de passe
                </label>
                <input
                  {...register('password', {
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
                  })}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-describedby="password-error"
                  aria-invalid={!!errors?.password}
                  className={`mt-1 mb-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
                    errors?.password && 'border-red-500'
                  }`}
                />
              </div>
              {errors?.password && (
                <span
                  role="alert"
                  id="password-error"
                  className="text-xs text-red-500"
                >
                  {errors.password.message}
                </span>
              )}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-start text-sm font-medium text-gray-700"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  {...register('passwordConfirmation', {
                    required: 'Veuillez confirmer le mot de passe',
                    onBlur(e) {
                      if (e.target.value !== getValues('password'))
                        setError('passwordConfirmation', {
                          type: 'manual',
                          message: 'Les mots de passe ne correspondent pas',
                        });
                    },
                    onChange() {
                      clearErrors('passwordConfirmation');
                    },
                  })}
                  id="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  aria-describedby="confirm-password-error"
                  aria-invalid={!!errors?.passwordConfirmation}
                  className={`mt-1 mb-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
                    errors?.passwordConfirmation && 'border-red-500'
                  }`}
                />
              </div>
              {errors?.passwordConfirmation && (
                <span
                  role="alert"
                  id="confirm-password-error"
                  className="text-xs text-red-500"
                >
                  {errors.passwordConfirmation.message}
                </span>
              )}
              <Button type="submit" className="mt-4" loading={loading}>
                {loading ? 'En cours...' : 'Réinitialiser le mot de passe'}
              </Button>
            </form>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <CheckCircleIcon className="mx-auto h-12 w-12 text-green-400" />
          <h1 className="mb-2 text-center text-3xl font-semibold text-gray-900">
            Votre mot de passe a été réinitialisé
          </h1>
          <p className="mb-2 text-center text-base">
            Vous allez être redirigé vers la page de connexion dans quelques
            secondes.
          </p>
        </>
      )}
      {status === 'error' && (
        <>
          <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-400" />
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

  if (!hash || hash.length !== 64) return { props: { hash: null } };

  return {
    props: {
      hash: hash as string,
    },
  };
}
