import { Show } from "solid-js";
import NewsVideoIcon from "../../../public/assets/icons/ui/switch_news_video_icon.svg";

enum NewsTitleTypes {
    TITLE_HIDDEN,
    TITLE_INSIDE,
    TITLE_OUTSIDE,
}

interface Props {
    thumbnailSrc: string,
    newsTitleType?: NewsTitleTypes,
    newsTitle?: string,
    isVideo?: boolean,
    videoSrc?: boolean,
}

function News({ thumbnailSrc, hasNewsInfo, newsTitle="Short Title", isVideo, videoSrc, newsTitleType=NewsTitleTypes.TITLE_HIDDEN }: Props ) {
    return ( 
        <div class="news-container">
            <Show when={isVideo}>
                <NewsVideoIcon class="news-video-icon" />
            </Show>
            <img src={thumbnailSrc} class="news-thumbnail" />
            <Show when={newsTitle}>
                <Show when={newsTitleType == NewsTitleTypes.TITLE_INSIDE}>
                    <div class="news-title-inner">
                        <p>{newsTitle}</p>
                    </div>
                </Show>
            </Show>
        </div> 
    )
}

export default News;
export {
    NewsTitleTypes
}
