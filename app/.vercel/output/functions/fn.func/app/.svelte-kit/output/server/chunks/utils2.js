import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}
function sanitizeText(text) {
  return text.replace(/[\u200B-\u200D\uFEFF]/g, "");
}
function calculateReadingTime(content, wordsPerMinute = 200) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, Math.min(minutes, 30));
}
export {
  calculateReadingTime as a,
  cn as c,
  formatDate as f,
  sanitizeText as s
};
