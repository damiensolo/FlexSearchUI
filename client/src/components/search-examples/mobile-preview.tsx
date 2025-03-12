import { motion } from 'framer-motion';

interface MobilePreviewProps {
  platform: 'ios' | 'android';
}

export function MobilePreview({ platform }: MobilePreviewProps) {
  const isIOS = platform === 'ios';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto w-[280px]"
    >
      <div
        className={`overflow-hidden rounded-[2rem] border-8 ${
          isIOS ? 'border-gray-300' : 'border-gray-800'
        } bg-white shadow-xl`}
      >
        <div
          className={`h-12 ${
            isIOS ? 'bg-gray-100' : 'bg-gray-800'
          } flex items-center justify-center`}
        >
          {isIOS ? (
            <div className="h-5 w-40 rounded-full bg-black" />
          ) : (
            <div className="h-2 w-32 rounded-full bg-gray-600" />
          )}
        </div>
        <div className="p-4">
          <div
            className={`flex h-10 items-center rounded-lg ${
              isIOS ? 'bg-gray-100' : 'bg-gray-100'
            } px-3`}
          >
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <div className="ml-2 h-4 w-32 rounded bg-gray-300" />
          </div>
        </div>
        <div className="space-y-3 p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-full rounded bg-gray-200" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
