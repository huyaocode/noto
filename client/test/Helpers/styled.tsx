import * as React from "react";
import { shallow, mount } from "enzyme";

export function mountWithTheme(child: React.ReactElement) {
    return mount(child, {
        wrappingComponent: ({ children }) => (
            <div>{children}</div>
        ),
    });
}

export function shallowWithTheme(child: React.ReactElement) {
    return shallow(child, {
        wrappingComponent: ({ children }) => (
            <div>{children}</div>
        ),
    });
}
