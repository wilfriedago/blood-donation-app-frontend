import { useLayoutEffect, useRef, useState } from 'react';

import { User } from '@/types/entities';
import { TableProps } from '@/types/props';

import { Pagination } from './Pagination';

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export function Table({ content, datalist, columns, actions }: TableProps) {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedRow, setSelectedRow] = useState<T>([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedRow.length > 0 && selectedRow.length < datalist.length;

    setChecked(selectedRow.length === datalist.length);

    setIndeterminate(isIndeterminate);

    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedRow]);

  function toggleAll() {
    setSelectedRow(checked || indeterminate ? [] : datalist);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {content.title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{content.description}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => actions?.add()}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            {content.button}
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 md:rounded-lg">
              {selectedRow.length > 0 && (
                <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Tout éditer
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Tout supprimer
                  </button>
                </div>
              )}
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="relative w-12 px-6 sm:w-16 sm:px-8"
                    >
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={
                          index === 0
                            ? 'py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                            : 'px-3 py-3.5 text-center text-sm font-semibold text-gray-900'
                        }
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {datalist?.map((user: User) => (
                    <tr
                      key={user.id}
                      className={
                        selectedRow.includes(user) ? 'bg-gray-50' : undefined
                      }
                    >
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        {selectedRow.includes(user) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          value={user.email}
                          checked={selectedRow.includes(user)}
                          onChange={(e) =>
                            setSelectedRow(
                              e.target.checked
                                ? [...selectedRow, user]
                                : selectedRow.filter((p: any) => p !== user)
                            )
                          }
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user?.photo?.id}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div
                              className={classNames(
                                'font-medium',
                                selectedRow.includes(user)
                                  ? 'text-indigo-600'
                                  : 'text-gray-900'
                              )}
                            >
                              {`${user.firstName} ${user.lastName}`}
                            </div>
                            <div className="text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        <div className="text-gray-900">{'N/A'}</div>
                        <div className="text-gray-500">{user?.depar}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        {user?.status ? (
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Actif
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                            Inactif
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        {user?.role.name}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => actions?.edit(user?.id)}
                          className="pr-4 text-indigo-600 hover:text-indigo-900"
                        >
                          Éditer
                        </button>
                        <button
                          onClick={() => actions?.delete(user?.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination datalist={datalist} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
