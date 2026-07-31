import { useEffect, useState } from "react";

/**
 * Cycles through `words`, typing and deleting each one.
 * Respects prefers-reduced-motion by simply cycling the full word instantly.
 */
export function useTypingEffect(
  words,
  { typingSpeed = 90, deletingSpeed = 45, pauseTime = 1400, reducedMotion = false } = {}
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(reducedMotion ? words[0] ?? "" : "");
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting

  useEffect(() => {
    if (!words || words.length === 0) return;

    if (reducedMotion) {
      const id = setInterval(() => {
        setWordIndex((i) => (i + 1) % words.length);
      }, 2600);
      return () => clearInterval(id);
    }

    const current = words[wordIndex % words.length];
    let timeout;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseTime);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 300);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, phase, wordIndex, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) setText(words[wordIndex] ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex, reducedMotion]);

  return reducedMotion ? words[wordIndex % words.length] ?? "" : text;
}
