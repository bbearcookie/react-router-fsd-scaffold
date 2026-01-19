import { useQuery } from '@tanstack/react-query';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { petQueries } from '@/shared/api/pet/queries';
import { FindPetsByStatusStatus } from '@/shared/api/generated';

const Route = () => {
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum(Object.values(FindPetsByStatusStatus)),
  );

  const { data, isLoading, isError, error } = useQuery(
    petQueries.byStatus(status as FindPetsByStatusStatus),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || 'Failed to fetch pets'}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No pets found</div>;
  }

  return (
    <div>
      <h2>Pets by Status</h2>
      <select onChange={(e) => setStatus(e.target.value as FindPetsByStatusStatus)}>
        {Object.values(FindPetsByStatusStatus).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <ul>
        {data.map((pet, index) => (
          <li key={index}>
            <div>
              <strong>{pet.name}</strong>
              {pet.status && <span> - Status: {pet.status}</span>}
              {pet.tags && pet.tags.length > 0 && (
                <div>Tags: {pet.tags.map((tag) => tag.name).join(', ')}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Route;
