// Helper to set page metadata
export const setPageMeta = (title, description) => {
  document.title = title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', description);
};