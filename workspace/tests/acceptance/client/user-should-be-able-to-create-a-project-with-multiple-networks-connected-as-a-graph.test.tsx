import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen } from "@testing-library/react";

import { Application } from "../../../assets/client/Application";

describe("# User should be able to create a project with multiple networks connected as a graph", () => {
    describe("Given user is on the network list page", () => {
        const fetchMock = jest.fn();
        global.fetch = fetchMock;

        it("Then user should see the list of already added networks", async () => {
            const networks = [
                {
                    name: "firstNetwork",
                },
                {
                    name: "secondNetwork",
                },
                {
                    name: "thirdNetwork",
                },
            ];
            fetchMock.mockImplementation(() => {
                return Promise.resolve({
                    json: () => Promise.resolve(networks),
                });
            });

            render(<Application />);

            expect(screen.findByText("firstNetwork")).not.toBeNull();
            expect(screen.findByText("secondNetwork")).not.toBeNull();
            expect(screen.findByText("thirdNetwork")).not.toBeNull();
        });
    });
});
