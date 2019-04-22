import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChartArea, faChartBar, faChartLine,
    faClock, faCommentAlt, faDollarSign, faDownload, faFlag,
    faPlus, faRulerHorizontal, faRulerVertical, faSearchDollar,
    faShieldAlt, faTachometerAlt, faTools, faUpload, faUserCircle,
    faWindowClose, faWindowMaximize, faWindowMinimize,
    faTimes, faExpand, faMoneyBillAlt, faCheckSquare, faAddressCard,
    faUser, faCommentSlash, faCommentDots, faEnvelope,
    faCompress, faBoxOpen, faExclamationTriangle,
    faPalette, faWrench, faRedo, faHistory,
} from "@fortawesome/free-solid-svg-icons";

import {
    faSlackHash,
} from "@fortawesome/free-brands-svg-icons"


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
            faTimes, faExpand, faMoneyBillAlt, faCheckSquare, faAddressCard,
            faUser, faCommentSlash, faCommentDots, faEnvelope,
            faSlackHash, faCompress, faBoxOpen, faExclamationTriangle,
            faPalette, faWrench, faRedo, faHistory,
        );
        
        resolve({
            fine: true,
        });
    });
}