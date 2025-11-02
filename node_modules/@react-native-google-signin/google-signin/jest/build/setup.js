"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUserInfo = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
exports.mockUserInfo = {
    idToken: 'mockIdToken',
    serverAuthCode: 'mockServerAuthCode',
    scopes: [],
    user: {
        email: 'mockEmail',
        id: 'mockId',
        givenName: 'mockGivenName',
        familyName: 'mockFamilyName',
        photo: null,
        name: 'mockFullName',
    },
};
const MockGoogleSigninButton = (props) => {
    return (react_1.default.createElement(react_native_1.Pressable, { ...props },
        react_1.default.createElement(react_native_1.Text, null, "Mock Sign in with Google")));
};
MockGoogleSigninButton.Size = { Standard: 0, Wide: 1, Icon: 2 };
MockGoogleSigninButton.Color = { Dark: 0, Light: 1 };
const MockGoogleSigninButtonTyped = MockGoogleSigninButton;
const mockStatusCodes = {
    SIGN_IN_CANCELLED: 'mock_SIGN_IN_CANCELLED',
    IN_PROGRESS: 'mock_IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'mock_PLAY_SERVICES_NOT_AVAILABLE',
    SIGN_IN_REQUIRED: 'mock_SIGN_IN_REQUIRED',
};
const mockGoogleSignin = {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    getTokens: jest
        .fn()
        .mockResolvedValue({ accessToken: 'mockAccessToken', idToken: 'mockIdToken' }),
    signIn: jest.fn().mockResolvedValue(exports.mockUserInfo),
    signInSilently: jest.fn().mockResolvedValue(exports.mockUserInfo),
    revokeAccess: jest.fn().mockResolvedValue(null),
    signOut: jest.fn().mockResolvedValue(null),
    isSignedIn: jest.fn().mockResolvedValue(true),
    addScopes: jest.fn().mockResolvedValue(exports.mockUserInfo),
    getCurrentUser: jest.fn().mockResolvedValue(exports.mockUserInfo),
    clearCachedAccessToken: jest.fn().mockResolvedValue(null),
};
jest.mock('@react-native-google-signin/google-signin', () => ({
    statusCodes: mockStatusCodes,
    GoogleSignin: mockGoogleSignin,
    GoogleSigninButton: MockGoogleSigninButtonTyped,
}));
