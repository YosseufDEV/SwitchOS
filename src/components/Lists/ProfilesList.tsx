import { createEffect, createSignal } from "solid-js";
import Profile from "../Profile/Profile";

const [profilesList, setProfilesList] = createSignal<HTMLDivElement>();

function Profiles() {
    let profilesRef: HTMLDivElement;

    createEffect(() => {
        setProfilesList(profilesRef.childNodes);
    })

    return (
        <div ref={profilesRef} class="profiles">
            <Profile imgSource="/assets/profile_pictures/item_12_2.png" backgroundColor="#fd6a6e" profileName="Yosseuf"/>
            <Profile imgSource="/assets/profile_pictures/item_24_3.png" backgroundColor="#fde541" profileName="Yara"/>
        </div>
    )
}


export default Profiles;

export {
    profilesList
}
