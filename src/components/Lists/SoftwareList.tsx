import { createEffect, createSignal } from "solid-js";

import gsap from "gsap";

import { activeElement, ActiveElementType, activeElementType } from "../../App";
import Software from "../Software/Software";

const [softwareList, setSoftwareList] = createSignal<Node[]>()

const pixelsToMove = 405;
let currentSoftwareIndexIncrementing = 1;
let currentSoftwareIndexDecrementing = 1;
let currentSoftwareIndexIncrementingPTR = -1;

let incrementedElements: HTMLDivElement[] = [];
let decrementedElements: HTMLDivElement[] = [];

// FIX: doesn't always work right need some investigation
function getSoftwareInFocus(softwareRef: HTMLDivElement, softwareList: HTMLDivElement)  {
    const clientRects = softwareRef.getClientRects();
    const animationSpeedInSeconds = 0.1 
    const isOutOfScreenRightBounds = 1920 - clientRects[0].right < 0;
    const isOutOfScreenLeftBounds = clientRects[0].left < 0;
    

    if(isOutOfScreenLeftBounds === false && isOutOfScreenRightBounds === false) { return };

    if(isOutOfScreenRightBounds) 
    {
        if(incrementedElements.includes(softwareRef)) return;
        currentSoftwareIndexIncrementingPTR = currentSoftwareIndexIncrementing;
        const nextSoftwarePosition = -1 * (currentSoftwareIndexIncrementing++ * pixelsToMove) 
        console.log(nextSoftwarePosition);
        gsap.to(softwareList, 
            { 
                translateX: nextSoftwarePosition, 
                duration: animationSpeedInSeconds 
            })
        incrementedElements.push(softwareRef);
        const decrementedElementsArrayWithoutIncrementedElement = decrementedElements
                                                                    .filter((el) => el != softwareRef)
        decrementedElements = decrementedElementsArrayWithoutIncrementedElement;
    }

    else if(isOutOfScreenLeftBounds)
    {
        if(decrementedElements.includes(softwareRef)) return;
        currentSoftwareIndexIncrementing = 1;
        const currentLocation = currentSoftwareIndexIncrementingPTR*pixelsToMove;
        const decrementedBy = pixelsToMove * currentSoftwareIndexDecrementing++;
        const previousElementLocation = -1*(currentLocation - (decrementedBy))

        gsap.to(softwareList, 
            { 
                translateX: previousElementLocation, 
                duration: animationSpeedInSeconds 
            })

        decrementedElements.push(softwareRef);
        const incrementedElementsArrayWithoutTheDecrementedElement = incrementedElements
                                                                        .filter((el) => el == softwareRef)
        console.log(incrementedElementsArrayWithoutTheDecrementedElement);
        incrementedElements = incrementedElementsArrayWithoutTheDecrementedElement;
    }

    console.log(incrementedElements);

    if(softwareRef == softwareList.children[0])
    {
        currentSoftwareIndexDecrementing = 1;
        decrementedElements = [];
        incrementedElements = [];
    }
}

function SoftwareList() {
    let softwareListRef: HTMLDivElement;
    createEffect(() => {
        const activeElementEL = activeElement();
        if(activeElementType() == ActiveElementType.ELEMENT_SOFTWARE || 
           activeElementType() == ActiveElementType.ELEMENT_SOFTWARE_PLACEHOLDER && 
           activeElementEL != null)
        {
            console.log(activeElementEL?.getClientRects());
            getSoftwareInFocus(activeElementEL, softwareListRef);
        }
        setSoftwareList(softwareListRef.childNodes) 
    })

    return (
        <div ref={softwareListRef} class="software-list"> 
            <Software softwareTitle="Elden Ring" coverSrc="/assets/covers/elden_ring-cover.avif"/>
            <Software softwareTitle="Witcher 3: Wild Hunt" coverSrc="/assets/covers/witcher3_cover.avif"/>
            <Software softwareTitle="Final Fantasy XVI" coverSrc="/assets/covers/final_fantasyvi-cover.png" />
            <Software softwareTitle="Nier Automata" coverSrc="/assets/covers/nier_automata-cover.png" />
            <Software softwareTitle="Assassin's Creed Mirage" coverSrc="/assets/covers/assassins_creed-cover.png" />
            <Software empty />
            <Software empty />
            <Software empty />
            <Software empty />
            <Software empty />
            <Software empty />
            <Software empty />
        </div>
    )
}

export default SoftwareList;

export {
    softwareList,
}
