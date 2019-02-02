import Analytics from "appcenter-analytics"

export const events = {
    create_configuration: "tworzenie_nowej_konfiguracji",
    save_configuration: "zapisywanie_nowej_konfiguracji",
    create_word: "tworzenie_nowego_slowa",
    save_word: "zapisywanie_nowego_slowa",
    change_tab_material: "zmiana_zakladki_material",
    change_tab_strengthen: "zmiana_zakladki_wzmocnienia",
    change_tab_test: "zmiana_zakladki_test",
    change_tab_step_option: "zmiana_zakladki_ustawienia_kroku",
    change_tab_try_option: "zmiana_zakladki_ustawienia_proby",
    change_tab_tip_option: "zmiana_zakladki_ustawienia_podpowiedzi",
    visited_screen: "otworzenie ekranu"
}

export const logCurrentScreen = screenName => Analytics.trackEvent(events.visited_screen, {screenName})
export const logEvent = event => Analytics.trackEvent(event)