import { MakeSectionProps } from "@/types"

export const isWindowLoaded = (windowElementId: string, windowElements: MakeSectionProps[]) => {
    return windowElements.findIndex(w => w.id === windowElementId && w.element.isLoaded) !== -1;
}

export const getWindowElement = (windowElementId: string, windowElements: MakeSectionProps[]) => {
    return windowElements.find(w => w.id === windowElementId);
}

export const setWIndowsOnTopFalse = (windowElements: MakeSectionProps[]) => {
    return windowElements.map(w => w.element.onTop = false);
}
