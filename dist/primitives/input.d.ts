import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
/**
 * Classe del controllo di form, ricetta §2.10 di keshi-live
 * (`rounded-xl border border-line/60 bg-transparent p-2.5 text-ink`) più il corpo
 * §2.21 `text-[13.5px]`, il focus della casa (`focus:border-brand/50`, che si somma
 * all'anello `:focus-visible` globale di styles.css: niente `outline-none`) e lo
 * stato disabilitato.
 * Esportata perché i compositi del catalogo (campo editabile, mapping colonne)
 * possono doverla applicare a un controllo nativo proprio.
 */
export declare const FIELD_CLASS = "rounded-xl border border-line/60 bg-transparent p-2.5 text-[13.5px] text-ink focus:border-brand/50 disabled:opacity-50";
export declare function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>): import("react").JSX.Element;
export declare function Select({ className, ...rest }: SelectHTMLAttributes<HTMLSelectElement>): import("react").JSX.Element;
export declare function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>): import("react").JSX.Element;
