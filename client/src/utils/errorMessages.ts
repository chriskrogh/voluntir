enum ErrorMessages {
    // AUTH
    SIGN_UP = 'Could not sign up with email and password',
    LOG_IN = 'Could not log in with email and password',
    THIRD_PARTY_AUTH = 'Could not authenticate with third party',
    FETCH_USER = 'Could not fetch user',
    LOGOUT = 'Could not log user out',

    // PAGES
    EVENT_PAGE_ID = 'Could not get event id from page request',
    COMMUNITY_PAGE_ID = 'Could not get community id from page request',
}

export default ErrorMessages;
