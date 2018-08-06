import { DayOfWeek, Language, TimeFormat } from '../../shared/types';

export interface SettingsViewModel {
  sessionTimeout: number;
  isSavePasswordForVMs: boolean;
  interfaceLanguage: Language;
  firstDayOfWeek: DayOfWeek;
  timeFormat: TimeFormat;
  theme: string;
}
