import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import router from 'next/router';
import { signIn } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, SocialButton } from '@/components';
import { RegisterUserDto } from '@/interfaces/dto';
import { AuthLayout, Meta } from '@/layouts';
import api from '@/services/api';
import {
  getPasswordStrength,
  getPasswordStrengthBarColor,
} from '@/utils/functions';

const profiles = [
  { name: 'Donneur' },
  { name: 'Organisme Social' },
  { name: 'Représentant Croix Rouge' },
  { name: 'Hôpital ou Clinique' },
];

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(profiles[0]);

  const [passwordStrengthBar, setPasswordStrengthBar] = useState({
    width: 0,
    backgroundColor: '',
  });
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<RegisterUserDto>();

  useEffect(() => {
    router.prefetch('/auth/validation-email');
  }, []);

  async function onSubmit(formValues: RegisterUserDto) {
    setLoading(true);

    await api
      .registerEmail(formValues)
      .then(() => {
        setLoading(false);
        router.push({
          pathname: '/auth/validation-email',
          query: { email: formValues.email },
        });
      })
      .catch(({ response }) => {
        setLoading(false);
        if (response?.data?.errors) {
          const { data } = response;

          Object.keys(data.errors).forEach((key: string) =>
            // @ts-ignore
            setError(key, { message: data.errors[key] })
          );
        }
      });
  }

  // Facebook Handler function
  async function handleFacebookSignIn() {
    signIn('facebook', { callbackUrl: 'http://localhost:3000' });
  }

  // Google Handler function
  async function handleGoogleSignIn() {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  }

  // Github Login
  async function handleGithubSignIn() {
    signIn('github', { callbackUrl: 'http://localhost:3000' });
  }

  return (
    <AuthLayout
      meta={
        <Meta
          title="S'enregistrer | Blood Donation App"
          description="Créez un compte pour continuer."
        />
      }
    >
      <div className="flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Inscrivez-vous
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-x-2">
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nom
                  </label>
                  <input
                    {...register('lastName', {
                      required: 'Le nom est requis',
                      maxLength: {
                        value: 64,
                        message: 'Le nom doit être inférieur à 64 caractères',
                      },
                    })}
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    aria-describedby="lastName-error"
                    aria-invalid={!!errors?.lastName}
                    className={`mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
                      errors?.lastName && 'border-red-500'
                    }`}
                  />
                  {errors?.lastName && (
                    <span
                      role="alert"
                      id="lastName-error"
                      className="text-xs text-red-500"
                    >
                      {errors.lastName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Prénom
                  </label>
                  <input
                    {...register('firstName', {
                      required: 'Le prénom est requis',
                      maxLength: {
                        value: 64,
                        message:
                          'Le prénom doit être inférieur à 64 caractères',
                      },
                    })}
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    aria-describedby="firstName-error"
                    aria-invalid={!!errors?.firstName}
                    className={`mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
                      errors?.firstName && 'border-red-500'
                    }`}
                  />
                  {errors?.firstName && (
                    <span
                      role="alert"
                      id="firstName-error"
                      className="text-xs text-red-500"
                    >
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adresse Email
                </label>
                <input
                  {...register('email', {
                    required: "L'adresse email est requis",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse email invalide',
                    },
                  })}
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-describedby="email-error"
                  aria-invalid={!!errors?.email}
                  className={`mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
                    errors?.email && 'border-red-500'
                  }`}
                />
              </div>
              {errors?.email && (
                <span
                  role="alert"
                  id="email-error"
                  className="text-xs text-red-500"
                >
                  {errors.email.message}
                </span>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
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
                  className={`mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
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
                  className="block text-sm font-medium text-gray-700"
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
                    onChange(e) {
                      clearErrors('passwordConfirmation');
                      const strength = getPasswordStrength(e.target.value);
                      setPasswordStrengthBar({
                        width: strength,
                        backgroundColor: getPasswordStrengthBarColor(strength),
                      });
                    },
                  })}
                  id="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  aria-describedby="confirm-password-error"
                  aria-invalid={!!errors?.passwordConfirmation}
                  className={`mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
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
              {passwordStrengthBar.width !== 0 && (
                <div className="h-2 w-full rounded-full border border-gray-400">
                  <div
                    className="h-full rounded-full text-center text-xs text-white shadow-inner transition-all duration-500 ease-in-out"
                    style={{
                      width: `${passwordStrengthBar.width}%`,
                      backgroundColor: passwordStrengthBar.backgroundColor,
                    }}
                  ></div>
                </div>
              )}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  S&apos;inscris en tant que :
                </label>
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative z-20">
                    <Listbox.Button className="mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-start text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                      <span className="block truncate">{selected?.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {profiles.map((profile, profileId) => (
                          <Listbox.Option
                            key={profileId}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-indigo-100 text-indigo-900'
                                  : 'text-gray-900'
                              }`
                            }
                            value={profile}
                          >
                            {
                              // eslint-disable-next-line @typescript-eslint/no-shadow
                              ({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {profile.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )
                            }
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div>
                <Button type="submit" className="mt-4" loading={loading}>
                  {loading ? 'En cours...' : 'Créer un compte'}
                </Button>
              </div>
            </form>
            <div className="mt-6">
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
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-sm tracking-tight text-gray-900">
        <span className="px-2 text-gray-600">Vous aviez déjà un compte ?</span>
        <Link
          href="/auth/login"
          className="border-none text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          Se connecter
        </Link>
      </div>
    </AuthLayout>
  );
}
