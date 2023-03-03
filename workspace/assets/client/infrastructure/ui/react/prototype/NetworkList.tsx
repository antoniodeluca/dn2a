import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Panel } from "primereact/panel";
import React from "react";
import { useNavigate } from "react-router-dom";

const NetworkList = (props: any) => {
    const networks = [...Array(100)].map((network, networkIndex) => ({
        id: `nn-${networkIndex + 1}`,
        name: `Neural Network ${networkIndex + 1}`,
        type: [
            "alpha",
            "beta",
            "gamma",
            "delta",
            "epsilon",
            "zeta",
            "eta",
            "theta",
            "iota",
            "kappa",
            "lambda",
            "mu",
            "nu",
            "xi",
            "omicron",
            "pi",
            "rho",
            "sigma",
            "tau",
            "upsilon",
            "phi",
            "chi",
            "psi",
            "omega",
        ][Math.floor(24 * Math.random())],
        inputSize: Math.ceil(100 * Math.random()),
        outputSize: Math.ceil(10 * Math.random()),
        inputsFrom: "",
    }));
    const connectedNetworks = networks.map((network) => ({
        ...network,
        inputsFrom: [...Array(Math.ceil(5 * Math.random()))]
            .map(
                () => networks[Math.floor(networks.length * Math.random())].name
            )
            .join(", "),
    }));

    const navigate = useNavigate();

    const openNetwork = (network: any) => {
        navigate(`network/${network.id}`);
    };

    return (
        <Panel header="Test Project">
            <DataTable
                value={connectedNetworks}
                paginator
                first={props.rowsPerPage * props.page}
                rows={props.rowsPerPage}
                rowsPerPageOptions={[5, 10, 20]}
                cellSelection
                selectionMode="single"
                onSelectionChange={(event) => {
                    openNetwork(event.value.rowData);
                }}
                onPage={(event) => {
                    props.setPage(event.page || 0);
                    props.setRowsPerPage(event.rows || 10);
                }}
            >
                <Column
                    field="name"
                    header="Name"
                    style={{ width: "15%" }}
                ></Column>
                <Column
                    field="type"
                    header="Type"
                    style={{ width: "10%" }}
                ></Column>
                <Column
                    field="inputSize"
                    header="Input Size"
                    style={{ width: "10%" }}
                ></Column>
                <Column
                    field="outputSize"
                    header="Output Size"
                    style={{ width: "10%" }}
                ></Column>
                <Column field="inputsFrom" header="Inputs From"></Column>
            </DataTable>
        </Panel>
    );
};

export { NetworkList };
