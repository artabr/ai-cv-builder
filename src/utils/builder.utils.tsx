export const collectInlineStyles = (): string => {
  return Array.from(document.head.querySelectorAll('style'))
    .map((style) => style.textContent)
    .map((textContent) => `<style>${textContent}</style>`)
    .join('');
};

export const generateHtmlToConvert = (htmlOftemplate: string): string => {
  const styles = collectInlineStyles();
  return `<html>
      <head>
        ${styles}
        <style>
          body > div {
            width: 100% !important;
          }
        </style>
      </head>
      <body>
        ${htmlOftemplate}
      </body>
    </html>`;
};
