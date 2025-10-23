// publik/src/utils/setMetaTags.ts
export function setMetaTags({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
}) {
  const set = (property: string, content: string) => {
    let el =
      document.querySelector(`meta[property='${property}']`) ||
      document.querySelector(`meta[name='${property}']`);

    if (!el) {
      el = document.createElement("meta");
      if (property.startsWith("og:") || property.startsWith("twitter:"))
        el.setAttribute("property", property);
      else el.setAttribute("name", property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  document.title = title;

  set("description", description);
  set("og:title", title);
  set("og:description", description);
  set("og:image", image);
  set("og:url", url);
  set("twitter:title", title);
  set("twitter:description", description);
  set("twitter:image", image);
  set("twitter:card", "summary_large_image");
}
