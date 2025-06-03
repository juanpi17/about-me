import { MakeSectionProps } from "@/types"

export const isWindowLoaded = (windowElementId: string, windowElements: MakeSectionProps[]) => {
    return windowElements.findIndex(w => w.id === windowElementId && w.element.isLoaded) !== -1;
}

export const isAnyWindowLoaded = (windowElements: MakeSectionProps[]) => {
    return windowElements.some(w => w.element.isLoaded);
}

export const getWindowElement = (windowElementId: string, windowElements: MakeSectionProps[]) => {
    return windowElements.find(w => w.id === windowElementId);
}

export const updateWindowElement = (windowElement: MakeSectionProps, windowElements: MakeSectionProps[]) => {
    return windowElements.map((w) => (
        w.id === windowElement.id ? windowElement : w
    ))
}

export const setWIndowsOnTopFalse = (windowElements: MakeSectionProps[]) => {
    return windowElements.map(w => w.element.onTop = false);
}
