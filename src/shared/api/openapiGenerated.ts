import { apiClient } from './apiClient';
/**
 * Order Status
 */
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const OrderStatus = {
  placed: 'placed',
  approved: 'approved',
  delivered: 'delivered',
} as const;

export interface Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  /** Order Status */
  status?: OrderStatus;
  complete?: boolean;
}

export interface Category {
  id?: number;
  name?: string;
}

export interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  /** User Status */
  userStatus?: number;
}

export interface Tag {
  id?: number;
  name?: string;
}

/**
 * pet status in the store
 */
export type PetStatus = (typeof PetStatus)[keyof typeof PetStatus];

export const PetStatus = {
  available: 'available',
  pending: 'pending',
  sold: 'sold',
} as const;

export interface Pet {
  id?: number;
  name: string;
  category?: Category;
  photoUrls: string[];
  tags?: Tag[];
  /** pet status in the store */
  status?: PetStatus;
}

export interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
}

/**
 * Pet object that needs to be added to the store
 */
export type PetBody = Pet;

/**
 * List of user object
 */
export type UserArrayBody = User[];

export type FindPetsByStatusParams = {
  /**
   * Status values that need to be considered for filter
   */
  status?: FindPetsByStatusStatus;
};

export type FindPetsByStatusStatus =
  (typeof FindPetsByStatusStatus)[keyof typeof FindPetsByStatusStatus];

export const FindPetsByStatusStatus = {
  available: 'available',
  pending: 'pending',
  sold: 'sold',
} as const;

export type FindPetsByTagsParams = {
  /**
   * Tags to filter by
   */
  tags: string[];
};

export type UpdatePetWithFormParams = {
  /**
   * Name of pet that needs to be updated
   */
  name?: string;
  /**
   * Status of pet that needs to be updated
   */
  status?: string;
};

export type UploadFileParams = {
  /**
   * Additional Metadata
   */
  additionalMetadata?: string;
};

export type GetInventory200 = { [key: string]: number };

export type LoginUserParams = {
  /**
   * The user name for login
   */
  username?: string;
  /**
   * The password for login in clear text
   */
  password?: string;
};

/**
 * Update an existing pet by Id.
 * @summary Update an existing pet.
 */
export const updatePet = (pet: Pet) => {
  return apiClient<Pet>({
    url: `/pet`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: pet,
  });
};

/**
 * Add a new pet to the store.
 * @summary Add a new pet to the store.
 */
export const addPet = (pet: Pet) => {
  return apiClient<Pet>({
    url: `/pet`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: pet,
  });
};

/**
 * Multiple status values can be provided with comma separated strings.
 * @summary Finds Pets by status.
 */
export const findPetsByStatus = (params: FindPetsByStatusParams) => {
  return apiClient<Pet[]>({ url: `/pet/findByStatus`, method: 'GET', params });
};

/**
 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 * @summary Finds Pets by tags.
 */
export const findPetsByTags = (params: FindPetsByTagsParams) => {
  return apiClient<Pet[]>({ url: `/pet/findByTags`, method: 'GET', params });
};

/**
 * Returns a single pet.
 * @summary Find pet by ID.
 */
export const getPetById = (petId: number) => {
  return apiClient<Pet>({ url: `/pet/${petId}`, method: 'GET' });
};

/**
 * Updates a pet resource based on the form data.
 * @summary Updates a pet in the store with form data.
 */
export const updatePetWithForm = (petId: number, params?: UpdatePetWithFormParams) => {
  return apiClient<Pet>({ url: `/pet/${petId}`, method: 'POST', params });
};

/**
 * Delete a pet.
 * @summary Deletes a pet.
 */
export const deletePet = (petId: number) => {
  return apiClient<void>({ url: `/pet/${petId}`, method: 'DELETE' });
};

/**
 * Upload image of the pet.
 * @summary Uploads an image.
 */
export const uploadFile = (petId: number, uploadFileBody: Blob, params?: UploadFileParams) => {
  return apiClient<ApiResponse>({
    url: `/pet/${petId}/uploadImage`,
    method: 'POST',
    headers: { 'Content-Type': 'application/octet-stream' },
    data: uploadFileBody,
    params,
  });
};

/**
 * Returns a map of status codes to quantities.
 * @summary Returns pet inventories by status.
 */
