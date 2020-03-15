import { PreferenceRepository } from '@/domain/case/preferenceRepository';
import { Preference } from '@/entities';

export class MemoryPreferenceRepository implements PreferenceRepository {
  getPreferences(): Preference[] {
    return [
      { name: '매콤한' },
      { name: '느끼한' },
      { name: '담백한' },
      { name: '분위기가 좋은' },
      { name: '저렴한' },
    ];
  }
}
