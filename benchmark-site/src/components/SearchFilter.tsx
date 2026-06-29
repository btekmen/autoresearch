'use client';

import { useState } from 'react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterOrg: (org: string) => void;
  onFilterLicense: (license: string) => void;
  organizations: string[];
  licenses: string[];
}

export default function SearchFilter({
  onSearch,
  onFilterOrg,
  onFilterLicense,
  organizations,
  licenses,
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [selectedLicense, setSelectedLicense] = useState('all');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleOrgChange = (org: string) => {
    setSelectedOrg(org);
    onFilterOrg(org);
  };

  const handleLicenseChange = (license: string) => {
    setSelectedLicense(license);
    onFilterLicense(license);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      {/* Search */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Search Models
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by model name..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Organization Filter */}
        <div>
          <label htmlFor="org" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Organization
          </label>
          <select
            id="org"
            value={selectedOrg}
            onChange={(e) => handleOrgChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all"
          >
            <option value="all">All Organizations</option>
            {organizations.map(org => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        {/* License Filter */}
        <div>
          <label htmlFor="license" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            License Type
          </label>
          <select
            id="license"
            value={selectedLicense}
            onChange={(e) => handleLicenseChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all"
          >
            <option value="all">All Licenses</option>
            {licenses.map(license => (
              <option key={license} value={license}>
                {license}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
