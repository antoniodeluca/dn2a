import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { components } from "@client/bootstrapper";

const { Application } = components;

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

            render(
                <MemoryRouter>
                    <Application />
                </MemoryRouter>
            );

            expect(await screen.findByText("firstNetwork")).not.toBeNull();
            expect(await screen.findByText("secondNetwork")).not.toBeNull();
            expect(await screen.findByText("thirdNetwork")).not.toBeNull();
        });
    });
});
