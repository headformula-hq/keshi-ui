import type { ReactNode } from "react";
import { cx } from "./cx.js";

/**
 * Campo di form: etichetta + controllo, ricetta §2.10 di keshi-live
 * (label `flex flex-col gap-1 text-[12px] text-muted` che avvolge il controllo).
 *
 * `help` ed `error` sono fratelli della <label>, non figli: Testing Library
 * calcola il testo della label da tutti i suoi discendenti, e con l'aiuto dentro
 * `getByLabelText("Nome")` (match esatto) non troverebbe più il controllo.
 *
 * `htmlFor`: il wrapper diventa un <div> con <label for> separata; serve quando il
 * controllo porta un `aria-label` proprio (es. select disabilitata "fissa per
 * FatturaPA") o quando non deve stare dentro una label.
 */
export function Field({
  label, help, error, htmlFor, className, children,
}: {
  label: string; help?: string; error?: string | null; htmlFor?: string; className?: string; children: ReactNode;
}) {
  return (
    <div className={cx("flex flex-col gap-1 text-[12px] text-muted", className)}>
      {htmlFor ? (
        <>
          <label htmlFor={htmlFor}>{label}</label>
          {children}
        </>
      ) : (
        <label className="flex flex-col gap-1">
          <span>{label}</span>
          {children}
        </label>
      )}
      {help && <span className="text-[11px] text-muted2">{help}</span>}
      {error && <span role="alert" className="text-[12px] text-down">{error}</span>}
    </div>
  );
}
