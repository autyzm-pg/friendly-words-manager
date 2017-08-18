import * as R from "ramda"

export const Modal = {
    ask: (question, positive) => Promise.reject(),
    show: (children) => undefined,
    hide: () => undefined,
    toggle: () => undefined,
}

export const initializeModal = R.once(actions => Object.assign(Modal, actions))