import { queryOptions } from '@tanstack/react-query';
import {
  getPetById,
  findPetsByStatus,
  type FindPetsByStatusStatus,
  findPetsByTags,
} from './generated';

const petQueries = {
  ALL: () => ['pets'],
  ID: (petId: string) => [...petQueries.ALL(), petId],
  BY_STATUS: (status: FindPetsByStatusStatus) => [...petQueries.ALL(), status],
  BY_TAGS: (tags: string[]) => [...petQueries.ALL(), tags],

  byId: (petId: string) =>
    queryOptions({
      queryKey: petQueries.ID(petId),
      queryFn: () => getPetById({ petId: Number(petId) }),
    }),

  byStatus: (status: FindPetsByStatusStatus) =>
    queryOptions({
      queryKey: petQueries.BY_STATUS(status),
      queryFn: () => findPetsByStatus({ status }),
    }),

  byTags: (tags: string[]) =>
    queryOptions({
      queryKey: petQueries.BY_TAGS(tags),
      queryFn: () => findPetsByTags({ tags }),
    }),
};

export { petQueries };
