export const formatRelativeDate = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  
  // Convert both times to UTC to avoid timezone inconsistencies
  const diffInMs = date.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Tomorrow";
  if (diffInDays < 0) return `${Math.abs(diffInDays)} days ago`;
  
  return date.toLocaleDateString(); // Fallback
};
