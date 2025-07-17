import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useWeb3 } from './hooks/useWeb3';
import { Institution } from './types';
import Header from './components/Header';
import InstitutionCard from './components/InstitutionCard';
import AddInstitutionModal from './components/AddInstitutionModal';
import AddReviewModal from './components/AddReviewModal';
import ReviewsModal from './components/ReviewsModal';
import SearchAndFilter from './components/SearchAndFilter';

const App: React.FC = () => {
  const { contract, isConnected, error } = useWeb3();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddInstitution, setShowAddInstitution] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const categories = [
    'Banking & Finance',
    'Healthcare',
    'Education',
    'Technology',
    'Government',
    'Non-Profit',
    'Retail',
    'Insurance',
    'Real Estate',
    'Other',
  ];

  useEffect(() => {
    if (contract) {
      loadInstitutions();
    }
  }, [contract]);

  useEffect(() => {
    filterInstitutions();
  }, [institutions, searchTerm, selectedCategory]);

  const loadInstitutions = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const institutionsData = await contract.getAllInstitutions();
      
      const formattedInstitutions = institutionsData.map((inst: any) => ({
        id: Number(inst.id),
        name: inst.name,
        category: inst.category,
        description: inst.description,
        website: inst.website,
        owner: inst.owner,
        totalReviews: Number(inst.totalReviews),
        totalRating: Number(inst.totalRating),
        timestamp: Number(inst.timestamp),
        isActive: inst.isActive,
      }));
      
      setInstitutions(formattedInstitutions);
    } catch (error) {
      console.error('Error loading institutions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterInstitutions = () => {
    let filtered = institutions;
    
    if (searchTerm) {
      filtered = filtered.filter(institution =>
        institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institution.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(institution =>
        institution.category === selectedCategory
      );
    }
    
    setFilteredInstitutions(filtered);
  };

  const handleViewReviews = (institutionId: number) => {
    const institution = institutions.find(inst => inst.id === institutionId);
    if (institution) {
      setSelectedInstitution({ id: institutionId, name: institution.name });
      setShowReviews(true);
    }
  };

  const handleAddReview = (institutionId: number) => {
    const institution = institutions.find(inst => inst.id === institutionId);
    if (institution) {
      setSelectedInstitution({ id: institutionId, name: institution.name });
      setShowAddReview(true);
    }
  };

  const handleInstitutionAdded = () => {
    loadInstitutions();
  };

  const handleReviewAdded = () => {
    loadInstitutions();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Institutional Reviews
            </h1>
            <p className="text-gray-600">
              Discover and review institutions on the blockchain
            </p>
          </div>
          
          <button
            onClick={() => setShowAddInstitution(true)}
            disabled={!isConnected}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Add Institution</span>
          </button>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading institutions...</p>
          </div>): filteredInstitutions.length == 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-md p-12">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No institutions found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory
                  ? 'Try adjusting your search or filters'
                  : 'Be the first to add an institution to get started'}
              </p>
              {!searchTerm && !selectedCategory && (
                <button
                  onClick={() => setShowAddInstitution(true)}
                  disabled={!isConnected}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Add First Institution
                </button>
              )}
            </div>
          </div>
        ) :'' }
       {isConnected ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutions.map(institution => (
              <InstitutionCard
                key={institution.id}
                institution={institution}
                onViewReviews={handleViewReviews}
                onAddReview={handleAddReview}
              />
            ))}
          </div>
        ) : ''}
      </main>

      <AddInstitutionModal
        isOpen={showAddInstitution}
        onClose={() => setShowAddInstitution(false)}
        onSuccess={handleInstitutionAdded}
      />

      <AddReviewModal
        isOpen={showAddReview}
        onClose={() => setShowAddReview(false)}
        onSuccess={handleReviewAdded}
        institutionId={selectedInstitution?.id || 0}
        institutionName={selectedInstitution?.name || ''}
      />

      <ReviewsModal
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
        institutionId={selectedInstitution?.id || 0}
        institutionName={selectedInstitution?.name || ''}
      />
    </div>
  );
};

export default App;