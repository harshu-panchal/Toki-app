import { useState } from 'react';
import { MaterialSymbol } from './MaterialSymbol';

interface PermissionPromptProps {
    onRequestPermissions: () => void;
    onDismiss: () => void;
}

export const PermissionPrompt = ({ onRequestPermissions, onDismiss }: PermissionPromptProps) => {
    const [isRequesting, setIsRequesting] = useState(false);

    const handleRequest = async () => {
        setIsRequesting(true);
        await onRequestPermissions();
        setIsRequesting(false);
    };

    return (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#342d18] rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4">
                <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 mb-3">
                        <MaterialSymbol name="security" size={32} className="text-pink-600 dark:text-pink-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Enable Permissions
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        To use video calls and find nearby users, please allow access to your camera, microphone, and location.
                    </p>
                </div>

                <div className="space-y-2">
                    <button
                        onClick={handleRequest}
                        disabled={isRequesting}
                        className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50"
                    >
                        {isRequesting ? 'Requesting...' : 'Allow Permissions'}
                    </button>
                    <button
                        onClick={onDismiss}
                        disabled={isRequesting}
                        className="w-full py-2 text-gray-600 dark:text-gray-400 font-medium hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    );
};
