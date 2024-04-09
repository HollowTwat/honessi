const tg = window.Telegram.WebApp;

export const tgbg = tg.ThemeParams.bg_color;
export const tgbutton = tg.ThemeParams.button_color;
export const tgbutton2 = tg.ThemeParams.secondary_bg_color;
export const tgbuttontext = tg.ThemeParams.button_text_color;
export const tgtextcolor = tg.ThemeParams.text_color;

export function useTelegram() {

    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    }
}
