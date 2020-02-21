import { Preference } from '@/entities';

export interface PreferenceRepository {
  getPreferences(): Preference[];
}

export const PreferenceRepositoryToken = Symbol();
