import { Show } from "solid-js";
import Seperator from "../general/Seperator";
import PromptOption from "./PromptOption";

enum PrompTypes {
    PROMP_INFORM,
    PROMP_AWAIT_SELECTION,
}

interface Props {
    type: PrompTypes;
}

// TODO : Implement Custom Navigation System
function PromptPopup({ type }: Props) {
    return (
        <div class="prompt-container">
            <div class="prompt-popup">
                <div class="prompt-message">
                    <h1> 
                    Ready to start system update.
                    <br/>
                    Update now?
                    </h1>
                    <p>Go Fuck yourself</p>
                </div>
                <Show when={type==PrompTypes.PROMP_AWAIT_SELECTION}>
                    <div class="options-container">
                        <Seperator width="100%" color="#d4d4d4" />
                        <div class="prompt-first-option-row selected-row">
                            <PromptOption optionText="Start Software"/>
                        </div>
                        <Seperator width="100%" height="2px" color="#d4d4d4" />
                        <div class="prompt-final-options-row">
                            <PromptOption optionText="Cancel"/>
                            <Seperator ori="vertical" height="calc(100% + 5px)"color="#d4d4d4" />
                            <PromptOption optionText="Update"/>
                        </div>
                    </div>
                </Show>
            </div>
        </div>
    )
}

export default PromptPopup;
export { PrompTypes };
