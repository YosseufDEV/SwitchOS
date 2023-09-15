enum AudioEvents {
    ENTER_HOME = "home",
    SELECT_SOFTWARE = "game",
    SELECT_PROFILE = "profile",
    SELECT_GENERAL = "select_profile",
    SELECT_BOTTOM_OPTION = "bottom_op",
    OPTION_NEWS = "news",
    OPTION_ESHOP = "eshop",
    OPTION_ALBUM = "album"
}

function playAudio(audioEvent: AudioEvents) {
    (new Audio(`/assets/sounds/${audioEvent}.wav`)).play();
}

export default playAudio;
export {
    AudioEvents
};
