import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCaseStudies,
  setCategory,
  setQuery
} from '../features/caseStudies/caseStudiesSlice';
import {
  selectFilteredCaseStudies,
  selectCaseStudiesStatus,
  selectCaseStudiesError,
  selectActiveCategory,
  selectSearchQuery,
  selectVisibleCount
} from '../features/caseStudies/caseStudiesSelectors';

const CATEGORIES = ['All', 'Web', 'Mobile', 'AI', 'Blockchain'];

const CaseStudiesCard = ({ caseStudy }) => {
  const getCategoryColor = (category) => {
    const colors = {
      Web: 'from-blue-500 to-cyan-500',
      Mobile: 'from-purple-500 to-pink-500',
      AI: 'from-green-500 to-emerald-500',
      Blockchain: 'from-orange-500 to-red-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="group bg-gradient-to-br from-[#110D2E]/50 to-[#1a0f3e]/50 rounded-lg overflow-hidden border border-[#3F5EFB]/20 hover:border-[#3F5EFB]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#3F5EFB]/20 h-full flex flex-col">
      {/* Category Badge */}
      <div className={`bg-gradient-to-r ${getCategoryColor(caseStudy.category)} p-1`}>
        <div className="bg-[#110D2E] px-4 py-2 rounded">
          <span className="text-sm font-semibold text-white">
            {caseStudy.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white group-hover:text-[#3F5EFB] transition-colors duration-200 line-clamp-2">
            {caseStudy.title}
          </h3>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
          {caseStudy.summary}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Year {caseStudy.year}</span>
          <span className="text-xs bg-[#3F5EFB]/20 text-[#3F5EFB] px-3 py-1 rounded-full">
            Case Study
          </span>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-gradient-to-br from-[#110D2E]/50 to-[#1a0f3e]/50 rounded-lg overflow-hidden border border-[#3F5EFB]/20 p-6 animate-pulse">
    <div className="h-6 bg-gray-700 rounded mb-4 w-20"></div>
    <div className="h-5 bg-gray-700 rounded mb-3 w-full"></div>
    <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
    <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
    <div className="h-4 bg-gray-700 rounded w-24"></div>
  </div>
);

const CaseStudies = () => {
  const dispatch = useDispatch();
  const filteredCaseStudies = useSelector(selectFilteredCaseStudies);
  const status = useSelector(selectCaseStudiesStatus);
  const error = useSelector(selectCaseStudiesError);
  const activeCategory = useSelector(selectActiveCategory);
  const searchQuery = useSelector(selectSearchQuery);
  const visibleCount = useSelector(selectVisibleCount);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCaseStudies());
    }
  }, [status, dispatch]);

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  const handleSearchChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const handleRetry = () => {
    dispatch(fetchCaseStudies());
  };

  return (
    <div id="case-studies" className="container mx-auto py-16 px-4">
      {/* Header */}
      <div className="flex justify-center items-center flex-col text-white gap-y-4 mb-12">
        <h1 className="text-3xl font-semibold text-center">Our Case Studies</h1>
        <p className="mt-4 w-full lg:w-1/2 text-center text-gray-400">
          Explore our successful projects across various technologies and industries.
          See how we deliver excellence for our clients.
        </p>
      </div>

      {/* Filters Section */}
      <div className="mb-12">
        {/* Category Filter Chips */}
        <div className="mb-6">
          <p className="text-white font-medium mb-4">Filter by Category:</p>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] text-white shadow-lg'
                    : 'bg-[#1a0f3e] text-gray-400 border border-[#3F5EFB]/30 hover:border-[#3F5EFB]/60 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <p className="text-white font-medium mb-4">Search:</p>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title or summary..."
            className="w-full px-4 py-3 rounded-lg bg-[#1a0f3e] border border-[#3F5EFB]/30 focus:border-[#3F5EFB] text-white placeholder-gray-500 focus:outline-none transition-colors duration-200"
          />
        </div>
      </div>

      {/* Loading State */}
      {status === 'loading' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {status === 'failed' && (
        <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/30">
          <p className="text-white text-lg font-semibold mb-4">
            {error || 'Failed to load case studies'}
          </p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* Success State - Empty Result */}
      {status === 'succeeded' && visibleCount === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-white text-xl font-semibold mb-2">No case studies found</p>
          <p className="text-gray-400 mb-6">
            Try another category or search term.
          </p>
        </div>
      )}

      {/* Success State - Results Grid */}
      {status === 'succeeded' && visibleCount > 0 && (
        <div className="transition-opacity duration-300 ease-in-out">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((caseStudy) => (
              <CaseStudiesCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudies;
