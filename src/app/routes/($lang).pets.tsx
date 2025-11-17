import { useQuery } from '@tanstack/react-query';
import { petQueries } from '@/shared/api/pet.queries';

const Route = () => {
  const tags = ['tag1', 'tag2'];
  const { data, isLoading, isError, error } = useQuery(petQueries.byTags(tags));

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
      <h2>Pets by Tags</h2>
      <ul>
        {data.map((pet) => (
          <li key={pet.id}>
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
