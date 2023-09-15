import { createEffect, createSignal } from "solid-js";

import gsap from "gsap";

import { activeElement, ActiveElementType, activeElementType } from "../../App";
import Software from "../Software/Software";

const [softwareList, setSoftwareList] = createSignal<Node[]>()

const pixelsToMove = 405;
let currentSoftwareIndexIncrementing = 1;
let currentSoftwareIndexDecrementing = 1;
let currentSoftwareIndexIncrementingPTR = -1;

// FIX: doesn't always work right need some investigation
function getSoftwareInFocus(softwareRef: HTMLDivElement, softwareList: HTMLDivElement)  {
    const clientRects = softwareRef.getClientRects();
    const animationSpeedInSeconds = 0.1 
    const isOutOfScreenRightBounds = window.innerWidth - clientRects[0].right < 0;
    const isOutOfScreenLeftBounds = clientRects[0].left < 0;
    if(isOutOfScreenLeftBounds===false && isOutOfScreenRightBounds===false) return;

    if(isOutOfScreenRightBounds) 
    {
        currentSoftwareIndexIncrementingPTR = currentSoftwareIndexIncrementing;
        const nextSoftwarePosition = -1 * (currentSoftwareIndexIncrementing++ * pixelsToMove) 
        console.log(" ")
        console.log("Out of screen right bounds: ")
        console.log("   indexIncrementing: ", currentSoftwareIndexIncrementing);
        console.log("   nextSoftwarePosition: ", nextSoftwarePosition);
        gsap.to(softwareList, 
            { 
                translateX: nextSoftwarePosition, 
                duration: animationSpeedInSeconds 
            })
    }
    else if(isOutOfScreenLeftBounds)
    {
        currentSoftwareIndexIncrementing=1;
        const currentLocation = currentSoftwareIndexIncrementingPTR*pixelsToMove;
        const decrementedBy = pixelsToMove * currentSoftwareIndexDecrementing++;
        const previousElementLocation = -1*(currentLocation - (decrementedBy))
        console.log(" ");
        console.log("Out of screen left bounds: ")
        console.log("   indexIncrementing: ", currentSoftwareIndexIncrementing);
        console.log("   currentIndexIncrementing: ", currentSoftwareIndexIncrementing)
        console.log("   currentIndexPTR: ", currentSoftwareIndexIncrementingPTR)
        console.log("   currentSoftwareLocationInPixels: ", currentLocation);
        console.log("   decrementedByXPixels: ", decrementedBy);
        console.log("   previousElementLocationInPixels: ", previousElementLocation);

        gsap.to(softwareList, 
            { 
                translateX: previousElementLocation, 
                duration: animationSpeedInSeconds 
            })
    }

    if(softwareRef == softwareList.children[0])
    {
        currentSoftwareIndexDecrementing = 1;
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
            getSoftwareInFocus(activeElementEL, softwareListRef);
        }
        setSoftwareList(softwareListRef.childNodes) 
    })

    return (
        <div ref={softwareListRef} class="software-list"> 
            <Software softwareTitle="The Legend of Zelda: Tears of the Kingdom" coverSrc="/assets/covers/zelda-tears-of-the-kingdom_cover.jpg"/>
            <Software softwareTitle="The Legend of Zelda: Breath of the Wild" coverSrc="/assets/covers/zelda_cover.jpg"/>
            <Software softwareTitle="Metroid Dread" coverSrc="/assets/covers/metroid_cover.jpg" />
            <Software softwareTitle="God of War Ragnarök" coverSrc="/assets/covers/god-of-war-ragnarok_cover.jpg" />
            <Software softwareTitle="Elden Ring" coverSrc="/assets/covers/elden-ring_cover.jpg" />
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
