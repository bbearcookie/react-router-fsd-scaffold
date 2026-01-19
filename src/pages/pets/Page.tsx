import { useQuery } from '@tanstack/react-query';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { Link } from 'react-router';
import { petQueries } from '@/shared/api/pet/queries';
import { FindPetsByStatusStatus } from '@/shared/api/generated';
import { ROUTES } from '@/shared/router';

const Route = () => {
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum(Object.values(FindPetsByStatusStatus)),
  );

  const { data, isLoading, isError, error } = useQuery(
    petQueries.byStatus(status as FindPetsByStatusStatus),
  );

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <div className="text-red-600">Error: {error?.message || 'Failed to fetch pets'}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-8">
        <h2 className="mb-4 text-2xl font-bold">Pet 목록</h2>
        <div className="text-gray-600">해당 상태의 Pet이 없습니다</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h2 className="mb-6 text-2xl font-bold">Pet 목록</h2>

      <div className="mb-6">
        <label htmlFor="status-select" className="mb-2 block text-sm font-medium">
          상태로 필터링:
        </label>
        <select
          id="status-select"
          className="rounded-md border border-gray-300 px-4 py-2"
          value={status || ''}
          onChange={(e) => setStatus(e.target.value as FindPetsByStatusStatus)}
        >
          {Object.values(FindPetsByStatusStatus).map((statusValue) => (
            <option key={statusValue} value={statusValue}>
              {statusValue}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {data.map((pet, index) => (
          <Link
            key={index}
            to={ROUTES.PETS.DETAIL(String(pet.id))}
            className="block rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-500 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                {pet.status && (
                  <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                    {pet.status}
                  </span>
                )}
                {pet.category && (
                  <p className="mt-2 text-sm text-gray-600">카테고리: {pet.category.name}</p>
                )}
                {pet.tags && pet.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {pet.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="ml-4 text-gray-400">→</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Route;
