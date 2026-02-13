export default function ProgressBar({ percentage, height = 'h-2', showLabel = false, className = '' }) {
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-slate-400">Progress</span>
          <span className="text-xs font-semibold text-white">{percentage}%</span>
        </div>
      )}
      <div className={`${height} bg-surface-lighter rounded-full overflow-hidden`}>
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
