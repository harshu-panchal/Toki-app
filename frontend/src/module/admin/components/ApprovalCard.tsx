import { useState } from 'react';
import { MaterialSymbol } from '../../../shared/components/MaterialSymbol';
import type { FemaleApproval } from '../types/admin.types';

interface ApprovalCardProps {
  approval: FemaleApproval;
  onApprove?: (userId: string) => void;
  onReject?: (userId: string, reason: string) => void;
  onResubmitRequest?: (userId: string, reason: string) => void;
}

export const ApprovalCard = ({
  approval,
  onApprove,
  onReject,
  onResubmitRequest,
}: ApprovalCardProps) => {
  const [showFullProfile, setShowFullProfile] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleRejectPrompt = () => {
    const reason = window.prompt('Enter reason for rejection:');
    if (reason && onReject) {
      onReject(approval.userId, reason);
    }
  };

  const handleResubmitPrompt = () => {
    const reason = window.prompt('Enter reason for requesting resubmission:');
    if (reason && onResubmitRequest) {
      onResubmitRequest(approval.userId, reason);
    }
  };


  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {approval.user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{approval.user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{approval.user.phoneNumber}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Submitted: {formatDate(approval.submittedAt)}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${approval.approvalStatus === 'pending' ? 'bg-orange-100 text-orange-800' :
          approval.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
          {approval.approvalStatus.charAt(0).toUpperCase() + approval.approvalStatus.slice(1).replace('_', ' ')}
        </span>
      </div>

      {/* Profile Preview */}
      <div className="mb-4">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {approval.profile.photos && approval.profile.photos.length > 0 ? (
            approval.profile.photos.slice(0, 3).map((photo, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800"
              >
                <img
                  src={typeof photo === 'string' ? photo : (photo as any).url}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 aspect-video rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <MaterialSymbol name="photo" className="text-gray-400" size={32} />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MaterialSymbol name="cake" className="text-gray-400" size={18} />
            <span className="text-gray-600 dark:text-gray-400">Age: </span>
            <span className="font-medium text-gray-900 dark:text-white">{approval.profile.age}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MaterialSymbol name="location_on" className="text-gray-400" size={18} />
            <span className="text-gray-600 dark:text-gray-400">Location: </span>
            <span className="font-medium text-gray-900 dark:text-white">{approval.profile.city}</span>
          </div>
          {approval.profile.bio && (
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Bio: </span>
              <p className="text-gray-900 dark:text-white mt-1 line-clamp-2">{approval.profile.bio}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowFullProfile(!showFullProfile)}
          className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <MaterialSymbol name={showFullProfile ? 'expand_less' : 'expand_more'} size={20} className="inline mr-1" />
          {showFullProfile ? 'Show Less' : 'Review Documents'}
        </button>
        {approval.approvalStatus === 'pending' && (
          <>
            <button
              onClick={handleResubmitPrompt}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              <MaterialSymbol name="refresh" size={20} className="inline mr-1" />
              Request Resubmit
            </button>
            <button
              onClick={handleRejectPrompt}
              className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <MaterialSymbol name="cancel" size={20} className="inline mr-1" />
              Reject
            </button>
            <button
              onClick={() => onApprove?.(approval.userId)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <MaterialSymbol name="check_circle" size={20} className="inline mr-1" />
              Approve
            </button>
          </>
        )}
      </div>

      {/* Full Profile (Expandable) */}
      {showFullProfile && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Verification Documents</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Aadhaar Card Photo</p>
              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                <img
                  src={approval.verificationDocuments.aadhaarCard.url}
                  alt="Aadhaar Card"
                  className="w-full h-auto max-h-96 object-contain cursor-zoom-in"
                  onClick={() => window.open(approval.verificationDocuments.aadhaarCard.url, '_blank')}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-xs font-medium text-gray-500 uppercase">Full Profile Data</p>
              <div>
                <span className="text-gray-600 dark:text-gray-400">User ID: </span>
                <span className="font-mono text-gray-900 dark:text-white">{approval.userId}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Phone: </span>
                <span className="text-gray-900 dark:text-white">{approval.user.phoneNumber}</span>
              </div>
              {approval.profile.bio && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Full Bio: </span>
                  <p className="text-gray-900 dark:text-white">{approval.profile.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
