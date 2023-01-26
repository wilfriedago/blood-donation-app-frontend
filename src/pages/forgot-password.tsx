import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components';
import { useApi } from '@/hooks';
import { InfoLayout, Meta } from '@/layouts';
import { ForgotPasswordDto } from '@/types/dto';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const { api } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ForgotPasswordDto>();

  useEffect(() => {
    router.prefetch('/auth/login');
    router.prefetch('/auth/register');
  });

  async function onSubmit(formValues: ForgotPasswordDto) {
    setLoading(true);

    await api.forgotPassword(formValues.email).then(() => {
      setLoading(false);
      setSuccess(true);
    });
  }

  return (
    <InfoLayout
      meta={
        <Meta
          title="Mot de passe oublié | Blood Donation App"
          description="Entrez votre adresse email pour réinitialiser votre mot de passe."
        />
      }
      nextLink={{
        href: '/auth/register',
        label: "S'inscrire",
      }}
    >
      {success ? (
        <>
          <CheckCircleIcon className="h-14 text-indigo-500" />
          <h1 className="mb-2 text-center text-3xl font-semibold text-gray-900">
            Mot de passe oublié ?
          </h1>
          <p className="mb-10 text-center text-base">
            Si l&apos;adresse e-mail que vous aviez renseignée se trouve dans
            notre base de données, nous vous enverrons un e-mail pour
            réinitialiser votre mot de passe.
          </p>
        </>
      ) : (
        <>
          <h1 className="mb-2 text-center text-3xl font-semibold text-gray-900">
            Mot de passe oublié ?
          </h1>
          <p className="mb-10 text-center text-base">
            Saisissez votre adresse e-mail et nous vous enverrons un lien pour
            réinitialiser votre mot de passe.
          </p>
          <form
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
          >
            <div>
              <label
                htmlFor="email-address"
                className="block text-start text-sm font-semibold leading-6 text-gray-900"
              >
                Adresse email
              </label>
              <input
                {...register('email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Adresse email invalide',
                  },
                  onChange: () => clearErrors('email'),
                })}
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={errors?.email ? 'true' : 'false'}
                className={`${
                  errors?.email ? 'ring-rose-400' : 'ring-slate-200'
                } mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
              />
              {errors?.email && (
                <span
                  role="alert"
                  className="mt-3 text-xs font-medium text-red-500"
                >
                  {errors.email.message}
                </span>
              )}
            </div>
            <Button type="submit" className="mt-4" loading={loading}>
              {loading ? 'En cours...' : 'Réinitialiser le mot de passe'}
            </Button>
          </form>
        </>
      )}
    </InfoLayout>
  );
}
