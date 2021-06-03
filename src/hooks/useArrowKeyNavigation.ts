import { useEffect } from "react";

export function useArrowKeyNavigation(initialElementSelector?: string) {
  useEffect(() => {
    if (initialElementSelector) {
      const initialElement = document.querySelector(
        initialElementSelector
      ) as HTMLElement;
      initialElement && initialElement.focus();
    }

    document.addEventListener("keydown", eventListener);

    return () => document.removeEventListener("keydown", eventListener);
    // eslint-disable-next-line
  }, []);
}

function eventListener(event: KeyboardEvent): void {
  if (event.key === "ArrowUp") {
    navigateVertical("up");
  }

  if (event.key === "ArrowDown") {
    navigateVertical("down");
  }

  if (event.key === "ArrowLeft") {
    navigateHorizontal("left");
  }

  if (event.key === "ArrowRight") {
    navigateHorizontal("right");
  }
}

function navigateVertical(direction: "up" | "down"): void {
  const element = document.activeElement;
  const parent = element?.parentElement;
  if (element && parent) {
    const currentIndex = [...parent.childNodes].findIndex(
      (element) => element === document.activeElement
    );

    if (direction === "up") {
      if (parent.previousElementSibling) {
        (
          parent.previousElementSibling.children[currentIndex] as HTMLElement
        ).focus();
        return;
      }

      if (parent.parentElement?.lastElementChild) {
        (
          parent.parentElement.lastElementChild.children[
            currentIndex
          ] as HTMLElement
        ).focus();
        return;
      }
    }

    if (direction === "down") {
      if (parent.nextElementSibling) {
        (
          parent.nextElementSibling.children[currentIndex] as HTMLElement
        ).focus();
        return;
      }

      if (parent.parentElement?.firstElementChild) {
        (
          parent.parentElement?.firstElementChild.children[
            currentIndex
          ] as HTMLElement
        ).focus();
        return;
      }
    }
  }
}

function navigateHorizontal(direction: "left" | "right"): void {
  const element = document.activeElement;
  if (element) {
    if (direction === "left") {
      if (element.previousElementSibling) {
        (element.previousElementSibling as HTMLElement).focus();
        return;
      }

      if (element.parentElement) {
        (element.parentElement.lastElementChild as HTMLElement).focus();
        return;
      }
    }

    if (direction === "right") {
      if (element.nextElementSibling) {
        (element.nextElementSibling as HTMLElement).focus();
        return;
      }

      if (element.parentElement) {
        (element.parentElement.firstElementChild as HTMLElement).focus();
        return;
      }
    }
  }
}
