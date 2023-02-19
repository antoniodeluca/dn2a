import { components, services } from "./bootstrapper";

const { Application } = components;
const { mount } = services;

mount(Application);
