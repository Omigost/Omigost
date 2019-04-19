import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChartArea, faChartBar, faChartLine,
    faClock, faCommentAlt, faDollarSign, faDownload, faFlag,
    faPlus, faRulerHorizontal, faRulerVertical, faSearchDollar,
    faShieldAlt, faTachometerAlt, faTools, faUpload, faUserCircle,
    faWindowClose, faWindowMaximize, faWindowMinimize,
    faTimes, faExpand, faMoneyBillAlt, faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

export interface InitState {
    fine: boolean;
};

export function init(): Promise<InitState> {
    return new Promise<InitState>((resolve, reject) => {
        library.add(
            faUserCircle, faTachometerAlt, faSearchDollar,
            faTools, faChartBar, faDownload, faUpload, faShieldAlt,
            faCommentAlt, faFlag, faPlus, faDollarSign,
            faRulerHorizontal, faRulerVertical, faChartArea, faClock, faChartLine,
            faWindowMinimize, faWindowMaximize, faWindowClose,
            faTimes, faExpand, faMoneyBillAlt, faCheckSquare,
        );
        
        resolve({
            fine: true,
        });
    });
}