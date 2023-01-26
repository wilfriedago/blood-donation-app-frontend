import Link from 'next/link';

export function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div className="mx-auto">
        <div className="relative shadow-xl sm:overflow-hidden">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="assets/images/hero.jpg"
              alt="People working on laptops"
            />
            <div className="absolute inset-0 bg-rose-600 mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">Votre don</span>
              <span className="block text-indigo-200">sauve des vies</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-base text-rose-100 sm:max-w-3xl lg:text-xl">
              En Afrique, seulement 3% des donneurs éligibles donnent du sang,
              pourtant le besoin est criant. Chaque année, des milliers de
              femmes et d&apos;enfants meurent de causes évitables telles que
              l&apos;accouchement et le paludisme qui auraient pu être traitées
              par une simple transfusion sanguine. Faites partie de la solution
              et donnez du sang aujourd&apos;hui, cela pourrait sauver une vie
              dans votre communauté.
            </p>
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <Link
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-rose-600 shadow-sm hover:bg-indigo-50 sm:px-8"
                >
                  Trouver un centre
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-rose-500/80 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-500/90 sm:px-8"
                >
                  Live demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
