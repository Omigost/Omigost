import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAddressCard, faBoxOpen, faChartArea,
    faChartBar, faChartLine, faCheckSquare, faClock, faCommentAlt,
    faCommentDots, faCommentSlash, faCompress, faDollarSign,
    faDownload, faEnvelope, faExclamationTriangle, faExpand, faFlag,
    faHistory, faMoneyBillAlt, faPalette,
    faPlus, faRedo, faRulerHorizontal, faRulerVertical, faSearchDollar,
    faShieldAlt, faTachometerAlt, faTimes, faTools,
    faUpload, faUser, faUserCircle,
    faWindowClose, faWindowMaximize, faWindowMinimize, faWrench,
    faCopy, faUserSlash,
} from "@fortawesome/free-solid-svg-icons";

import {
    faSlackHash,
} from "@fortawesome/free-brands-svg-icons";


export interface InitState {
    fine: boolean;
}

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
            faPalette, faWrench, faRedo, faHistory, faCopy, faUserSlash,
        );

        resolve({
            fine: true,
        });
    });
}