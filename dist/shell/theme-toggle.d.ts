/** Da inserire in <head> con dangerouslySetInnerHTML per evitare il flash del tema. */
export declare const THEME_INIT_SCRIPT = "try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}";
export declare function ThemeToggle({ className }: {
    className?: string;
}): import("react").JSX.Element;
