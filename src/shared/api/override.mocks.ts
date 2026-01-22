import { deletePetMock } from './pet/mocks/deletePet.mocks';

export const getMockOverrideHandlers = () => [deletePetMock.DEFAULT()];
