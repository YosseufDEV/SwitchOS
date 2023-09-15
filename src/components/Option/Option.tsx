import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { gsap, Linear } from "gsap";
import { CSSProperties } from "react";
import CSSRulePlugin from "gsap/CSSRulePlugin";

import playAudio, { AudioEvents } from "../SoundPlayer/SoundPlayer";
import { showElementAnimated, hideElementAnimated, navigateFromElementWithAnimation } from "../Animations/GeneralAnimations";
import { activeElement, ActiveElementType, activePage, setActiveElement, setActiveElementType } from "../../App";

enum OptionIconTypes {
    OPTION_NEWS,
    OPTION_ESHOP,
    OPTION_ALBUM,
    OPTION_CONTROLLERS,
    OPTION_SETTINGS,
    OPTION_SLEEP_MODE,
}

type OptionNaivgationAnimationColorAndAudioToPlay = 
    { 
        readonly audio: AudioEvents | null, 
        readonly color: string | null 
    };

interface Props {
    iconType: OptionIconTypes,
    iconStyle?: CSSProperties,
    fillColor?: string,
    optionName?: string,
    IconSvg: any,
    navigationURL?: string,
}

gsap.registerPlugin(CSSRulePlugin);

function determineOptionNavigationAnimationColorAndAudioToPlay(optionIconType: OptionIconTypes): OptionNaivgationAnimationColorAndAudioToPlay {
    let color = null;
    let audioToPlay = null;

    switch(optionIconType) 
    {
        case OptionIconTypes.OPTION_NEWS: 
        {
            color = "eb4152";
            audioToPlay = AudioEvents.OPTION_NEWS;
            break;
        }
        case OptionIconTypes.OPTION_ESHOP: 
        {
            color = "f9a107";
            audioToPlay = AudioEvents.OPTION_ESHOP;
            break;
        }
        case OptionIconTypes.OPTION_ALBUM: 
        {
            color = "2970f6";
            audioToPlay = AudioEvents.OPTION_ALBUM;
            break;
        }
    }
    return { color: color, audio: audioToPlay };
}

function eShopIconAnimation(timeline: GSAPTimeline, iconRef: HTMLOrSVGElement) {
    const positionFrames = [ "-7.5px", "-15px", "-7.5px", "-2px", "0" ].forEach(position => timeline.to(iconRef, { translateY: position }))
}

function newsIconAnimation(timeline: GSAPTimeline, iconRef: HTMLOrSVGElement) {
    const scaleFrames = [ "0.8 0.8", "1 1.11", "1.15 1", "0.9 1", "1 1" ].forEach((scale) => timeline.to(iconRef, { scale: scale }))
}

function animateOptionIcon(optionType: OptionIconTypes, iconRef: HTMLOrSVGElement) {
    const timeline = gsap.timeline({ defaults: { duration: 0.11/5, ease: Linear.easeNone } });

    switch(optionType) {    
        case OptionIconTypes.OPTION_NEWS: {
            newsIconAnimation(timeline, iconRef); 
            break;
        }

        case OptionIconTypes.OPTION_ESHOP: {
            eShopIconAnimation(timeline, iconRef);
            break;
        }
    }
}

function navigateFromOption(optionRef: HTMLDivElement, 
                            optionIconType: OptionIconTypes,
                            iconRef: HTMLOrSVGElement,
                            animationEndCallbackFunc: Function,
                            destinationURL?: string,
                            ) {
    const determinedNavigationColorAndAudio = 
            determineOptionNavigationAnimationColorAndAudioToPlay(optionIconType);

    if(destinationURL && determinedNavigationColorAndAudio.color && determinedNavigationColorAndAudio.audio) 
    {
        playAudio(determinedNavigationColorAndAudio.audio);
        animateOptionIcon(optionIconType, iconRef); // Animate the icon inside the option itself 
        navigateFromElementWithAnimation( // Animates the whole option
                            optionRef, 
                            iconRef, 
                            determinedNavigationColorAndAudio.color, 
                            animationEndCallbackFunc, 
                            destinationURL, 
                            activePage()
                        );
    }
}

function scaleOptionAnimation(optionRef: HTMLDivElement, iconRef: HTMLOrSVGElement) {
    const timeline = gsap.timeline();

    const scaleFactor = 140/130;
    timeline
        .to(optionRef, {
            transformOrigin: "center",
            scale: scaleFactor,
            duration: 0.01,
        })
        .to(iconRef, {
            scale: 1/scaleFactor,
            duration: 0,
        }, "<")
}

function unselectOption(optionRef: HTMLDivElement, 
                        iconRef: HTMLOrSVGElement, 
                        titleRef: HTMLDivElement | HTMLParagraphElement,
                        borderElementRef: HTMLDivElement) {
    if(!optionRef) return;

    const timeline = gsap.timeline();
    timeline
        .to(optionRef, {
            scale: 1,
            duration: 0.01,
        })
        .to(iconRef, {
            scale: 1,
            duration: 0,
        }, "<")
    hideElementAnimated(titleRef, borderElementRef);
}

function selectOption(
                        optionRef: HTMLDivElement, 
                        iconRef: HTMLOrSVGElement,
                        titleRef: HTMLParagraphElement, 
                        borderElementRef: HTMLDivElement,
                        animationEndCallbackFunc: Function,
                        optionIconType: OptionIconTypes,
                        destinationURL?: string,
                        ) {

    setActiveElement(optionRef);
    setActiveElementType(ActiveElementType.ELEMENT_OPTION);
    scaleOptionAnimation(optionRef, iconRef);
    showElementAnimated(borderElementRef, titleRef);
    navigateFromOption(optionRef, 
                       optionIconType, 
                       iconRef,
                       animationEndCallbackFunc,
                       destinationURL);
}

function Option({ IconSvg, 
                  optionName="placeholder_option_name", 
                  navigationURL, 
                  iconStyle, 
                  iconType, 
                  fillColor="#737675" }: Props ) {
    let optionRef: HTMLDivElement;
    let titleRef: HTMLParagraphElement; 
    let iconRef: HTMLOrSVGElement;
    let borderElementRef: HTMLDivElement;
    const navigate = useNavigate();


    createEffect(() => {
        if(activeElement() == optionRef) 
        {
            const callback = () => navigate("/"+navigationURL);
            selectOption(optionRef, 
                         iconRef,
                         titleRef, 
                         borderElementRef,
                         callback,
                         iconType, 
                         navigationURL,
                         );
        }
        else 
        { 
            unselectOption(optionRef, 
                           iconRef, 
                           titleRef, 
                           borderElementRef);
        }
    })

    return (
        <div ref={optionRef} 
             class="option option-selected-back-border">
            <p ref={titleRef} >{optionName}</p>
            <IconSvg ref={iconRef} class="option-icon" style={{ fill: fillColor, ...iconStyle}} />
            <div ref={ borderElementRef } class="selected-outer-border option-selected-outer-border" />
        </div>
    )
}

export default Option;
export { OptionIconTypes };
