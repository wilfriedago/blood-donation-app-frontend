import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import clsx from 'clsx';
import { withIronSessionSsr } from 'iron-session/next';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Logo from '@/assets/icons/logo-blood-donation.png';
import { Button, SocialButton } from '@/components/Buttons';
import { InputField, TextAreaField } from '@/components/Fields';
import { sessionOptions } from '@/config';
import { MainLayout, Meta } from '@/layouts';
import { RegisterDonorDto, RegisterOrganisationDto } from '@/types/dto';

// TODO: Fetch roles from API
const roles = [
  { id: 2, name: 'Sauveur de vie' },
  { id: 3, name: 'Hôpital ou Clinique' },
  { id: 4, name: 'Organisme de collecte' },
];

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const {
    unregister,
    handleSubmit,
    setError,
    reset,
    control,
    setValue,
    watch,
  } = useForm<RegisterOrganisationDto & RegisterDonorDto>();

  useEffect(() => {
    setValue('role', selectedRole!.id);
    router.prefetch('/auth/validation-email');
  }, []);

  function handleChange(selected: typeof roles[0]) {
    reset();
    setSelectedRole(selected);
    setValue('role', selected.id);

    if (selected.id === 2) {
      unregister('name');
      unregister('description');
    } else {
      unregister('firstName');
      unregister('lastName');
    }
  }

  async function onSubmit(
    formValues: RegisterOrganisationDto | RegisterDonorDto
  ) {
    setLoading(true);

    axios
      .post('/api/auth/register', formValues)
      .then(() => {
        reset();
        router.push('/auth/validation-email');
      })
      .catch(({ response }) => {
        if (response?.data?.errors) {
          const { data } = response;

          Object.keys(data.errors).forEach((key: string) => {
            type ErrorKeys =
              | 'email'
              | 'password'
              | 'passwordConfirmation'
              | 'role'
              | 'name'
              | 'description'
              | 'firstName'
              | 'lastName';

            setError(key as ErrorKeys, { message: data.errors[key] });
          });
        }
      })
      .finally(() => setLoading(false));
  }

  async function handleFacebookSignIn() {
    // TODO: Implement Facebook sign in
  }

  async function handleGoogleSignIn() {
    // TODO: Implement Google sign in
  }

  async function handleGithubSignIn() {
    // TODO: Implement Github sign in
  }

  return (
    <MainLayout
      meta={
        <Meta
          title="S'enregistrer | Blood Donation App"
          description="Créez un compte pour continuer."
        />
      }
    >
      <div className="flex flex-col">
        <Link href="/" aria-label="Home" className="w-fit">
          <Image
            src={Logo}
            alt="Blood Donation App Logo"
            width={70}
            height={70}
            unoptimized
          />
        </Link>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Inscrivez-vous pour continuer
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Vous avez déjà un compte ?&nbsp;
            <Link
              href="/auth/login"
              className="font-medium text-rose-600 hover:underline"
            >
              Connectez-vous
            </Link>
            .
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <div className="col-span-full flex flex-col gap-y-2">
          <Listbox
            value={selectedRole}
            disabled={loading}
            onChange={handleChange}
          >
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-gray-700">
                  S&apos;inscris en tant que :
                </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 sm:text-sm">
                    <span className="block truncate">{selectedRole?.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {roles.map((role, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            clsx(
                              active
                                ? 'bg-rose-600 text-white'
                                : 'text-gray-900',
                              'relative cursor-pointer select-none py-2 pl-8 pr-4'
                            )
                          }
                          value={role}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={clsx(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'block truncate'
                                )}
                              >
                                {role.name}
                              </span>
                              {selected ? (
                                <span
                                  className={clsx(
                                    active ? 'text-white' : 'text-rose-600',
                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        {selectedRole?.id === 2 ? (
          <>
            <InputField
              control={control}
              id="lastName"
              name="lastName"
              label="Nom"
              readOnly={loading}
              required
              rules={{
                required: 'Le nom est requis',
                maxLength: {
                  value: 64,
                  message: 'Le nom doit être inférieur à 64 caractères',
                },
              }}
            />

            <InputField
              control={control}
              id="firstName"
              name="firstName"
              label="Prénom"
              readOnly={loading}
              required
              rules={{
                required: 'Le prénom est requis',
                maxLength: {
                  value: 64,
                  message: 'Le prénom doit être inférieur à 64 caractères',
                },
              }}
            />
          </>
        ) : (
          <>
            <InputField
              control={control}
              id="name"
              name="name"
              label="Nom de l'organisation"
              readOnly={loading}
              required
              autoComplete="organization"
              className="col-span-full"
              rules={{
                required: "Le nom de l'organisation est requis",
                maxLength: {
                  value: 512,
                  message:
                    'Le nom de l&apos;organisation doit être inférieur à 512 caractères',
                },
              }}
            />

            <TextAreaField
              control={control}
              rows={3}
              id="description"
              name="description"
              label="Description"
              readOnly={loading}
              autoComplete="organization"
              className="col-span-full"
              rules={{
                maxLength: {
                  value: 2048,
                  message:
                    "La description de l'organisation doit être inférieur à 2048 caractères",
                },
              }}
            />
          </>
        )}

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

        <InputField
          control={control}
          id="password"
          type="password"
          name="password"
          label="Mot de passe"
          className="col-span-full"
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
              message: 'Le mot de passe doit contenir 64 caractères au maximum',
            },
          }}
        />

        <InputField
          control={control}
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          label="Confirmer le mot de passe"
          className="col-span-full"
          readOnly={loading}
          required
          rules={{
            required: 'Veuillez confirmer le mot de passe',
            validate: (value) =>
              value === watch('password') ||
              'Les mots de passe ne correspondent pas',
          }}
        />
        <div className="col-span-full">
          <Button
            type="submit"
            variant="solid"
            color="rose"
            loading={loading}
            className="flex w-full items-center justify-center"
          >
            <span>{loading ? 'Inscription...' : 'Créer un compte'}</span>
          </Button>
        </div>
        <div className="col-span-full">
          <div className="relative z-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-600">
                Ou s&apos;inscrire avec
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <SocialButton
              onClick={handleFacebookSignIn}
              title="Facebook"
              icon="facebook"
            />
            <SocialButton
              onClick={handleGoogleSignIn}
              title="Google"
              icon="google"
            />
            <SocialButton
              onClick={handleGithubSignIn}
              title="Github"
              icon="github"
            />
          </div>
        </div>
      </form>
    </MainLayout>
  );
}

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const { data } = req.session;
  if (data && data.isLoggedIn) {
    res.setHeader('location', '/profile');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        data,
      },
    };
  }

  return {
    props: {
      data: {},
    },
  };
}, sessionOptions);
