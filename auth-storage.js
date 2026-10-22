(function () {
    const preferenceKey = 'csaladimenu-remember-login-v1';
    let rememberLogin = true;

    try {
        rememberLogin = localStorage.getItem(preferenceKey) !== 'false';
    } catch (error) {
        console.warn('Remember-login preference could not be read from local storage.', error);
    }

    const storage = {
        getItem: key => (rememberLogin ? localStorage : sessionStorage).getItem(key),
        setItem: (key, value) => {
            const activeStorage = rememberLogin ? localStorage : sessionStorage;
            const inactiveStorage = rememberLogin ? sessionStorage : localStorage;
            activeStorage.setItem(key, value);
            inactiveStorage.removeItem(key);
        },
        removeItem: key => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        }
    };

    window.CsaladiMenuAuthStorage = {
        get rememberLogin() {
            return rememberLogin;
        },
        setRememberLogin(value) {
            rememberLogin = Boolean(value);
            localStorage.setItem(preferenceKey, String(rememberLogin));
        },
        install(supabase) {
            const createClient = supabase.createClient.bind(supabase);
            supabase.createClient = (url, key, options = {}) => createClient(url, key, {
                ...options,
                auth: { ...options.auth, storage }
            });
        }
    };
})();
