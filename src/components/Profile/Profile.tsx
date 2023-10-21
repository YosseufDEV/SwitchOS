import { createEffect, createSignal } from "solid-js";

import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { activeElement, ActiveElementType, setActiveElement, setActiveElementType } from "../../App";
import { borderAnimation, showElementAnimated, hideElementAnimated } from "../Animations/GeneralAnimations";

interface Props {
    customStyle: any,
    imgSource: string,
    profileName: string,
    backgroundColor: string,
}

gsap.registerPlugin(CSSRulePlugin)

function profileScaleAnimation(profileRef: HTMLDivElement) {
    gsap.to(profileRef, 
                { 
                    scale: 1.075,
                    duration: 0.01,
                    ease: 'linear'
                }) // 30ms
}

function reverseProfileScaleAnimation(profileRef: HTMLDivElement) {
    gsap.to(profileRef, 
                { 
                    scale: 1,
                    duration: 0.01,
                    ease: 'linear'
                }) // 30ms
}

function Profile({ imgSource, customStyle, backgroundColor, profileName = "Yosseuf" }: Props ) {
    const [active, setActive] = createSignal(false)
    let profileRef: HTMLDivElement;
    let profileNameRef: HTMLParagraphElement;
    let borderElementRef: HTMLDivElement;

    function selectProfile(profileRef: HTMLDivElement) {
        setActiveElement(profileRef);
        setActiveElementType(ActiveElementType.ELEMENT_OPTION);
        showElementAnimated(borderElementRef);
        profileScaleAnimation(profileRef)
    }

    function unselectProfile(profileRef: HTMLDivElement) {
        hideElementAnimated(borderElementRef);
        reverseProfileScaleAnimation(profileRef);
    }

    createEffect(() => {
        if(activeElement() == profileRef) 
        {
            selectProfile(profileRef);
            showElementAnimated(profileNameRef)
        }
        else 
        {
            unselectProfile(profileRef);
            hideElementAnimated(profileNameRef)
        }
    })

    
    return (
        <div ref={profileRef} class="profile-container">
            <div class="profile" 
                 style={{ background: backgroundColor, ...customStyle }}>
                <img class="profile-picture" src={imgSource}/>
                <div ref={borderElementRef} class="selected-outer-border profile-selected-outer-border" />
            </div>
            <p ref={profileNameRef}>{profileName}'s Page</p>
        </div>
    )
}

export default Profile;
