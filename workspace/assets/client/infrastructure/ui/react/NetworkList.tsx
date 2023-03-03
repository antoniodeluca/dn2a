import { DataView } from "primereact/dataview";
import React from "react";

import { Network } from "../../../core/types";

interface Props {
    networks: Network[];
    networkTemplate: (network: Network) => React.ReactElement;
}

const NetworkList = (props: Props) => {
    const { networks, networkTemplate } = props;

    return <DataView value={networks} itemTemplate={networkTemplate} />;
};

export { NetworkList };
