import News, { NewsTitleTypes } from "../../components/News/News";

function NewsList() {
    return (
        <div class="news-list">
            <News 
                newsTitleType={NewsTitleTypes.TITLE_INSIDE}
                thumbnailSrc="/assets/news-thumbnails/shovel_knight_thumbnail.jpg"
                isVideo 
                newsTitle="Unearth the complete Shovel Knight saga with Shovel Knig... "/>
            <News 
                newsTitleType={NewsTitleTypes.TITLE_INSIDE}
                newsTitle="Welcoming the Incredible Teams and Legendary franch..." 
                thumbnailSrc="/assets/news-thumbnails/xbox_activision_thumbnail.jpg"/>
            <News 
                newsTitleType={NewsTitleTypes.TITLE_HIDDEN}
                thumbnailSrc="/assets/news-thumbnails/abdullah_reviews_thumbnail.jpg"
                isVideo />
        </div>
    );
}

export default NewsList;
