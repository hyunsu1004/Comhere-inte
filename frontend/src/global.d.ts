interface TelegramWebAppUser {
    [x: string]: any;
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
}

interface TelegramWebAppInitDataUnsafe {
    user?: TelegramWebAppUser;
    // 필요한 필드 추가 가능
}

interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramWebAppInitDataUnsafe;
    ready: () => void;
    // 기타 메서드 추가 가능
}

interface Window {
    Telegram?: {
        WebApp: TelegramWebApp;
    };
}
