"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const to_be_disabled_1 = require("./to-be-disabled");
const to_be_empty_element_1 = require("./to-be-empty-element");
const to_be_on_the_screen_1 = require("./to-be-on-the-screen");
const to_be_visible_1 = require("./to-be-visible");
const to_contain_element_1 = require("./to-contain-element");
const to_have_accessibility_state_1 = require("./to-have-accessibility-state");
const to_have_accessibility_value_1 = require("./to-have-accessibility-value");
const to_have_prop_1 = require("./to-have-prop");
const to_have_style_1 = require("./to-have-style");
const to_have_text_content_1 = require("./to-have-text-content");
expect.extend({
    legacy_toBeDisabled: to_be_disabled_1.toBeDisabled,
    legacy_toBeEnabled: to_be_disabled_1.toBeEnabled,
    legacy_toBeEmptyElement: to_be_empty_element_1.toBeEmptyElement,
    legacy_toBeOnTheScreen: to_be_on_the_screen_1.toBeOnTheScreen,
    legacy_toBeVisible: to_be_visible_1.toBeVisible,
    legacy_toContainElement: to_contain_element_1.toContainElement,
    legacy_toHaveAccessibilityState: to_have_accessibility_state_1.toHaveAccessibilityState,
    legacy_toHaveAccessibilityValue: to_have_accessibility_value_1.toHaveAccessibilityValue,
    legacy_toHaveProp: to_have_prop_1.toHaveProp,
    legacy_toHaveStyle: to_have_style_1.toHaveStyle,
    legacy_toHaveTextContent: to_have_text_content_1.toHaveTextContent,
});
