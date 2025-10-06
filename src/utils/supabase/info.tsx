/**
 * Pure Frontend Mode - No Supabase Configuration Required
 */

// Mock values for pure frontend mode
export const projectId = 'pure-frontend';
export const publicAnonKey = 'pure-frontend-mode';

// Component for display purposes
export default function SupabaseInfo() {
  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
      <h3 className="font-bold text-yellow-800">Pure Frontend Mode</h3>
      <p className="text-yellow-700">
        This application is running in pure frontend mode using localStorage for data persistence.
        No external database connection is required.
      </p>
    </div>
  );
}