export function ThemeScript() {
  const code = `(function(){try{var s=localStorage.getItem('tivor-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=s||(m?'dark':'light');}catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
