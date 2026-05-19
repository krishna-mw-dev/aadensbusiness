export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/918077915694?text=${encodeURIComponent(message)}`;
}

export function getOptimizedImageUrl(url: string, width = 600) {
  if (!url) return "";
  if (url.includes("unsplash.com")) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set("w", String(width));
      urlObj.searchParams.set("q", "70");
      urlObj.searchParams.set("auto", "format");
      return urlObj.toString();
    } catch {
      return url;
    }
  }
  return url;
}
