import PlayersIndicator, { PlayersAmount } from "./PlayersIndicator";
import ItemActions from "./ItemActions"
import Seperator from "../general/Seperator";
import Controller from "../Controller/Controller";

let footerRef: HTMLDivElement;
function Footer() {

    return (
        <div ref={footerRef} class="footer" >
            <Seperator width="calc(100% - ( 45px * 2 ) )" inStyle={{ margin: "auto" }}/>
            <ItemActions />
            <Controller />
        </div>
    )
}

export default Footer;
export { footerRef };
