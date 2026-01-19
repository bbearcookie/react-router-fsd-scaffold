import { mutationOptions } from '@tanstack/react-query';
import { deletePet, updatePetWithForm } from '../generated';
import { petQueries } from './queries';

const petMutations = {
  updatePetWithForm: (args: {
    id: Parameters<typeof updatePetWithForm>[0];
    params: Parameters<typeof updatePetWithForm>[1];
  }) =>
    mutationOptions({
      mutationFn: () => updatePetWithForm(args.id, args.params),
      meta: {
        invalidates: [petQueries.ALL()],
      },
    }),

  deletePet: mutationOptions({
    mutationFn: deletePet,
    meta: {
      invalidates: [petQueries.ALL()],
    },
  }),
};

export { petMutations };
