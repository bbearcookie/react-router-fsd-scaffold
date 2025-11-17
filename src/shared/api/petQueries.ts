import { getPetById } from './openapiGenerated';

const petQueries = {
  ALL: () => ['pets'],
  ID: (petId: string) => [...petQueries.ALL(), petId],

  byId: (petId: string) => ({
    queryKey: petQueries.ID(petId),
    queryFn: () => getPetById({ petId: Number(petId) }),
  }),
};

export { petQueries };
