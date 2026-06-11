
import { makeAutoObservable } from 'mobx';
import type { StaffMember } from '../types';
import type { CatalogStateStore } from './catalogState';

export class CatalogSync {
  constructor(private readonly state: CatalogStateStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getStaff(): StaffMember[] {
    return this.state.staff;
  }

  getActiveCategory(): string | null {
    return this.state.activeCategory;
  }

  getIsLoaded(): boolean {
    return this.state.isLoaded;
  }

  getFilteredStaff(): StaffMember[] {
    return this.state.activeCategory
      ? this.state.staff.filter((member) => member.role === this.state.activeCategory)
      : this.state.staff;
  }

  setStaff(staff: StaffMember[]): void {
    this.state.staff = staff;
  }

  setActiveCategory(category: string | null): void {
    this.state.activeCategory = category;
  }

  setIsLoaded(isLoaded: boolean): void {
    this.state.isLoaded = isLoaded;
  }
}

export type CatalogSyncStore = CatalogSync;
