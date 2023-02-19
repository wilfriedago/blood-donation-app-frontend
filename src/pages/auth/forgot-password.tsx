import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/Buttons';
import { InputField } from '@/components/Fields';
import { InfoLayout, Meta } from '@/layouts';
import { ForgotPasswordDto } from '@/types/dto';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const { control, handleSubmit } = useForm<ForgotPasswordDto>();

  useEffect(() => {
    router.prefetch('/auth/login');
    router.prefetch('/auth/register');
  });

  async function onSubmit(formValues: ForgotPasswordDto) {
    setLoading(true);

    await axios
      .post('/api/auth/forgot', formValues)
      .then(() => setSuccess(true))
      .catch(() => {
        // Do nothing
      })
      .finally(() => setLoading(false));
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
      <Image
        src="/assets/icons/Forgot password-bro.svg"
        width={300}
        height={300}
        alt="Mot de passe oublié"
      />
      {success ? (
        <>
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
          <h1 className="mb-2 text-3xl font-semibold text-gray-900">
            Mot de passe oublié ?
          </h1>
          <p className="mb-4 text-base">
            Saisissez votre adresse e-mail et nous vous enverrons un lien pour
            réinitialiser votre mot de passe.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-y-4 text-start"
          >
            <InputField
              control={control}
              id="email"
              type="email"
              name="email"
              label="Adresse email"
              className="col-span-full"
              readOnly={loading}
              required
              rules={{
                required: "Veuillez renseigner l'adresse email.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Veuillez renseigner une adresse email valide.',
                },
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
    </InfoLayout>
  );
}
