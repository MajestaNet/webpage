export type ShareNetwork = 'x' | 'facebook' | 'linkedin' | 'email';

export type SharePayload = {
  url: string;
  title: string;
  summary: string;
};

export function shareHref(network: ShareNetwork, payload: SharePayload): string {
  const url = encodeURIComponent(payload.url);
  const title = encodeURIComponent(payload.title);

  switch (network) {
    case 'x':
      return `https://x.com/intent/tweet?text=${title}&url=${url}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    case 'email': {
      const body = encodeURIComponent(`${payload.summary}\n\n${payload.url}`);
      return `mailto:?subject=${title}&body=${body}`;
    }
  }
}
