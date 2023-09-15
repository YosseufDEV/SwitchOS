import { JSXElement } from "solid-js";
import Seperator from "../general/Seperator";

interface Props {
    SvgIconElement: SVGElement,
    headerTitle: string,
}


function Header({ SvgIconElement, headerTitle }: Props ) {
    return (
        <div class="header">
            <div class="header-info">
                <SvgIconElement />
                <p>{headerTitle}</p>
            </div>
            <Seperator height="1.6px" width="calc(100% - ( 45px * 2 ) )" inStyle={{"margin-top": "auto" }}/>
        </div>
    );
}

export default Header;
