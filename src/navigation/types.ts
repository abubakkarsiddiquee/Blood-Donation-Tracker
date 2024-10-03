export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Profile: { userId: string };
    Home: undefined; // Example additional screen
    Settings: { userId: string }; // Another example screen
};
