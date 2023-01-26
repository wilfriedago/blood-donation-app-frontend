import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import router from 'next/router';
import { signIn } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FACEBOOK_CALLBACK_URL,
  GITHUB_CALLBACK_URL,
  GOOGLE_CALLBACK_URL,
} from '@/AppConfig';
import { Button, SocialButton } from '@/components';
import { useApi } from '@/hooks';
import { MainLayout, Meta } from '@/layouts';
import { RegisterDonorDto, RegisterOrganisationDto } from '@/types/dto';
import {
  getPasswordStrength,
  getPasswordStrengthBarColor,
} from '@/utils/functions';

// FIXME: Fetch roles from API
const roles = [
  { id: 2, name: 'Sauveur de vie' },
  { id: 3, name: 'Hôpital ou Clinique' },
  { id: 4, name: 'Organisme de collecte' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [passwordStrengthBar, setPasswordStrengthBar] = useState({
    width: 0,
    backgroundColor: '',
  });

  const {
    register,
    unregister,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RegisterOrganisationDto & RegisterDonorDto>();

  const { api } = useApi();

  useEffect(() => {
    router.prefetch('/auth/validation-email');
    setValue('role', selectedRole?.id as number);
  }, []);

  function handleChange(selected: typeof roles[0]) {
    reset();
    setSelectedRole(selected);
    setValue('role', selected.id);

    setPasswordStrengthBar({
      width: 0,
      backgroundColor: '',
    });

    if (selected.id === 2) {
      unregister('name');
      unregister('description');
    }

    if (selected.id === 3 || selected.id === 4) {
      unregister('firstName');
      unregister('lastName');
    }
  }

  async function onSubmit(
    formValues: RegisterOrganisationDto | RegisterDonorDto
  ) {
    setLoading(true);

    await api
      .registerEmail(formValues)
      .then(() => {
        setLoading(false);
        reset();
        router.push({
          pathname: '/validation-email',
          query: { email: formValues.email },
        });
      })
      .catch(({ response }) => {
        setLoading(false);

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
      });
  }

  async function handleFacebookSignIn() {
    signIn('facebook', { callbackUrl: FACEBOOK_CALLBACK_URL });
  }

  async function handleGoogleSignIn() {
    signIn('google', { callbackUrl: GOOGLE_CALLBACK_URL });
  }

  async function handleGithubSignIn() {
    signIn('github', { callbackUrl: GITHUB_CALLBACK_URL });
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
              <div>
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
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                          <span className="block truncate">
                            {selectedRole?.name}
                          </span>
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
                                  classNames(
                                    active
                                      ? 'text-white bg-indigo-600'
                                      : 'text-gray-900',
                                    'relative cursor-pointer select-none py-2 pl-8 pr-4'
                                  )
                                }
                                value={role}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'block truncate'
                                      )}
                                    >
                                      {role.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? 'text-white'
                                            : 'text-indigo-600',
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

              {selectedRole?.id === 2 && (
                <div className="flex gap-x-2">
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nom
                      <span className="text-red-500">&nbsp;*</span>
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
                      readOnly={loading}
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
                      <span className="text-red-500">&nbsp;*</span>
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
                      readOnly={loading}
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
              )}

              {selectedRole?.id !== 2 && (
                <>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nom de l&apos;organisation
                      <span className="text-red-500">&nbsp;*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        {...register('name', {
                          required: "Le nom de l'organisation est requis",
                          maxLength: {
                            value: 512,
                            message:
                              'Le nom de l&apos;organisation doit être inférieur à 512 caractères',
                          },
                        })}
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="organization"
                        aria-describedby="name-error"
                        aria-invalid={!!errors?.name}
                        readOnly={loading}
                        className={`mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
                          errors?.name && 'border-red-500'
                        }`}
                      />
                      {errors?.name && (
                        <span
                          role="alert"
                          id="name-error"
                          className="text-xs text-red-500"
                        >
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <textarea
                        {...register('description', {
                          maxLength: {
                            value: 2048,
                            message:
                              'La description doit être inférieure à 2048 caractères',
                          },
                        })}
                        id="description"
                        name="description"
                        rows={3}
                        aria-describedby="description-error"
                        aria-invalid={!!errors?.description}
                        readOnly={loading}
                        className={`mt-1 block h-20 w-full appearance-none rounded-md bg-white px-3 py-2 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
                          errors?.description && 'border-red-500'
                        }`}
                      />
                      {errors?.description && (
                        <span
                          role="alert"
                          id="description-error"
                          className="text-xs text-red-500"
                        >
                          {errors.description.message}
                        </span>
                      )}
                      <p className="mt-2 text-sm text-gray-500">
                        Décrivez brièvement votre organisation.
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adresse Email
                  <span className="text-red-500">&nbsp;*</span>
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
                  readOnly={loading}
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
                  <span className="text-red-500">&nbsp;*</span>
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
                  readOnly={loading}
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
                  <span className="text-red-500">&nbsp;*</span>
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
                  readOnly={loading}
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
    </MainLayout>
  );
}
