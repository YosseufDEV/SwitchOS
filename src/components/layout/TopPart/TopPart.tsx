import Profiles from "../../Lists/ProfilesList";
import Status from "./Status";

function TopPart() {
    return (
        <div class="top-part">
            <div style={{ "margin-top": "55px", display: "flex", width: "100%", "align-items": "center" }}>
                <Profiles/>
                <Status />
            </div>
        </div>
    )
}

export default TopPart;
