export default function SeesawIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 받침대 */}
      <path
        d="M100 52 L124 84 L76 84 Z"
        className="fill-gray-300 dark:fill-gray-700"
      />
      {/* 수평 막대: 좌우 균형을 이루고 있는 상태 */}
      <rect
        x="16"
        y="49"
        width="168"
        height="7"
        rx="3.5"
        className="fill-gray-400 dark:fill-gray-500"
      />
      {/* 진보 쪽 */}
      <circle cx="28" cy="52.5" r="15" fill="#3b82f6" />
      {/* 보수 쪽 */}
      <circle cx="172" cy="52.5" r="15" fill="#ef4444" />
    </svg>
  );
}
