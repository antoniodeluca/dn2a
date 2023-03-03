import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { components } from "@client/bootstrapper";

const { Application } = components;

describe("# User should be able to switch to UI prototype", () => {
    describe("Given user is on any page", () => {
        const fetchMock = jest.fn();
        global.fetch = fetchMock;

        it("Then user should be able to switch to UI prototype via a Call-To-Action button", async () => {
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
            userEvent.setup();
            render(
                <MemoryRouter>
                    <Application />
                </MemoryRouter>
            );

            const callToActionButton = await screen.findByText(
                "Switch to UI Prototype"
            );
            await userEvent.click(callToActionButton);

            expect(await screen.findByText("UI Prototype")).not.toBeNull();
            expect(await screen.findByText("Switch to UI")).not.toBeNull();
        });
    });
});
