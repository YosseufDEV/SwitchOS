import { borderAnimation, startBorderAnimation } from "../../App"

interface Props {
    optionText: string,
}

function startPromptSelectedBorderAnimation() {
    startBorderAnimation("prompt");
    borderAnimation("prompt");
}

function handlePromptClick(promptRef: HTMLDivElement) {
    if(!promptRef.parentElement) return;
    promptRef.classList.add("prompt-selected-outer-border")
    promptRef.parentElement.classList.add("selected-row")
    if(promptRef.parentElement.childNodes.length > 1)
        promptRef
        .parentElement
        .childNodes
        .forEach((el: HTMLDivElement) => { 
            if(el != promptRef)
                el.classList.add("unselected-prompt-option") 
            })
    startPromptSelectedBorderAnimation();
}

function PromptOption({ optionText }: Props ) {
    let promptRef: HTMLDivElement;

    return (
        <div ref={promptRef} onClick={() => handlePromptClick(promptRef)} class="prompt-option">
            <p>{optionText}</p>
        </div> 
    )
}

export default PromptOption;
