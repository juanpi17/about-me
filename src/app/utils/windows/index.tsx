import { MakeSectionProps } from "@/types"

export const isWindowLoaded = (windowElementId: string, windowElements: MakeSectionProps[]) => {
    return windowElements.findIndex(w => w.id === windowElementId) !== -1;
}
