import { createSelector } from '@reduxjs/toolkit';

export const selectCaseStudiesState = (state) => state.caseStudies;

export const selectAllCaseStudies = (state) => state.caseStudies.items;

export const selectCaseStudiesStatus = (state) => state.caseStudies.status;

export const selectCaseStudiesError = (state) => state.caseStudies.error;

export const selectFilters = (state) => state.caseStudies.filters;

export const selectFilteredCaseStudies = createSelector(
  [selectAllCaseStudies, selectFilters],
  (items, filters) => {
    let filtered = items;

    // Apply category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(
        (item) => item.category === filters.category
      );
    }

    // Apply search filter
    if (filters.query.trim()) {
      const searchTerm = filters.query.trim().toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.summary.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }
);

export const selectVisibleCount = createSelector(
  [selectFilteredCaseStudies],
  (filtered) => filtered.length
);

export const selectActiveCategory = (state) => state.caseStudies.filters.category;

export const selectSearchQuery = (state) => state.caseStudies.filters.query;