export const getInventory = () => {
  return apiClient<GetInventory200>({ url: `/store/inventory`, method: 'GET' });
};

/**
 * Place a new order in the store.
 * @summary Place an order for a pet.
 */
export const placeOrder = (order: Order) => {
  return apiClient<Order>({
    url: `/store/order`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: order,
  });
};

/**
 * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 * @summary Find purchase order by ID.
 */
export const getOrderById = (orderId: number) => {
  return apiClient<Order>({ url: `/store/order/${orderId}`, method: 'GET' });
};

/**
 * For valid response try integer IDs with value < 1000. Anything above 1000 or non-integers will generate API errors.
 * @summary Delete purchase order by identifier.
 */
export const deleteOrder = (orderId: number) => {
  return apiClient<void>({ url: `/store/order/${orderId}`, method: 'DELETE' });
};

/**
 * This can only be done by the logged in user.
 * @summary Create user.
 */
export const createUser = (user: User) => {
  return apiClient<User>({
    url: `/user`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: user,
  });
};

/**
 * Creates list of users with given input array.
 * @summary Creates list of users with given input array.
 */
export const createUsersWithListInput = (user: User[]) => {
  return apiClient<User>({
    url: `/user/createWithList`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: user,
  });
};

/**
 * Log into the system.
 * @summary Logs user into the system.
 */
export const loginUser = (params?: LoginUserParams) => {
  return apiClient<string>({ url: `/user/login`, method: 'GET', params });
};

/**
 * Log user out of the system.
 * @summary Logs out current logged in user session.
 */
export const logoutUser = () => {
  return apiClient<void>({ url: `/user/logout`, method: 'GET' });
};

/**
 * Get user detail based on username.
 * @summary Get user by user name.
 */
export const getUserByName = (username: string) => {
  return apiClient<User>({ url: `/user/${username}`, method: 'GET' });
};

/**
 * This can only be done by the logged in user.
 * @summary Update user resource.
 */
export const updateUser = (username: string, user: User) => {
  return apiClient<void>({
    url: `/user/${username}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: user,
  });
};

/**
 * This can only be done by the logged in user.
 * @summary Delete user resource.
 */
export const deleteUser = (username: string) => {
  return apiClient<void>({ url: `/user/${username}`, method: 'DELETE' });
};

export type UpdatePetResult = NonNullable<Awaited<ReturnType<typeof updatePet>>>;
export type AddPetResult = NonNullable<Awaited<ReturnType<typeof addPet>>>;
export type FindPetsByStatusResult = NonNullable<Awaited<ReturnType<typeof findPetsByStatus>>>;
export type FindPetsByTagsResult = NonNullable<Awaited<ReturnType<typeof findPetsByTags>>>;
export type GetPetByIdResult = NonNullable<Awaited<ReturnType<typeof getPetById>>>;
export type UpdatePetWithFormResult = NonNullable<Awaited<ReturnType<typeof updatePetWithForm>>>;
export type DeletePetResult = NonNullable<Awaited<ReturnType<typeof deletePet>>>;
export type UploadFileResult = NonNullable<Awaited<ReturnType<typeof uploadFile>>>;
export type GetInventoryResult = NonNullable<Awaited<ReturnType<typeof getInventory>>>;
export type PlaceOrderResult = NonNullable<Awaited<ReturnType<typeof placeOrder>>>;
export type GetOrderByIdResult = NonNullable<Awaited<ReturnType<typeof getOrderById>>>;
export type DeleteOrderResult = NonNullable<Awaited<ReturnType<typeof deleteOrder>>>;
export type CreateUserResult = NonNullable<Awaited<ReturnType<typeof createUser>>>;
export type CreateUsersWithListInputResult = NonNullable<
  Awaited<ReturnType<typeof createUsersWithListInput>>
>;
export type LoginUserResult = NonNullable<Awaited<ReturnType<typeof loginUser>>>;
export type LogoutUserResult = NonNullable<Awaited<ReturnType<typeof logoutUser>>>;
export type GetUserByNameResult = NonNullable<Awaited<ReturnType<typeof getUserByName>>>;
export type UpdateUserResult = NonNullable<Awaited<ReturnType<typeof updateUser>>>;
export type DeleteUserResult = NonNullable<Awaited<ReturnType<typeof deleteUser>>>;
