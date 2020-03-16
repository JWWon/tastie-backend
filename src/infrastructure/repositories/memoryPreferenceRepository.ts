import { PreferenceRepository } from '@/domain/case/preferenceRepository';
import { Preference } from '@/entities';

export class MemoryPreferenceRepository implements PreferenceRepository {
  getPreferences(): Preference[] {
    return [
      { name: '맛집 투어하는 것' },
      { name: '인생샷 남기는 것' },
      { name: '가까운 곳에 가는 것' },
      { name: '한적하게 시간 보내는 것' },
      { name: '새로운 장소에 가는 것' },
      { name: '사람 구경 하는 것' },
    ];
  }
}
