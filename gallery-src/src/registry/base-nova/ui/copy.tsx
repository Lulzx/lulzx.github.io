"use client"

// Copy to the clipboard, with the only feedback that matters: the control says it
// worked, in place, and goes back on its own. No toast, nothing to dismiss.

import { Check, Clipboard } from "lucide-react"
import * as React from "react"
import "./copy.css"

/** How long the control admits it copied. Long enough to read at a glance, short
 *  enough that a second copy is never blocked by the first one's applause. */
export const COPIED_MS = 1400

/** `copied` flips true on a successful write and clears itself. The timer is cleared
 *  on unmount and on every new copy, so a fast second press restarts it rather than
 *  being cut short by the first one's expiry. */
export function useCopy(text: string | (() => string)) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef(0)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = React.useCallback(async () => {
    const value = typeof text === "function" ? text() : text
    // Empty is not a copy: writing "" silently wipes what the reader already had.
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS)
  }, [text])
  return { copied, copy }
}

export interface CopyProps
  extends Omit<React.ComponentProps<"button">, "children" | "value"> {
  /** The text to write. A function is read at press time, for a live value. */
  value: string | (() => string)
  /** Show the word beside the mark. Off in tight corners, where the mark is enough. */
  label?: boolean
}

export function Copy({ value, label = false, className, ...props }: CopyProps) {
  const { copied, copy } = useCopy(value)
  return (
    <button
      type="button"
      onClick={copy}
      // The accessible name carries the state, because the icon swap alone is silent
      // to a screen reader and `aria-live` on a control this small is noise.
      aria-label={copied ? "Copied" : "Copy"}
      data-copied={copied ? "" : undefined}
      className={`ag-copy${className ? ` ${className}` : ""}`}
      {...props}
    >
      {copied ? <Check size={14} /> : <Clipboard size={14} />}
      {label && <span>{copied ? "copied" : "copy"}</span>}
    </button>
  )
}
